const axios = require("axios")
const async = require("async")
const dotenv = require("dotenv")
const constants = require("../data/constants")

const { randomStatus, timeStamp } = require("./util")

dotenv.config()

const sendToBigPanda = (weatherData) => {
	// console.log(weatherData)
	return new Promise( (resolve, reject) => {
		const responseArray = []
		console.log('weatherData: ' + JSON.stringify(weatherData, null, 4))
		async.each(weatherData, async (locationData, callback) => {
			console.log(typeof locationData)
			console.log(locationData)
			const pandaPayload = {}
			if(typeof locationData === 'object' && locationData?.statusCode === 200) {
				pandaPayload.app_key = process.env.BIGPANDA_APP_KEY

				// --------------------------------------------------------//
				/* randomizing the status to make it more interesting.     */
				pandaPayload.status = randomStatus(locationData.WeatherText)
				console.log('sending status: ' + pandaPayload.status)
				// --------------------------------------------------------//

				pandaPayload.timestamp = locationData?.EpochTime || locationData?.timestamp || timeStamp()
				pandaPayload.host = locationData?.city + ', ' + locationData?.state
				pandaPayload.city = locationData.city
				pandaPayload.state = locationData.state
				pandaPayload.check = constants.CHECK
				pandaPayload.incident_identifier = locationData.locationId.toString()
				pandaPayload.condition = locationData.WeatherText
				pandaPayload.description = locationData.WeatherText // sample data is ambiguous
				pandaPayload.link = locationData.Link
				// console.log('bigpanda payload', pandaPayload)

				try {
					const bigPandaPost = {
						method: 'post',
						url: process.env.BIGPANDA_EVENT_URL,
						headers: {
							'Authorization': 'Bearer ' + process.env.BIGPANDA_BEARER_TOKEN,
							'Content-Type': 'application/json'
						},
						data: pandaPayload
					}
					// console.log(JSON.stringify(bigPandaPost, null, 4))
		
					const responseBigPanda = await axios(bigPandaPost)
					responseArray.push({
						'statusCode': responseBigPanda.status,
						'data': responseBigPanda.data
					})
					// console.log('responseBigPanda: ' + responseBigPanda.status)
					// console.log(responseBigPanda.data)
				} catch (e) {
					console.error('Error from trying to post to BigPanda')
					console.error(e.response.status)
					console.error(e.response.statusText)
					console.error(e.response.data)
				}
			} else {
				responseArray.push( {
					'statusCode': locationData?.statusCode || 500,
					'data': 'no AccuWeather data available'
				})
			}

			callback // required to signal this itteration is complete
		},
		(e) => {
				console.log(responseArray)
				resolve(responseArray)
		})
	})
}

module.exports = {
	sendToBigPanda
}