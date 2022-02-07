const testString = "http://www.accuweather.com/en/us/delaware-oh/43015/current-weather/335038?lang=en-us"
const locationId = 335038

console.log(testString)

const splitted = testString.split('/')
console.log(splitted[5])
const [city, state] = splitted[5].split('-')
console.log(city)
console.log(state)

