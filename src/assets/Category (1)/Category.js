//------------------------------------------------------------------------------------
// Company Name:   ALMAwiz Technologies Pvt. Ltd.
// Description:    This is the Main Entry file for the category.    
// Copyright:      ©2016 ALMAwiz Technologies, All Rights Reserved.
//------------------------------------------------------------------------------------
const Handlers = require('./Handlers/handler');
const DiagnosticTree = require('./DiagnosticTree/diagnosticTree');
const conversation = require('./DiagnosticTree/ConversationFlow.json');
const CategoryIntentMapService = require('./Services/CategoryIntentMapService');

var Category = function (info) {
    this.diagnosticTree = new DiagnosticTree();
    let handlers = new Handlers(info, this.diagnosticTree);
    this.intentMap = new CategoryIntentMapService(info, this.diagnosticTree, handlers);
    this.subCategoryMap = this.intentMap.initMapping();
    return this;
}

module.exports = Category;

Category.prototype.getSubCategoryMapUserBased = function (user, callback) {
    callback(this.subCategoryMap);
}

Category.prototype.getSubCategoryMap = function () {
    return (this.subCategoryMap);
}

Category.prototype.getTitle = function () {
    return conversation["default_config"]["Title"];
}

Category.prototype.getDescription = function () {
    return conversation["default_config"]["Description"];
}

Category.prototype.getVersion = function () {
    return conversation["default_config"]["Version"];
}

Category.prototype.getIcon = function () {
    return conversation["default_config"]["IconUrl"];
}
