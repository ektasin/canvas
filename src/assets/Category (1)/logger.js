//------------------------------------------------------------------------------------
// Company Name:   ALMAwiz Technologies Pvt. Ltd.
// Description:    This is the Logger Service for the category.    
// Copyright:      ©2016 ALMAwiz Technologies, All Rights Reserved.
//------------------------------------------------------------------------------------
const dateTimeUtils = require('./dateTimeUtils.js');
const winston = require("winston");
const DailyRotateFile = require('winston-daily-rotate-file');
const { format } = require('logform');

Logger = function (config) {
  this.config = config;

  const errorTransport = new DailyRotateFile({
    level: 'error',
    filename: './logs/error/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    json: false,
    maxSize: '5m',
    timestamp: function () {
      return dateTimeUtils.formatNowDateTime();
    }
  });

  const logTransport = new DailyRotateFile({
    level: 'debug',
    filename: './logs/log/log-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    json: false,
    maxSize: '5m',
    maxFiles: '7d',
    timestamp: function () {
      return dateTimeUtils.formatNowDateTime();
    }
  });

  const exceptionHandlers = new DailyRotateFile({
    level: 'debug',
    filename: './logs/exception/exception-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    json: false,
    maxSize: '5m',
    timestamp: function () {
      return dateTimeUtils.formatNowDateTime();
    }
  });

  const logConfiguration = {
    level: 'debug',
    format: format.combine(
      format.timestamp({
        // format: 'YYYY-MM-DD HH:mm:ss'
        format: 'HH:mm:ss'
      }),
      format.printf(
        // log => `${log.timestamp} ${log.level}: ${log.message}`
        log => dateTimeUtils.formatNowDateTime().split(" ")[1] + ` ${log.level}: ${log.message}`
      )
    ),
    transports: [
      errorTransport,
      logTransport
    ],
    exceptionHandlers: [
      exceptionHandlers
    ]
  }
  this.logger = winston.createLogger(logConfiguration);
}

module.exports = Logger;

Logger.prototype.error = function (...msg) {
  this.logger.error(this.construct(...msg));
}

Logger.prototype.warn = function (...msg) {
  this.logger.warn(this.construct(...msg));
}

Logger.prototype.info = function (...msg) {
  this.logger.info(this.construct(...msg));
}

Logger.prototype.verbose = function (...msg) {
  this.logger.verbose(this.construct(...msg));
}

Logger.prototype.debug = function (...msg) {
  console.log(this.construct(...msg));
  this.logger.debug(this.construct(...msg));
}

Logger.prototype.silly = function (...msg) {
  this.logger.silly(this.construct(...msg));
  console.log("silly: ", msg);
}

Logger.prototype.construct = function (...msg) {
  let msgStr = "";
  for (let i = 0; i < msg.length; i++) {
    let param = msg[i];
    let type = typeof param;

    if (type === 'string' || type === 'number' || type === 'boolean' || type === 'bigint' || type === 'symbol') {
      msgStr = msgStr + param + " ";
    } else if (param instanceof Error) {
      msgStr = msgStr + param.toString() + " " + param.stack;
    } else if (type === 'object') {
      msgStr = msgStr + JSON.stringify(param) + " ";
    } else if (type === undefined) {
      msgStr = msgStr + "<undefined> ";
    } else {
      msgStr = msgStr + "<unknown data> ";
    }
  }
  return msgStr;
}