# mmcgeeAccuWeather
 Challenge project for BigPanda


const part1 = (event) => {
	/*
		This function queries AccuWeather for current conditions
	  and then pushes the results into BigPanda.

	  Can be invoked from the AWS console -> lambda by sending an array
	  of location Ids
	  In a "real" environment, should be invoked by a schedule setup
	  in eventBridge
	*/

	return accuWeatherToBigPanda(event)

}

const queueMessages = (event) => {
	// Get AccuWeather data from the AccuWeather API and send
	// them to AWS SQS

	// Can be invoked from the AWS console -> lambda by sending an array
	// of location Ids
	// In a "real" environment, should be invoked by an eventBridge schedule

	return accuWeatherToSqs(event)

}