//------------------------------------------------------------------------------------
// Company Name:   ALMAwiz Technologies Pvt. Ltd.
// Description:    This is the Diagnostic Tree Service for the category.    
// Copyright:      ©2016 ALMAwiz Technologies, All Rights Reserved.
//------------------------------------------------------------------------------------
var conversation = require("./ConversationFlow.json");

var DiagnosticTree = function () {
}

module.exports = DiagnosticTree;

DiagnosticTree.prototype.getQuestionsDiagnostic = function (callback) {
    var diagnostic_tree = conversation;
    callback(diagnostic_tree);
}