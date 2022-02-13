// local libraries
const {
	accuWeatherToBigPanda,
	accuWeatherToSqs,
	sqsToBigPanda, 
	response
} = require("./lib/accuWeatherChallengeLib")

/*
	This is a package created as part of a coding challenge.  See NOTES.txt for details.
	This package will query the AccuWeather APIs for a given location and send them to
	BigPanda
*/

exports.handler = (event) => {
	console.log('event: ' + JSON.stringify(event))
	console.log('isArray: ' + Array.isArray(event))
	console.log('typeof: ' + typeof event)

	if( Array.isArray(event) && event.every( e => typeof e === 'number') )
	{
		if( process.env.CHALLENGE === 'ACCUWEATHER_TO_BIGPANDA' ) {
			console.log('AccuWeather to BigPanda')
			// Query AccuWeather and send to BigPanda 
			return accuWeatherToBigPanda(event)
		} else
		if( process.env.CHALLENGE === 'ACCUWEATHER_TO_SQS' ) {
			console.log('AccuWeather to SQS')
			// Get AccuWeather and send to AWS SQS
			return accuWeatherToSqs(event)
		}
	} else 
	if(typeof event === 'object') {
		console.log('SQS to BigPanda')
		// This function is expected to be invoked by an AWS SQS in response to
		// messages being place in the queue.
		return sqsToBigPanda(event)
	} else {
		console.log('Not a valid invocation')
		return response({})
	}
}