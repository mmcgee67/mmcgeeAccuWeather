const { sendToBigPanda } = require("./bigPanda")
const { getCurrentConditions } = require("./accuWeather")
const { response } = require("./response")

exports.accuWeatherToBigPanda = (event) => {
	return new Promise( async (resolve, reject) => {
		let bigPandaResponse
		if(!!event) {
			try {
				// Get AccuWeather data from the AccuWeather API
				const accuWeatherData = await getCurrentConditions(event)
				// console.log('accuWeatherData: ' + JSON.stringify(accuWeatherData, null, 4))

				// If successful, send AccuWeather data to the BigPanda API
				if(accuWeatherData?.length > 0) {
					bigPandaResponse = await sendToBigPanda(accuWeatherData)
					// console.log('bigPandaResponse: ' + JSON.stringify(bigPandaResponse, null, 4))
					bigPandaResponse = response(bigPandaResponse)
					resolve(bigPandaResponse)
				}
				else { resolve(response({}))}
			} catch (e) {
				console.error(e)
				reject(e)
			}
		} else {
			resolve(bigPandaResponse)
		}
	})
}