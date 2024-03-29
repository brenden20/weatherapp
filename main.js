const wBase = 'https://api.openweathermap.org/data/3.0/onecall?lat='
const cBase = 'http://api.openweathermap.org/geo/1.0/zip?zip='
const key = 'insert your API key here'

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
            const wind = data.wind_speed

            const info = document.createTextNode(`Current temperature is: ${temp} F \nFeels like: ${feels} F \nWind speed: ${wind}`)
            const div = document.getElementById("info")
            div.appendChild(info)

            console.log(`Current temperature is: ${temp} F \nFeels like: ${feels} F \nWind speed: ${wind}`)
        }
    } catch(err) {
        console.log(err)
    }
}
