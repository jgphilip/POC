'use strict';
module.exports = function(app) {
  var mainController = require('../controllers/mainController');

/**
 * @api {get} /hashtag/:wsjid/:hashtag Get messages with hashtag 
 * @apiGroup Hashtags
 * @apiParam {String} wsjid Workspace 
 * @apiParam {String} hashtag Hashtag to be searched for
 * @apiSuccess {String} _id Post id
 * @apiSuccess {String} messageText Posted message
 * @apiSuccess {String} wsJid Workspace JID
 * @apiSuccess {String[]} hashtags Hashtags list
 * @apiSuccess {Number} __v API version
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *   [
 *   	{
 *       	"_id": "596f2b4fe41cb6f61bf03f21",
 *       	"messageText": "#There is a hashtag",
 *       	"wsJid": "1",
 *       	"__v": 0,
 *       	"hashtags": [
 *        	   "#There"
 *       	]
 *   	}
 *   ]
 */
  app.route('/hashtag/:wsjid/:hashtag')
    .get(mainController.list_all_posts_with_hashtag);  


  app.route('/messages/:wsjid')
  /**
 * @api {get} /messages/:wsjid Get all message with hashtags
 * @apiGroup Hashtags
 * @apiParam {String} wsjid Workspace to be searched in
 * @apiSuccess {String} _id Post id
 * @apiSuccess {String} messageText Posted message
 * @apiSuccess {String} wsJid Workspace JID
 * @apiSuccess {String[]} hashtags Hashtags list
 * @apiSuccess {Number} __v API version
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [
 *  	{
 *      	 "_id": "596f2b4fe41cb6f61bf03f21",
 *       	 "messageText": "#There is a hashtag",
 *       	 "wsJid": "1",
 *        	 "__v": 0,
 *       	 "hashtags": [
 *           	"#There"
 *       	 ]
 *   	}
 *     ]
 */
    .get(mainController.list_all_posts) 
    /**
 * @api {post} /messages/:wsjid Message from workspace
 * @apiGroup Hashtags
 * @apiParam {String} wsjid Workspace to be searched in
 * @apiParam {String} messageText Posted message
 * @apiParam {String} created_at Created date
 * @apiParam {String} updated_at Updated date
 * @apiParamExample {json} Input
 *	{
 *		"messageText":"#There is a hashtag",
 *		"created_at":"17-07-2017",
 *		"updated_at":"17-07-2017"
 *	}
 * @apiSuccess {String} _id Post id
 * @apiSuccess {String} messageText Posted message
 * @apiSuccess {String} wsJid Workspace JID
 * @apiSuccess {String[]} hashtags Hashtags list
 * @apiSuccess {Number} __v API version
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [
 *  	{
 *      	 "_id": "596f2b4fe41cb6f61bf03f21",
 *       	 "messageText": "#There is a hashtag",
 *       	 "wsJid": "1",
 *        	 "__v": 0,
 *       	 "hashtags": [
 *           	"#There"
 *       	 ]
 *   	}	
 *     ]
 */ 
    .post(mainController.add_post_with_hashtag);


/**
 * @api {delete} /hashtag/:wsjid/:messageId Delete message from workspace
 * @apiGroup Hashtags
 * @apiParam {String} wsjid Workspace to be searched in
 * @apiParam {String} messageId Posted message id
 * @apiSuccess {String} message Successfully deleted message
 */
  app.route('/hashtag/:wsjid/:messageId')
    .delete(mainController.delete_hashtag);

/**
 * @api {post} /apiai Ask Api.ai
 * @apiGroup api.ai
 * @apiParam {String} query Query to api.ai
 * @apiParamExample {json} Input
 *	{
 *		"query":"Score please"
 *	}
 * @apiSuccess {String} id Response id
 * @apiSuccess {String} messageText Action name
 * @apiSuccess {String} messages Messages
 * @apiSuccess {String} speech Speech
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *		{
 *   		"id": "45f5a948-47bc-41a6-a0d9-de2c14349709",
 *   		"timestamp": "2017-07-19T05:41:54.788Z",
 *   		"lang": "en",
 *   		"result": {
 *    	    	"source": "agent",
 *       		"resolvedQuery": "create a new workspace called sfdfsdfsd",
 *       		"action": "workspacename",
 *       		"actionIncomplete": false,
 *       		"parameters": {
 *           		"any": "sfdfsdfsd"
 *       		},
 *       		"contexts": [],
 *       		"metadata": {
 *           		"intentId": "64cc272d-cd51-4e2b-b07a-f71a36050776",
 *           		"webhookUsed": "false",
 *           		"webhookForSlotFillingUsed": "false",
 *           		"intentName": "Create workspace"
 *       		},
 *       		"fulfillment": {
 *           		"speech": "create_new_ws",
 *           		"messages": [
 *               		{
 *                   		"type": 0,
 *                   		"speech": "create_new_ws"
 *               		}
 *           		]
 *      		},
 *       		"score": 1
 *   		},
 *   		"status": {
 *       		"code": 200,
 *       		"errorType": "success"
 *   		},
 *   		"sessionId": "14243ndfgh23423hdhdhhdfhh"
 *		}
 */ 
  app.route('/apiai')
    .post(mainController.request_help_from_apiai);

    app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
};