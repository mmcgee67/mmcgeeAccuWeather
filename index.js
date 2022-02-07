const { response } = require("./lib/response")
const { getCurrentConditions } = require("./lib/accuWeather")
const constants = require("./lib/constants")

/*
	mmcgeeAccuWeather

	This is a package created as part of a coding challenge.  See NOTES.txt for details.

	This package will query the AccuWeather APIs for a given location...

*/

exports.handler = async (event) => {
	// console.log(`handler:event: ${JSON.stringify(event)}`)

	let accuWeatherResponse = {}

	try {
		if(!!event) {
			try {
				accuWeatherResponse = await getCurrentConditions(event?.locationId)
			} catch (e) {
				console.error(e)
			}
		}
	} catch (e) {
		console.error(e)
	}

	
	
	return response(accuWeatherResponse)
}