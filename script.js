let weather = {
    "apiKey" :"d6b0597ed668f0e17537efe91fc64d69",
    fetchLongLat: function (city) {
       fetch(
            "https://api.openweathermap.org/geo/1.0/direct?q="
            + city +"&limit=1&appid=" 
            + this.apiKey
        ).then((response) => response.json()
        .then((data) => this.fetchWeather(data))
        );
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')";
    },
    fetchWeather: function (data) {
        const {lat} = data[0];
        const {lon} = data[0];
        console.log("lat: "+lat+" lon: "+lon);
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="
        + lat + "&lon="
        + lon + "&units=metric&appid=" + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+".png"; 
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp  + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        //document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search : function () {
        this.fetchLongLat(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter" ) {
        weather.search();
    }
})

weather.fetchLongLat('Santa Clara');
//ssl