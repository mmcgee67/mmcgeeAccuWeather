const { assert, expect } = require("chai");
const dotenv = require("dotenv")
const constants = require("../lib/constants")
const sampleData = require("./sample.data")

const { sendToBigPanda } = require("../lib/bigPanda")

dotenv.config()

describe("BigPanda API Integration Unit Tests", () => {
	it("lib/bigPanda.js > sendToBigPanda", async () => {
		if(true) {
			// console.log(sampleData)
			const sentToBigPanda = await sendToBigPanda(sampleData)
			console.log('results:')
			console.log(sentToBigPanda)
			// console.log(JSON.stringify(sentToBigPanda, null, 4))
			try {
				assert.isArray(sentToBigPanda)

			} catch (e) {
				assert.fail(e)
			}
		}
	})


})