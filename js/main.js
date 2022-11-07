import { my_key } from './private.js'
{
    let form = document.getElementById('upcomingCity');
    
    async function handleSubmit(e){
        e.preventDefault();
        let cityName = e.target.upcomingCity.value;
        let cityWeather = await getCityInfo(cityName);
        buildWeatherCard(cityWeather)
        e.target.cityName.value = '';
    }

    async function getCityInfo(cityName){
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${my_key}`)
        let data = await res.json()
        return data
    }

    function buildWeatherCard(weatherObj){

        let card = document.createElement('div');
        card.className = 'card';

        let image = document.createElement('img');
        image.className = 'card-img-top m-2';
        image.src = weatherObj.weather.icon;
        card.append(image);

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // City Name
        let cityTitle = document.createElement('h4');
        cityTitle.className = 'card-title'
        cityTitle.innerHTML = weatherObj.name;

        // Current Weather
        let currentWeather = document.createElement('p');
        currentWeather.className = 'card-text'
        currentWeather.innerHTML = `Current Tempature: ${main.temp}`;

        // feelsLike Weather
        let feelsLike = document.createElement('p');
        feelsLike.className = 'card-text'
        feelsLike.innerHTML = `It feels like: ${main.feels_like}`;

        // High of the day
        let cityHigh = document.createElement('p');
        cityHigh.className = 'card-text'
        cityHigh.innerHTML = `High Today: ${main.temp_max}`;

        // Low of the day
        let cityLow = document.createElement('p');
        cityLow.className = 'card-text'
        cityLow.innerHTML = `Low Today: ${main.temp_min}`;

        cardBody.append(cityTitle);
        cardBody.append(currentWeather)
        cardBody.append(cityHigh);
        cardBody.append(cityLow);
        cardBody.append(feelsLike);

        card.append(cardBody);

        let col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-3'

        col.append(card)

        let veiw = document.getElementById('city');
        veiw.append(col);
    }

    form.addEventListener('submit', handleSubmit);
}