const { assert, expect } = require("chai");
const dotenv = require("dotenv")
const constants = require("../data/constants")
const sampleSqsData = require("../data/sampleSqsData.2")
const { handler, queueMessages } = require("../index")
const { sqsToBigPanda } = require("../lib/sqsToBigPanda")
const { accuWeatherToSqs } = require("../lib/accuWeatherToSqs")

dotenv.config()

describe("Test SQS queing", () => {

	it("accuWeatherToSqs.js > accuWeatherToSqs", async () => {
		if(true) {
			const responseFromAccuWeatherToSqs = await accuWeatherToSqs(constants.DEFAULT_LOCATION_ID_LIST);
			console.log(`responseFromAccuWeatherToSqs: ${JSON.stringify(responseFromAccuWeatherToSqs)}`)
			try {
				assert.isNotNull(responseFromAccuWeatherToSqs)
				assert.isArray(responseFromAccuWeatherToSqs)
			} catch (e) {
				assert.fail(e)
			}
		}
	}),

	it("sqsToBigPanda.js > sqsToBigPanda", async () => {
		if(true) {
			const handlerRepsonse = await sqsToBigPanda(sampleSqsData);
			console.log(`handlerRepsonse: ${JSON.stringify(handlerRepsonse)}`)
			try {
				assert.isNotNull(handlerRepsonse)
				// assert.isArray(handlerRepsonse)
			} catch (e) {
				assert.fail(e)
			}
		}
	}) 

})

