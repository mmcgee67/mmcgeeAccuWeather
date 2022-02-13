const { assert, expect } = require("chai");
const dotenv = require("dotenv")
const constants = require("../data/constants")
const sampleData = require("../data/sample.data")

// const { sendToBigPanda, randomStatus } = require("../lib/bigPanda")
const { sendToBigPanda } = require("../lib/bigPanda")
const { randomStatus } = require("../lib/util")

dotenv.config()

describe("BigPanda API Integration Unit Tests", () => {
	if(true) {
		it("lib/bigPanda.js > sendToBigPanda", async () => {
			const fromBigPanda = await sendToBigPanda(sampleData)
			console.log(fromBigPanda)
			try {
				assert.isNotNull(fromBigPanda)
				assert.isArray(fromBigPanda)
				assert.isNumber(fromBigPanda[0].statusCode)
				assert.isObject(fromBigPanda[0].data)

			} catch (e) {
				assert.fail(e)
			}
		})
	}

	if(true) {
		it("lib/bigPanda.js > randomStatus", () => {
			const statusReturned = randomStatus('Mostly Sunny')
			console.log(`results: ${statusReturned}`)
			try {
				assert.isString(statusReturned)

			} catch (e) {
				assert.fail(e)
			}
		})
	}
})