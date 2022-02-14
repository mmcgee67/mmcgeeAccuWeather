# mmcgeeAccuWeather
 Challenge project for BigPanda

	The index.js has one function, the handler.  The handler contains logic
	to route based on the type of input data (event) sent to it and an environment
	variable.  There are 3 routes plus a default

	* accuWeatherToBigPanda
	* accuWeatherToSqs
	* sqsToBigPanda

	If the event is an array of numbers, it will look at the environment variable
	CHALLENGE.  If CHALLENGE is 'ACCUWEATHER_TO_BIGPANDA', it will query the AccuWeather
	API and send the results to BigPanda. If CHALLENGE is 'ACCUWEATHER_TO_SQS', it will
	query the AccuWeather API and send the results to a configured SQS queue. The target
	is configured using the environment variable SQS_QUEUE_URL and the Lamba has the 
	sqs:* role.

	Queries to the AccuWeather API use the following environment variables:

	* ACCUWEATHER_API_URL + ACCUWEATHER_CURRENT_CONDITIONS
	* ACCUWEATHER_TOKEN

	If the event is an object, then it's being invoked by an AWS SQS and will
	send weather data to the configured BigPana API endpoint. The endpoint is configured
	using the environment variables:

	* BIGPANDA_EVENT_URL
	* BIGPANDA_APP_KEY
	* BIGPANDA_BEARER_TOKEN

	If none of the above, the default returns a generic 404 "This is not the REST 
	API you are looking for!" *** This is not actually an API endpoint, but this is
	a "stock" message that I like, so I used it.

	All main functions use Promises with resolve/reject callbacks. Primary logic and
	calls are wrapped in try/catch to handle exceptions and should bubble up through
	reslove/rejects so that the handler will respond.

	Local testing is accomplished using the mocha and chai libraries. There are unit 
	tests for most utility functions and functional tests for the 4 possble routes. Some 
	data input error tests were also included.

	One feature that was included was mock data to simulate the AccuWeather data. The
	provided AccuWeather API token allows 50 invokations per day. If the environment 
	variable DATA_SOURCE is set to 'FILE', the function that queries AccuWeather will 
	respond with saved data.  This limits the possible set of data to 6 locations.

	Because BigPanda uses an epoch formatted timestamp, there is logic to add a timestamp
	if the AccuWeather data does not include an EpochTime or a timestamp (testing data
	has this removed so new timestamps will be used)

	The function that sends data to BigPanda adds the variable status to all payloads.
	During development, it was discoverd that in order for an event to be accepted,
	a status field is required.

	{
		"response": {
			"status": "invalid payload",
			"details": [
				"alert 1: 'status' must exist and be one of: ok,ok-suspect,warning,warning-suspect,critical,critical-suspect,unknown,acknowledged,oksuspect,warningsuspect,criticalsuspect,ok_suspect,warning_suspect,critical_suspect,ok suspect,warning suspect,critical suspect"
			],
			"error_id": "19428090-8d0e-11ec-8c6d-a504de0c0074"
		}
	}

	This also provided the valid status values, which were added to a constants dictionary,
	which is used to set the the status is payloads that are sent.

	Currenty, the function sets that status for all weather events being posted, to 
	a value that's stored in an environment variable, DEFAULT_STATUS. There is code that
	is currently commented out that could be used to randomize the value.

	A more interesting approach would be to use a mapping of one or more of the three
	AccuWeather data points that are returned:

	* WeatherText
  	* HasPrecipitation
	* PrecipitationType

	AWS SQS is used for the queueing. The queue is a standard (not FIFO) queue, so there
	are potentially duplicate events. BigPanda appears to be able to deduplicate, so this
	was deemed acceptible. A dead letter queue is also configured to handle situations
	where BigPanda API returns errors or does not respond.

	In order to test, another environment variable, FORCE_FAIL, can be set to true to
	force the function that sends to the BigPanda API to just return an error.

	One of the objectives was "Use the Custom Tag Editor to extract the zip code from the
	link field, and use the Correlation Editor to correlate the alerts by zip code." This 
	is done on the BigPanda side. I also created a custom extraction tag for state. I had
	already extracted the city and state in the function, but kept them, so state appears
	twice. I used several Ohio cities and found the correlation by state very satisfying.

	This code is deployed and has been tested on my personal AWS instance. The accuWeathertoBigPanda
	and accuWeatherToSqs are easily tested there by providing an array of location Ids and
	setting the CHALLENGE environment variable. Testing the sqsToBigPanda from the Lambda
	console is a bit more challenging. When an SQS message is entered there, the function
	struggles to properly JSON.parse the data which causes it to fail.  It works well
	when the SQS sends the payload.

	I did not implement an automatic retry for messages in the dead letter queue. I 
	prefer the workflow of manually inspecting the data there and then using the AWS
	SQS feature to redrive them to the original queue for processing. That has been
	tested.