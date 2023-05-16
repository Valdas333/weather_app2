var mykey = config.MY_KEY;
let weather = {
    apiKey: mykey,

    // get data from server, fetch
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
            .then((response) => {
                if (!response.ok) { alert("No weather data"); throw new Error("No weather data") }
                return response.json()
                    .then((data) => this.displayWeather(data))
            }
            )
    },

    // show data
    displayWeather: function (data) {
        let { name } = data;
        let { description, icon } = data.weather[0];
        let { temp, humidity } = data.main;
        let { speed } = data.wind;

        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".temperature").innerHTML = temp + "&deg" + " C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind-speed").innerHTML = "Wind speed: " + speed + "km/h";
    },
    search: function () {
        let city = document.querySelector(".search-bar").value;
        this.fetchWeather(city);
    }
}
document.querySelector(".search button").addEventListener("click", () =>weather.search())

weather.fetchWeather("Vilnius")