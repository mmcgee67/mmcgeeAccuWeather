const axios = require("axios")
const async = require("async")
const dotenv = require("dotenv")
const constants = require("../lib/constants")
const { __esModule } = require("async")

dotenv.config()

const randomStatus = (weatherText) => {
	const useThis = Math.floor(Math.random() * Object.keys(constants?.STATUS)?.length)
	const useThisKey = Object.keys(constants.STATUS)[useThis]
	const _randomStatus = constants.STATUS[useThisKey]
	return(_randomStatus)
}

const sendToBigPanda = (weatherData) => {
	console.log(weatherData)
	return new Promise( (resolve, reject) => {
		const responseArray = []
		async.each(weatherData, async (locationData, callback) => {
			const pandaPayload = {}
			if(typeof locationData === 'object' && locationData?.statusCode === 200) {
				pandaPayload.app_key = process.env.BIGPANDA_APP_KEY

				// --------------------------------------------------------//
				/* randomizing the status to make it more interesting.     */
				pandaPayload.status = randomStatus(locationData.WeatherText)
				// --------------------------------------------------------//

				pandaPayload.timestamp = locationData.EpochTime
				pandaPayload.host = locationData.city
				pandaPayload.check = constants.CHECK
				pandaPayload.incident_identifier = locationData.locationId.toString()
				pandaPayload.condition = locationData.WeatherText
				pandaPayload.description = locationData.WeatherText // sample data is ambiguous
				pandaPayload.link = locationData.Link
				console.log('bigpanda payload')
				console.log(pandaPayload)
			}

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
				console.log(JSON.stringify(bigPandaPost, null, 4))
	
				const responseBigPanda = await axios(bigPandaPost)
				responseArray.push({
					'statusCode': responseBigPanda.status,
					'data': responseBigPanda.data
				})
				// console.log('responseBigPanda: ')
				// console.log(responseBigPanda)
			} catch (e) {
				console.error('Error from trying to post to BigPanda')
				console.error(e.response.status)
				console.error(e.response.statusText)
				console.error(e.response.data)
			}

			callback // required to signal this itteration is complete
		},
		(e) => {
			if(e) reject(e)
			else
				console.log('x')
				resolve(responseArray)
		})
	})
}

module.exports = {
	sendToBigPanda, 
	randomStatus
}