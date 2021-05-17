//------------------------------------------------------------------------------------
// Company Name:   ALMAwiz Technologies Pvt. Ltd.
// Description:    This is the Handlers Service for the category.    
// Copyright:      ©2016 ALMAwiz Technologies, All Rights Reserved.
//------------------------------------------------------------------------------------
var dataPacketService = require("poca-common").dataPacketService;
var Validators = require("../Services/validatorService");
var Utility = require("../Utility/utils");

var Handlers = function (info, diagnosticTree) {
    this.info = info;
    this.validators = new Validators(info);
    this.utility = new Utility(info);
    this.diagnosticTree = diagnosticTree;
}

module.exports = Handlers;

Handlers.prototype.initCategoryContext = function (userType, callback) {
    // Define the Category context for fields required by the category
    let categoryContext = {
    }
    callback(categoryContext);
}

/**
 * @apiDescription This hook is triggered to clear the value for the indicated node/conversation stage
 * 
 * @apiParam {Object} object Node details.
 * @apiParam {String} object.fieldName The Field Name.
 * @apiParam {String} object.identifier The Sub-Identifier for the field.
 * @apiParam {String} object.levelId The nodeID / Conversation Stage
 *
 */
Handlers.prototype.clearValue = function (object, callback) {
    // callback the initializing value for each node
    callback("")
}

/**
 * @apiDescription This hook is triggered to return the constructed question dataPacket for the current stage in the conversation.
 * 
 * @apiParam {Object} object Node details.
 * @apiParam {String} object.ticketId The TicketID.
 * @apiParam {String} object.email The userID.
 * @apiParam {String} object.levelId The nodeID / Conversation Stage
 * @apiParam {String} object.fieldName The field being targetted
 * @apiParam {String} object.categoryContext The current category context
 * @apiParam {String} object.analyticStructure The analytic structure for the current node
 * @apiParam {String} object.count The count of times this node has re-entered
 *
 * @apiParam {Function} callback The callback function to be called.
 * @apiParam {Object} callback.object The object to be passed to the callback
 * @apiParam {Object} callback.object.categoryContext The current modified category context.
 * @apiParam {Object} callback.object.res The dataPacket representing the Question to be asked to the User.
 * 
 */
Handlers.prototype.questionHandler = function (obj, callback) {
    // Replase your code here
    callback({ categoryContext: {}, res: dataPacketService.createTextPacket("A sample question") });
}

/**
 * @apiDescription This hook is triggered to validate the response the user gave for a given question/stage.
 * 
 * @apiParam {Object} object Node details.
 * @apiParam {String} object.ticketId The TicketID.
 * @apiParam {String} object.email The userID.
 * @apiParam {String} object.current_answer The current answer / statemeent / response from the user.
 * @apiParam {String} object.levelId The nodeID / Conversation Stage
 * @apiParam {String} object.fieldName The field being targetted
 * @apiParam {String} object.categoryContext The current category context
 * @apiParam {String} object.analyticStructure The analytic structure for the current node
 * @apiParam {String} object.count The count of times this node has re-entered
 *
 * @apiParam {Function} callback The callback function to be called.
 * @apiParam {Object} callback.object The object to be passed to the callback
 * @apiParam {Object} callback.object.categoryContext The current modified category context.
 * @apiParam {Object} callback.object.res The Validation result.
 * @apiParam {String} callback.object.res.status The Validation result status. Can be any one of the following values "ACCEPTED" or "REJECTED" or "MODIFY" or "PARTIALLY_ACCEPTED"
 * @apiParam {Object} callback.object.res.value The interpreted values from user input.
 */
Handlers.prototype.validateInputHandler = function (obj, callback) {
    // Insert your code here
    callback({
        res: {
            status: "ACCEPTED",
            value: '',
        }, categoryContext: {}
    });
}

/**
 * @apiDescription This hook is triggered to identify the next question based on the users Input
 * 
 * @apiParam {Object} object Node details.
 * @apiParam {String} object.ticketId The TicketID.
 * @apiParam {String} object.email The userID.
 * @apiParam {String} object.current_answer The current answer / statemeent / response from the user.
 * @apiParam {String} object.levelId The nodeID / Conversation Stage
 * @apiParam {String} object.fieldName The field being targetted
 * @apiParam {String} object.categoryContext The current category context
 * @apiParam {String} object.analyticStructure The analytic structure for the current node
 * @apiParam {String} object.count The count of times this node has re-entered
 *
 * @apiParam {Function} callback The callback function to be called.
 * @apiParam {Object} callback.object The object to be passed to the callback
 * @apiParam {Object} callback.object.categoryContext The current modified category context.
 * @apiParam {String} callback.object.nextQuestion The next Question ID /levelID.
 */
Handlers.prototype.findNextNode = function (obj, callback) {
    this.diagnosticTree.getQuestionsDiagnostic((diagnostic_tree) => {
        // Insert your code here
        callback({ nextQuestion: null, categoryContext: {} });
    })
}

