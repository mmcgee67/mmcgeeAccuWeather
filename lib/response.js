const constants = require("./constants")

exports.response = (data = null) => {
	
	let response = {}
	response.headers = JSON.stringify({ 'Content-type': 'application/json' })

	/*
	console.log('build response')
	console.log(data)
	console.log(typeof data)
	console.log(Object.keys(data).length)
	*/

	if(!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
		response.statusCode = 200
		response.body = JSON.stringify({ 'response': constants.GENERIC_RESPONSE_BODY})
	} else {
		response.statusCode = data[0].statusCode || 500
		response.body = JSON.stringify(data)

	}

	// console.log(`response: ${JSON.stringify(response)}`)
	return response
}