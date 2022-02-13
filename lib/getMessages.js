// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const dotenv = require("dotenv")
const async = require("async")
const { timeStamp } = require("./util")

// Set the region 
AWS.config.update({region: 'us-west-1'});

dotenv.config()

exports.getMessagesFromSqs = () => {

	return new Promise( async (resolve,reject) => {

		// Create an SQS service object
		var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

		const params = {
			QueueUrl: process.env.SQS_QUEUE_URL,
			AttributeNames: ['All'],
			MaxNumberOfMessages: 1,
			WaitTimeSeconds: 3
		}
		console.log(params)

		sqs.receiveMessage(params, (err, data) => {
			if (err) {
				console.log("Error", err);
			} else {
				console.log("Success", data);
				resolve(data.Messages)
			}
		})
	})
}