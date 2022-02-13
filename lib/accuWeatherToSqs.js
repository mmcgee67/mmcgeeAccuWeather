// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const dotenv = require("dotenv")
const async = require("async")
const { getCurrentConditions } = require("./accuWeather")
const { response } = require("./util")

// Set the region 
AWS.config.update({region: 'us-west-1'});

// enable environment variables
dotenv.config()

exports.accuWeatherToSqs = (event) => {
	console.log('accuWeatherToSqs(' + event + ')')
	return new Promise( async (resolve, reject) => {
		let sqsResponse = {}
		if(!!event) {
			try {
				const accuWeatherData = await getCurrentConditions(event)
				console.log(typeof accuWeatherData)
				console.log(accuWeatherData)
				if(Array.isArray(accuWeatherData) && accuWeatherData.length > 0) {
					console.log('queueing')
					sqsResponse = await _sendToSqs(accuWeatherData)
				}
				else {
					console.log('NOT queueing')
					sqsResponse = accuWeatherData
				}
			} catch (e) {
				console.error(e)
				reject(e)
			}
		} else {
			sqsResponse = response({})
		}
		console.log('reponse from SQS: ' + JSON.stringify(sqsResponse, null, 4))
		resolve(sqsResponse)
	})
}

const _sendToSqs = (weatherArray) => {
	return new Promise( async (resolve,reject) => {

		// Create an SQS service object
		const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

		const messagesQueued = []

		await async.each( weatherArray, async (weatherInfo, callback) => {

			console.log(weatherInfo)
			console.log(`QueueUrl: ${process.env.SQS_QUEUE_URL}`)

			const params = {
				DelaySeconds: 10,
				QueueUrl: process.env.SQS_QUEUE_URL,
				MessageAttributes: {},
				MessageBody: JSON.stringify(weatherInfo)
			}

			console.log('params: ' + params)

			await sqs.sendMessage(params, async (err, data) => {
				if (err) {
					console.log("Error", err);
				}
				else {
					await messagesQueued.push(data?.MessageId)
				}
			}).promise()
			.catch( e => {
				console.error(e)
			})
			callback
		}, (e) => {
			if(e) console.error('sendMessage.js > sendToSqs ', e)
			resolve(messagesQueued)
		})
	})
}