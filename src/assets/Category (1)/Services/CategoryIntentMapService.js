//------------------------------------------------------------------------------------
// Company Name:   ALMAwiz Technologies Pvt. Ltd.
// Description:    This is the Category Intent Map Service for the category.    
// Copyright:      ©2016 ALMAwiz Technologies, All Rights Reserved.
//------------------------------------------------------------------------------------
var conversation = require("../DiagnosticTree/ConversationFlow.json");
var dataPacketService = require("poca-common").dataPacketService;
const Controller = require('poca-category-lib-v2').controller;

var CategoryIntentMapService = function (info, diagnosticTree, handlers) {
    this.config = info.config;
    this.diagnosticTree = diagnosticTree;
    this.controller = new Controller(info, diagnosticTree, handlers);
}

module.exports = CategoryIntentMapService;

CategoryIntentMapService.prototype.initMapping = function () {
    var _this = this
    var mapping = {
        "DEMO": {
            "WELCOME_HANDLER": function (self, context, callback) {
                _this.controller.welcomeMessageHandler(context, callback);
            },
            "API_ENTITY_BUILD_HANDLER": function (self, context, callback) {
                _this.controller.getEntityBuilder(context, callback);
            },
            "APIAI_ACTION_HANDLERS": {
                "SELECT_OPTION_BASED": function (self, context, callback) {
                    _this.controller.process("SELECT_OPTION_BASED", context, callback);
                },
            },
            "AUTO_HANDLERS": {
                "FULFILL_HANDLER": function (self, context, callback) {
                    _this.controller.fulfillHandler(context, callback);
                }
            },
            "API_AI_AGENT": conversation["defaultConfig"]["AgentName"],
            "TITLE": conversation["defaultConfig"]["Title"],
            "DESCRIPTION": conversation["defaultConfig"]["Description"],
            "ICON": conversation["defaultConfig"]["IconUrl"],
            "INPUT_CONTEXTS": [

            ],
            "OPTION_HANDLER": {
                "EXECUTION_HANDLER": function (self, context, callback) {
                    _this.handleChoice(context, function (response) {
                        if (callback) {
                            callback(response);
                        }
                    });
                },
                "LABEL_HANDLER": function (self, optionID, data) {
                    _this.handleLabel(optionID, function (response) {
                        callback(response);
                    });
                },
                "FORM_HANDLER": {
                    "EXECUTION_HANDLER": function (self, context, callback) {
                        _this.controller.process("FORM", context, function (response) {
                            if (callback) {
                                callback(response);
                            }
                        });
                    },
                    "LABEL_HANDLER": function (self, formID, data) {
                        return dataPacketService.createFilledFormPacket(data);
                    }
                }
            },
            "SPECIFICATION_HANDLERS": {
                "SMALLTALK_CONFIRMATION_HANDLER": function (self, context, callback) {
                    _this.controller.process("SMALLTALK_CONFIRMATION_HANDLER", context, callback);
                },
                "TEST_COMPLETE_HANDLER": function (self, context, callback) {
                    _this.controller.isTicketCompleted(context);
                },
                "INIT_HANDLER": function (self, context, callback) {
                    _this.controller.initCategoryContext(context, callback);
                },
                "CONFIRMATION_HANDLER": function (self, context, callback) {
                    //self.controller.notused(context, callback);
                    callback();
                },
                "UNKNOWN_MESSAGE_HANDLER": function (self, context, callback) {
                    _this.controller.process("UNKNOWN_MESSAGE_HANDLER", context, callback);
                },
                "SMALLTALK_EVENT_HANDLER": function (self, context, callback) {
                    _this.controller.process("SMALLTALK_EVENT_HANDLER", context, callback);
                },
                "GUIDE_EXAMPLES_HANDLER": function (self, context, callback) {
                    _this.controller.getGuideExample(context, callback);
                },
                "CONTEXT_DATA_BUILDER": function (self, context, callback) {
                    _this.controller.contextDataBuilder(context, function (response) {
                        if (callback) {
                            callback(response);
                        }
                    });
                    callback();
                }
            }
        }
    }
    return mapping;
}

CategoryIntentMapService.prototype.handleChoice = function (info, callback) {
    //insert your code here
}

CategoryIntentMapService.prototype.handleLabel = function (info, callback) {
    //insert your code here
}