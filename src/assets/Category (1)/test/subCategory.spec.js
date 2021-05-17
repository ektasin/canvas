//------------------------------------------------------------------------------------
// Company Name:   ALMAwiz Technologies Pvt. Ltd.
// Description:    This is the Test file for the category.    
// Copyright:      ©2016 ALMAwiz Technologies, All Rights Reserved.
//------------------------------------------------------------------------------------
var TestEngine = require("poca-test");
var dataPacketService = require("poca-common").dataPacketService;
var testEngine = new TestEngine();
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-string'));
const TIME_OUT = 120000;
var SubCategory = require("../Category");

describe('Demo Category', function () {
	before(function (done) {
		testEngine.initCategory(SubCategory, function (result) {
			if (!result.status) {
				console.log(result.message);
				return;
			}
			done();
		});
	});
	describe('Init Check', function () {
		before(function (done) {
			this.timeout(20000);

			testEngine.startSession('DEMO', function (result) {
				if (!result.status) {
					console.log(result.message);
					return;
				}
				console.log(result);
				done();
			});
		});

		it('Some test description', function (done) {
			this.timeout(20000);
			testEngine.testTextAction("bx600", "MODEL_SPECIFICATION", function (result) {
				if (!result.status) {
					console.log(result.message)
				}
				console.log(result)
				expect(result.status).to.equal(true);
				done();
			})
		});
	});
});
