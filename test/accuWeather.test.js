const { assert, expect } = require("chai");
const dotenv = require("dotenv")
const constants = require("../lib/constants")
const { handler } = require("../index")

dotenv.config()

describe("AccuWeather API Integration", () => {

	it("should provide generic response", async () => {
		try {
			const genericResponse = await handler();
			console.log(genericResponse)
			assert.isNotNull(genericResponse)
			assert.isObject(genericResponse)
			assert.isNumber(genericResponse.statusCode)
			assert.isString(genericResponse.headers)
			assert.isString(genericResponse.body)
			expect(JSON.parse(genericResponse.body).response).to.be.equal(constants.GENERIC_RESPONSE_BODY)
		} catch (e) {
			assert.fail(e)
		}
	}), 

	it("should provide a response for a location", async () => {
		try {
			const eventToSend = { 'locationIdList': constants.DEFAULT_LOCATION_ID_LIST }
			const genericResponse = await handler(eventToSend);
			// console.log(`genericResponse: ${JSON.stringify(genericResponse)}`)
			assert.isNotNull(genericResponse)
			assert.isObject(genericResponse)
			assert.isNumber(genericResponse.statusCode)
			assert.isString(genericResponse.headers)
			assert.isString(genericResponse.body)
			assert.isArray(JSON.parse(genericResponse.body))
		} catch (e) {
			assert.fail(e)
		}
	})

	/*
	it("should fail...", async () => {
		try {
			const eventToSend = { 'locationId': 0 }
			const genericResponse = await handler(eventToSend);
			console.log(genericResponse)
			assert.isNotNull(genericResponse)
			assert.isObject(genericResponse)
			assert.isNumber(genericResponse.statusCode)
			assert.isString(genericResponse.headers)
			assert.isString(genericResponse.body)
		} catch (e) {
			assert.fail(e)
		}
	})
	*/
})