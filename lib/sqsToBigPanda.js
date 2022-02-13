const async = require("async")
const { sendToBigPanda } = require("./bigPanda")

exports.sqsToBigPanda = (sqsData) => {

	return new Promise ( async (resolve,reject) => {
		// console.log(sqsData)
		const forceFail = (process.env.FORCE_FAIL === 'true')
		try {
			let bigPandaResult
			if(sqsData?.Records.length > 0) {
				const Records = sqsData.Records
				
				async.each( Records, async (sqsRecord, callback) => {
					console.log('sqs record (sqsRecord): ' + JSON.stringify(sqsRecord))
					if(!!sqsRecord?.body && !forceFail) {
						console.log('typeof sysRecord.body: ' + typeof sqsRecord.body)
						console.log(sqsRecord.body)
						const sqsWeatherData = []
						if(typeof sqsRecord.body === 'string') {
							sqsWeatherData.push(JSON.parse(sqsRecord.body))
						} else {
							sqsWeatherData.push(sqsRecord.body)
						}
						console.log(sqsWeatherData)
						bigPandaResult = await sendToBigPanda(sqsWeatherData)
						console.log('send to Big Panda response: ' + bigPandaResult)
					}
					callback
				}, (e) => {
					if(e) {
						console.error(e)
						reject(e)
					}
					if(forceFail) {
						console.error('simulate an error processing')
						reject({'response': 'not happy'})
					} else {
						console.log('resolve(bigPandaResult: ' + JSON.stringify(bigPandaResult))
						resolve(bigPandaResult)
					}
				})
			}
		} catch(e) {
			console.error(e)
			reject(e)
		}
	})
}