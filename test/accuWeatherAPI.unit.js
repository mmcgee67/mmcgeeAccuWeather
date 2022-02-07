const { assert, expect } = require("chai");
const dotenv = require("dotenv")
const constants = require("../lib/constants")
const sampleData = require("./sample.data")
const {
	getLocationId,
	getCurrentConditions
 } = require("../lib/accuWeather")

dotenv.config()

describe("AccuWeather API Integration Unit Tests", () => {


		it("lib/accuWeather.js/getLocationId", async () => {
			if(false) {
				try {
					const locationId = await getLocationId(constants.DEFAULT_LOCATION_ID);
					assert.isNotNull(locationId)
					assert.isArray(locationId)
					assert.isNumber(locationId[0])
					expect(locationId[0]).to.be.equal(constants.DEFAULT_LOCATION_ID)
				} catch (e) {
					assert.fail(e)
				}
			}
		}), 

	it("lib/accuWeather.js > getLocationId", async () => {
		if(false) {
			try {
				const locationId = await getLocationId(constants.DEFAULT_LOCATION_ID_LIST);
				assert.isNotNull(locationId)
				assert.isArray(locationId)
				assert.isNumber(locationId[0])
				expect(locationId).to.be.equal(constants.DEFAULT_LOCATION_ID_LIST)
			} catch (e) {
				assert.fail(e)
			}
		}
	}),

	it("lib/accuWeather.js > getCurrentConditions", async () => {
		if(true) {
			try {
				const currentConditions = await getCurrentConditions(constants.DEFAULT_LOCATION_ID_LIST);
				console.log(currentConditions)
				assert.isNotNull(currentConditions)
				assert.isArray(currentConditions)
				assert.isNotNull(currentConditions[0])
				assert.isObject(currentConditions[0])
				assert.isNumber(currentConditions[0].status)
				assert.isNotNull(currentConditions[0].WeatherText)
				assert.isString(currentConditions[0].WeatherText)
			} catch (e) {
				assert.fail(e)
			}
		}
	}) 

})