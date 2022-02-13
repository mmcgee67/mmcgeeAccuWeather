const { assert, expect } = require("chai");
const dotenv = require("dotenv")
const constants = require("../data/constants")
const { handler } = require("../index")

dotenv.config()

describe("AccuWeather API Integration", () => {

	it("should provide generic response", async () => {
		if(true) {
			const genericResponse = await handler();
			console.log(`genericResponse: ${JSON.stringify(genericResponse)}`)
			try {
				assert.isNotNull(genericResponse)
				assert.isObject(genericResponse)
				assert.isNumber(genericResponse.statusCode)
				assert.isString(genericResponse.headers)
				assert.isString(genericResponse.body)
				expect(JSON.parse(genericResponse.body).response).to.be.equal(constants.GENERIC_RESPONSE_BODY)
			} catch (e) {
				assert.fail(e)
			}
		}
	}), 

	it("should get AccuWeather data and send to BigPanda", async () => {
		if(true){
			process.env['DATA_SOURCE'] = 'FILE'
			process.env['CHALLENGE'] = 'ACCUWEATHER_TO_BIGPANDA'
			const genericResponse = await handler(constants.DEFAULT_LOCATION_ID_LIST);
			console.log(`genericResponse: ${JSON.stringify(genericResponse)}`)
			try {
				assert.isNotNull(genericResponse)
				assert.isObject(genericResponse)
				assert.isNumber(genericResponse.statusCode)
				assert.isString(genericResponse.headers)
				assert.isArray(JSON.parse(genericResponse.body))
			} catch (e) {
				assert.fail(e)
			}
		}
	}),

	it("should get AccuWeather data and send to SQS", async () => {
		if(true){
			process.env['DATA_SOURCE'] = 'FILE'
			process.env['CHALLENGE'] = 'ACCUWEATHER_TO_SQS'
			const sqsResponse = await handler(constants.DEFAULT_LOCATION_ID_LIST);
			console.log(`sqsResponse: ${JSON.stringify(sqsResponse, null, 4)}`)
			try {
				assert.isNotNull(sqsResponse)
				assert.isArray(sqsResponse)
				expect(sqsResponse.every( e => typeof e === 'object') ).to.be.true
			} catch (e) {
				assert.fail(e)
			}
		}
	})
})