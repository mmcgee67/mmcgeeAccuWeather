const constants = require("../data/constants")
const sampleData = require("../data/sample.data")

const randomStatus = (weatherText) => {
	/*
	const useThis = Math.floor(Math.random() * Object.keys(constants?.STATUS)?.length)
	const useThisKey = Object.keys(constants.STATUS)[useThis]
	const _randomStatus = constants.STATUS[useThisKey]
	*/
	const useStatus = process.env.DEFAULT_STATUS || 'WARNING'
	console.log(useStatus)
	const _randomStatus = constants.STATUS[useStatus]
	return(_randomStatus)
}

const timeStamp = () => {
 return(Date.now())
}

const testData = () => {

	sampleData.map( (data, i) => {
		if(!data.timestamp) {
			sampleData[i].timestamp = timeStamp()
		}
	})
	return sampleData
}

module.exports = {
	randomStatus,
	timeStamp,
	testData
}