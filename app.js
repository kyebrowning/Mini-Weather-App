window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=af9c77e21b8555c61438d8dc166bea11&units=imperial`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const temp = Math.round(data.main.temp);
                let weather = data.weather[0].main;
                //Set DOM elements from the API
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = weather;
                locationTimezone.textContent = `${data.name}, ${data.sys.country}`;
                //Set Icon
                switch (weather){
                    case "Clear": 
                        weather = "CLEAR_DAY";
                        break;
                    case "Clouds":
                        weather = "PARTLY_CLOUDY_DAY"; 
                        break;
                    case "Rain":
                        weather = "RAIN";
                        break;
                    case "Drizzle":
                        weather = "RAIN";
                        break;
                    case "Thunderstorm":
                        weather = "RAIN";
                        break;
                    case "Snow":
                        weather = "SNOW";
                        break;
                    case "Fog":
                        weather = "FOG";
                        break;
                    default:
                        weather = "PARTLY_CLOUDY_DAY";            
                }
                setIcons(weather, document.querySelector('.icon'));
                console.log(weather);
            });
        });
    }


    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        let currentIcon = icon;
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});