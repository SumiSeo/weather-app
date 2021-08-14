// 594efc0ee83766089324c6ef966347d1;
const form = document.querySelector(".form");
const input = document.querySelector(".search__input");
const weatherContainer = document.querySelector(".weather");
const API_KEY = "594efc0ee83766089324c6ef966347d1";
const URL = "https://api.openweathermap.org/data/2.5/forecast?";

//Don't do keypress to form
form.addEventListener("submit", (e) => {
        e.preventDefault();
})


//Global execution means !! What I trigger when I land on the page
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        weatherContainer.classList.remove("hidden");
        bringWeather(e.target.value);
    }
})


const getAllTime = (timestamp)=>{
    const date = new Date(timestamp);
    let day = date.getDay();
    let dateDate = date.getDate();
    let dateMonth = date.getMonth();
    day = getTheDay(day);
    dateMonth = getTheMonth(dateMonth);
    return `${dateMonth} ${dateDate} ${day}`;
}

const getTheDay = (day)=>{
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
};

const getTheMonth = (dateMonth )=>{
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov", "Dec"];
    return months[dateMonth];
};


const bringWeather = (query) => {
    const searchFirst = query.slice(0, 1).toUpperCase();
    const searchRests = query.slice(1).toLowerCase();
    const searchFinal = searchFirst + searchRests;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.openweathermap.org/data/2.5/forecast?q=${searchFinal}&units=metric&appid=${API_KEY}`);
    xhr.send(null); //This is for "form" to write params
    xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        const responseList = response.list;
        const videoBG = document.querySelector("video source");
        const weatherBox1 =document.querySelector(".weather__box--1");
        const weatherBox2 =document.querySelector(".weather__box--2");
        const weatherBox3 =document.querySelector(".weather__box--3");
        const weatherBox4 =document.querySelector(".weather__box--4");
        const weatherToday = document.querySelector(".weather__today");
        console.log(responseList);
        weatherToday.innerHTML="";
        weatherBox1.innerHTML="";
        weatherBox2.innerHTML="";
        weatherBox3.innerHTML="";
        weatherBox4.innerHTML="";

        for(let i =0; i < responseList.length; i+=8){
            if(i === 0){
                const timestamp = responseList[i].dt_txt;
                const cityData = response.city.name;
                const finalDate = getAllTime(timestamp);
                const tempData = responseList[i].main.temp;
                const descriptionData = responseList[i].weather[i].description;
                const windData = responseList[i].wind.speed;
                const humidityData =  responseList[i].main.humidity;
                const cloudsData = responseList[i].clouds.all;
                const pressureData =  responseList[i].main.pressure;
                const mainWeather = displayWeather(cityData, finalDate, tempData, descriptionData, windData, humidityData, cloudsData, pressureData);
                weatherToday.appendChild(mainWeather);
                console.log(descriptionData);
               
                if(descriptionData.includes("rain")){
                    videoBG.parentNode.pause();
                    console.log(videoBG)
                    videoBG.setAttribute("src", "./src/rain2.mp4");
                    videoBG.parentNode.load();
                    videoBG.parentNode.addEventListener('ended', function(e) {
                        e.target.currentTime = 0;
                        e.target.play();
                    }, false);
                }
                if(descriptionData.includes("cloud")){
                    videoBG.parentNode.pause();
                    console.log(videoBG)
                    videoBG.setAttribute("src", "./src/Clouds above a road.mp4");
                    videoBG.parentNode.load();
                    videoBG.parentNode.addEventListener('ended', function(e) {
                        e.target.currentTime = 0;
                        e.target.play();
                    }, false);
                }
                if(descriptionData.includes("clear")){
                    videoBG.parentNode.pause();
                    console.log(videoBG)
                    videoBG.setAttribute("src", "./src/sun.mp4");
                    videoBG.parentNode.load();
                    videoBG.parentNode.addEventListener('ended', function(e) {
                        e.target.currentTime = 0;
                        e.target.play();
                    }, false);
                }
                if(descriptionData.includes("snow")){
                    videoBG.parentNode.pause();
                    console.log(videoBG)
                    videoBG.setAttribute("src", "./src/snow.mp4");
                    videoBG.parentNode.load();
                    videoBG.parentNode.addEventListener('ended', function(e) {
                        e.target.currentTime = 0;
                        e.target.play();
                    }, false);
                }
            } 
            if(i===8){
                const cityData = response.city.name;
                const tempData = responseList[i].main.temp;
                const timestamp = responseList[i].dt_txt;
                const finalDate = getAllTime(timestamp);
                const subWeather = displayWeather(cityData,finalDate,tempData);
                weatherBox1.appendChild(subWeather);
            }
            if(i===16){
                const cityData = response.city.name;
                const tempData = responseList[i].main.temp;
                const timestamp = responseList[i].dt_txt;
                const finalDate = getAllTime(timestamp);
                const subWeather = displayWeather(cityData,finalDate,tempData);
                weatherBox2.appendChild(subWeather);
            }
            if(i===24){
                const cityData = response.city.name;
                const tempData = responseList[i].main.temp;
                const timestamp = responseList[i].dt_txt;
                const finalDate = getAllTime(timestamp);
                const subWeather = displayWeather(cityData,finalDate,tempData);
                weatherBox3.appendChild(subWeather);
            }
            if(i===32){
                const cityData = response.city.name;
                const tempData = responseList[i].main.temp;
                const timestamp = responseList[i].dt_txt;
                const finalDate = getAllTime(timestamp);
                const subWeather = displayWeather(cityData,finalDate,tempData);
                weatherBox4.appendChild(subWeather);
            }
        }
    })
};



const displayWeather = (city, day, temperature, description, wind, humidity, clouds, pressure) => {
    const mainDiv = document.createElement("div");
    const cityTag =  document.createElement("h2");
    const dayTag = document.createElement("h4");
    const temperatureTag = document.createElement("h1");
    const descriptionTag = document.createElement("p");
    const details = document.createElement("div");
    const windTag = document.createElement("p");
    const humidityTag = document.createElement("p");
    const cloudsTag = document.createElement("p");
    const pressureTag = document.createElement("p");
   
    if(city && day && temperature && description && wind && humidity && clouds && pressure){

        cityTag.className="city";
        dayTag.className="day";
        temperatureTag.className="temperature";
        descriptionTag.className="description";
        details.className="details";
        windTag.className="wind";
        humidityTag.className="humidity";
        cloudsTag.className="clouds";
        pressureTag.className="pressure";

        cityTag.textContent=city;
        dayTag.textContent=day;
        temperatureTag.textContent=temperature;
        descriptionTag.textContent=description;
        windTag.textContent=`wind : ${wind} m/h`;
        humidityTag.textContent=`humidity : ${humidity} ％`;
        cloudsTag.textContent=`clouds : ${clouds} ％`;
        pressureTag.textContent=`pressure : ${pressure} p/H`;

        mainDiv.appendChild(cityTag);
        mainDiv.appendChild(dayTag);
        mainDiv.appendChild(temperatureTag);
        mainDiv.appendChild(descriptionTag);
       
        details.appendChild(windTag);
        details.appendChild(humidityTag);
        details.appendChild(cloudsTag);
        details.appendChild(pressureTag);


        mainDiv.appendChild(details);
        return mainDiv;
    }

    if(city && day && temperature){
        cityTag.className="city--mini";
        dayTag.className="day--mini";
        temperatureTag.className="temperature--mini";
        cityTag.textContent=city;
        dayTag.textContent=day;
        temperatureTag.textContent=temperature;
        mainDiv.appendChild(cityTag);
        mainDiv.appendChild(dayTag);
        mainDiv.appendChild(temperatureTag);
        return mainDiv;
    }
   
};


// weatherToday.innerHTML = `
                // <h2 class="city">${response.city.name}</h2>
                // <h4 class="day">${finalDate} </h4>
                // <h1 class="temperature">${responseList[i].main.temp}℃</h1>
                // <p class="description">${responseList[i].weather[i].description}</p>
                // <div class="details">  
                //     <p class="wind">Wind : ${responseList[i].wind.speed} m/h</p>
                //     <p class="humidity">Humidity : ${responseList[i].main.humidity} %</p>    
                //     <p class="clouds">Cloudness : ${responseList[i].clouds.all} %</p>
                //     <p class="pressure">Pressure : ${responseList[i].main.pressure} /Pa </p>
                // </div>  `;



/**
 * Things to do
 * 1. shorten get the day, 
 * 2. shorten get the month,
 * 3. shorten video handling
 * 4. Add if status code == 200
 * 5. I have to remember!!!!!! if I just persist using if ?!? even though I finished the function that I wanted 
 * poor computer is going to check everything... and it is useless...
 * 
 */