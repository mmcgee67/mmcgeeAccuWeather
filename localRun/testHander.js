const handler = require("../index")

const testHandler = async () => {
	try {
		const result = await handler.handler()
		console.log(result)
	} catch (e) {
		console.error(e)
	}
}

testHandler()