const { response } = require("./lib/response")
const { getCurrentConditions } = require("./lib/accuWeather")
const constants = require("./lib/constants")
const { keys } = require("./test/sample.data")
const { sendToBigPanda } = require("./lib/bigPanda")

/*
	mmcgeeAccuWeather

	This is a package created as part of a coding challenge.  See NOTES.txt for details.

	This package will query the AccuWeather APIs for a given location...

*/

exports.handler = async (event) => {
	console.log(`handler:event: ${JSON.stringify(event)}`)

	let accuWeatherResponse = {}
	let bigPandaResponse = {}

	/* -----  Get AccuWeather data from the AccuWeather API ----- */
	if(!!event) {
		try {
			accuWeatherResponse = await getCurrentConditions(event)
		} catch (e) {
			console.error(e)
		}
	}

	/* -----   Send AccuWeather data to the BigPanda API  ----- */
	if(Object.keys(accuWeatherResponse).length > 0) {
		try {
			bigPandaResponse = await sendToBigPanda(accuWeatherResponse)
		} catch (e) {
			console.error(e)
		}
	}

	// return response(accuWeatherResponse)
	return response(bigPandaResponse)
}