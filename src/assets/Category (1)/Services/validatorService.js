//------------------------------------------------------------------------------------
// Company Name:   ALMAwiz Technologies Pvt. Ltd.
// Description:    This is the Validator Service for the category.    
// Copyright:      ©2016 ALMAwiz Technologies, All Rights Reserved.
//------------------------------------------------------------------------------------
var validatorService = function (info, diagnosticTree, handlers) {
    this.config = info.config;
    this.logger = info.logger
    this.diagnosticTree = diagnosticTree;
}

module.exports = validatorService;

