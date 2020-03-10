const query = document.getElementById('query')
const searchButton = document.getElementById('search-button')
const weatherIcon = document.getElementById('weather-icon')
const weatherCondition = document.getElementById('weather-condition')
const mainTemp = document.getElementById('main-temp')
const cityName = document.getElementById('location')

let zipCode = "65807"

query.addEventListener("keypress", function(e) {
    if (e.key === 'Enter') {
        e.preventDefault()
        zipCode = query.value
        fetchWeather()
    }
})
searchButton.addEventListener("click", function(e) {
    e.preventDefault()
    zipCode = query.value
    fetchWeather()
})

function fetchWeather() {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&APPID=e538d14000191c1ac241c729a7e88a1a`,
        { mode: "cors" }
      )
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            console.log(response)

            let iconCode = response.weather[0].icon
            let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"
            weatherIcon.src = iconUrl
            weatherCondition.innerHTML = response.weather[0].main

            mainTemp.innerHTML = response.main.temp.toFixed(0) + " &#8457"

            cityName.innerHTML = response.name
        })
        .catch(function(err) {
            alert("Zip code not found. Please enter a valid zip code.")
        })
}