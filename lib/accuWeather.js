const dotenv = require("dotenv")
const axios = require("axios")
const async = require("async")
const { response } = require("./response")

dotenv.config()

const citySearch = (query) => {


	return null
}

const getLocationId = (where) => {
	return new Promise( async (resolve, reject) => {
		if(typeof where === 'object') {
			resolve(where)
		} else if(typeof where === 'number' && where.toString().length === 6) {
			const newArray = []
			newArray.push(where)
			resolve(newArray)
		} else {
			// it's not a location id, so lets see if we can use it to find one.
			// ToDo
			// console.log("rejecting... don't know where")
			reject("haven't built this yet.")
		}
	})
}

const cityState = (link) => {

	console.log(link)
	const splitted = link.split('/')
	console.log(splitted)
	const cityStateArray = splitted.split('-')
	let state = ""
	let city = ""
	cityStateArray.map( (thisWord, i) => {
		if(i < cityStateArray.length - 1) {
			city += thisWord.charAt(0).toUpperCase() + thisWord.slice(1) + " "
		} else if ( i === cityStateArray.length - 1) {
			state = thisWord.toUpperCase()
			city = city.slice(0,-1)
		}
	})
	return([city,state])
}


const getCurrentConditions = (where = null) => {
	console.log(`getCurrentConditions(${JSON.stringify(where, null, 4)})`);
	return new Promise( async (resolve) => {
		if(!where) {
			reject('Need somewhere to check')
		}
		const locationIdList = await getLocationId(where)
		const responses = [] // init the array of responses

		async.each( locationIdList, async (locationId, callback) => {
			const url = process.env['ACCUWEATHER_API_URL']
								+ process.env['ACCUWEATHER_CURRENT_CONDITIONS']
								+ locationId
								+ '?apikey='
								+ process.env.ACCUWEATHER_TOKEN

			try {
				const thisResponse = await axios.get(url)
				thisResponse?.data.map((response) => {
					response.locationId = locationId
					// response.status = thisResponse?.status
					//const [city,state] = cityState(response.Link)
					[response.city,response.state] = cityState(response.Link)
					// response.city = city
					// response.state = state
					responses.push(response)
				})

			} catch (e) {
				console.log(e)
				const thisResponse = {}
				thisResponse.status = (e?.response?.status || 500 )
				thisResponse.response = (e?.message || "unknown error") 
				responses.push(thisResponse)
			}
			callback
		}, (e) => {
			console.log(e)
			resolve(responses)
		})
	})
}

module.exports =  {
	getCurrentConditions,
	getLocationId,
	citySearch
}