/**
 * @apiDescription This hook is triggered to identify indicated node is changeable or not
 * 
 * @apiParam {Object} object Node details.
 * @apiParam {String} object.ticketId The TicketID.
 * @apiParam {String} object.email The userID.
 * @apiParam {String} object.levelId The nodeID / Conversation Stage
 * @apiParam {String} object.fieldName The field being targetted
 * @apiParam {String} object.categoryContext The current category context
 * @apiParam {String} object.analyticStructure The analytic structure for the current node
 * @apiParam {String} object.fieldToChange The sub-field of the field to change.
 *
 * @apiParam {Function} callback The callback function to be called.
 * @apiParam {Boolean} callback.change true indicates changeable, false indicates not changeable.
 */
Handlers.prototype.isNodeChangeable = function (obj, callback) {
    this.diagnosticTree.getQuestionsDiagnostic((diagnostic_tree) => {
        let fieldToChange = obj.fieldToChange
        callback(diagnostic_tree["questionTree"][fieldToChange]["changeable"])
    })
}

/**
 * @apiDescription This hook is triggered to failure in understanding what the user is trying to say
 * 
 * @apiParam {Object} object Node details.
 * @apiParam {String} object.email The userID.
 * @apiParam {String} object.count The current trial attempt count
 * @apiParam {String} object.maxRepeatCount The max retry limit.
 * @apiParam {String} object.questionID The nodeID / Conversation Stage
 *
 * @apiParam {Function} callback The callback function to be called.
 * @apiParam {Boolean} callback.dataPacket L1 Agent transfer DataPacket.
 */
Handlers.prototype.failureHandler = function (object, callback) {
    callback(dataPacketService.createL1AgentPacket("Transfer to L1 Agent"));
}

/**
 * @apiDescription This hook is triggered to create entities that can prove useful understand the user NLP intent.
 * 
 * @apiParam {Object} object Node details.
 * @apiParam {String} object.ticketId The TicketID.
 * @apiParam {String} object.email The userID.
 * @apiParam {String} object.levelId The nodeID / Conversation Stage
 * @apiParam {String} object.categoryContext The current category context
 * @apiParam {String} object.analyticStructure The analytic structure for the current node
 *
 * @apiParam {Function} callback The callback function to be called.
 * @apiParam {Object} callback.entities[] Entities Array
 */
Handlers.prototype.entityBuilder = function (object, callback) {
    // Replace the below code with your code here
    callback([]);
}

/**
 * @apiDescription This hook is triggered to indicate that the ticket has been completed or not.
 * 
 * @apiParam {Object} object Node details.
 * @apiParam {String} object.ticketId The TicketID.
 * @apiParam {String} object.email The userID.
 * @apiParam {String} object.levelId The nodeID / Conversation Stage
 * @apiParam {String} object.categoryContext The current category context
 * @apiParam {String} object.analyticStructure The analytic structure for the current node
 * @apiParam {String} object.L1Agent The analytic structure for the current node
 * @apiParam {String} object.diagnostic_tree The analytic structure
 *
 * @apiParam {Function} callback The callback function to be called.
 * @apiParam {Boolean} callback.completed true indicates completed, false indication incomplete
 */
Handlers.prototype.isTicketCompleted = function (obj, callback) {
    // Replace the below code with your code here
    callback(false);
}

/**
 * @apiDescription This hook is triggered to indicate that the ticket has been completed or not.
 * 
 * @apiParam {Object} object Node details.
 * @apiParam {String} object.ticketId The TicketID.
 * @apiParam {String} object.email The userID.
 * @apiParam {String} object.categoryContext The current category context
 * @apiParam {String} object.analyticStructure The analytic structure for the current node
 *
 * @apiParam {Function} callback The callback function to be called.
 * @apiParam {Boolean} callback.dataPacket The context DataPacket
 */
Handlers.prototype.contextDataBuilder = function (object, callback) {
    // Replace the below code with your code here
    callback(dataPacketService.createTextPacket("Some Details"));
}

/**
 * @apiDescription This hook is triggered to return some hint guide examples for the current stage of the conversation.
 * 
 * @apiParam {Object} object Node details.
 * @apiParam {String} object.ticketId The TicketID.
 * @apiParam {String} object.email The userID.
 * @apiParam {String} object.levelId The nodeID / Conversation Stage
 * @apiParam {String} object.categoryContext The current category context
 * @apiParam {String} object.analyticStructure The analytic structure for the current node
 *
 * @apiParam {Function} callback The callback function to be called.
 * @apiParam {String} callback.hints[] The array of hint strings
 */
Handlers.prototype.getGuideExample = function (object, callback) {
    // Replace the below code with your code here
    callback([]);
}

/**
 * @apiDescription This hook is triggered to fulfill / mark the end of the current conversation
 * 
 * @apiParam {Object} object Node details.
 * @apiParam {String} object.ticketId The TicketID.
 * @apiParam {String} object.email The userID.
 * @apiParam {String} object.categoryContext The current category context
 * @apiParam {String} object.analyticStructure The analytic structure for the current node
 *
 * @apiParam {Function} callback The callback function to be called.
 */
Handlers.prototype.fulfillTicket = function (object, callback) {
    // Replace the below code with your code here
    callback();
}