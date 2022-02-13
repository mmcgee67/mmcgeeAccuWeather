const constants = require("../data/constants")

exports.response = (data = null) => {
	
	let response = {}
	response.headers = JSON.stringify({ 'Content-type': 'application/json' })

	/*
	console.log('build response')
	console.log(data)
	console.log(typeof data)
	console.log(data.length)
	console.log(Object.keys(data).length)
	*/

	if(!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
		response.statusCode = 404
		response.body = JSON.stringify({ 'response': constants.GENERIC_RESPONSE_BODY})
	} else if(data?.length > 0) {
		let countStatusCode200 = false
		response.statusCode = 500
		data.map( (thisData, i) => {
			data[i].body = thisData.data
			delete data[i].data
			if(thisData.statusCode === 200 || thisData.statusCode === 201)
				countStatusCode200 = true
		})
		if(countStatusCode200) response.statusCode = 200
		response.body = JSON.stringify(data)
	}
	else {
		response.statusCode = data[0].statusCode || 500
		response.body = JSON.stringify(data)

	}

 	// console.log(`response: ${JSON.stringify(response)}`)
	return response
}