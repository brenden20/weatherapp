const wBase = 'https://api.openweathermap.org/data/3.0/onecall?lat='
const cBase = 'http://api.openweathermap.org/geo/1.0/zip?zip='
const key = '5d58b93e667e57e2a9646bb685486541'
const prompt = require('prompt-sync') ()

const getCoords = async () => {
    const zip = prompt('What is the zip code? ')

    try {
        const res = await fetch(cBase + zip + '&appid=' + key)

        if(res.ok) {
            const json = await res.json()
            const lat = json.lat;
            const lon = json.lon;
            getData(lat, lon)
        }
    } catch(err) {
        console.log(err)
    }
}

const getData = async (lat, lon) => {
    const path = wBase + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=imperial&appid=' + key;
    try {
        const res = await fetch(path)

        if(res.ok) {
            const json = await res.json()
            const data = json.current;
            const temp = data.temp
            const feels = data.feels_like
            console.log(`Current temperature is: ${temp} F \nFeels like: ${feels} F`)
        }
    } catch(err) {
        console.log(err)
    }
}

getCoords()