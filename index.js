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
        let search;
        weatherContainer.classList.remove("hidden");
        search =e.target.value;
        bringWeather(search);
    }
})

/**
 * getTheDay function will receive index number of the day, and then convert to "Exact name of the day"
 * @param {index} day 
 * @returns string(the  name of the day)
 */
const getTheDay = (day)=>{
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
};


/**
 * getTheMonth function will receive index number of the month, and then convert to "the name of month"
 * @param {index} dateMonth 
 * @returns string(the name of the month)
 */
const getTheMonth = (dateMonth )=>{
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov", "Dec"];
    return months[dateMonth];
};

const getAllTime = (timestamp)=>{
    const date = new Date(timestamp);
    let day = date.getDay();
    let dateDate = date.getDate();
    let dateMonth = date.getMonth();
    day = getTheDay(day);
    dateMonth = getTheMonth(dateMonth);
    return `${dateMonth} ${dateDate} ${day}`;
};


/**
 * This query comes from the user input. Once bringWeather function gets query, this function will
 * mainly call the API and call another function "displayWeather" to get mainDiv.
 * mainDiv will show all the contents.
 * Moreover, this query will change the background video depends on the weather.
 * @param {string} query 
 */
const bringWeather = (query) => {
    const searchFirst = query.slice(0, 1).toUpperCase();
    const searchRests = query.slice(1).toLowerCase();
    const searchFinal = searchFirst + searchRests;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.openweathermap.org/data/2.5/forecast?q=${searchFinal}&units=metric&appid=${API_KEY}`);
    xhr.send(null); //This is for "form" to write params
   
    xhr.addEventListener("readystatechange", () => {
        if(xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE) {
        const response = JSON.parse(xhr.responseText);
        const responseList = response.list;
        const videoBG = document.querySelector("video source");
        const weatherBox1 =document.querySelector(".weather__box--1");
        const weatherBox2 =document.querySelector(".weather__box--2");
        const weatherBox3 =document.querySelector(".weather__box--3");
        const weatherBox4 =document.querySelector(".weather__box--4");
        const weatherBoxes =document.querySelectorAll(".weather__box");
        const weatherToday = document.querySelector(".weather__today");
        weatherToday.innerHTML="";
       
        console.log(responseList);
       
        weatherBoxes.forEach(box=>{
            box.innerHTML="";
        })
        console.log(response);
        
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

                videoBG.parentNode.pause();
                if(descriptionData.includes("rain")){
                    videoBG.setAttribute("src", "./src/rain2.mp4");
                }
                else if(descriptionData.includes("cloud")){
                    videoBG.setAttribute("src", "./src/Clouds above a road.mp4");
                }

                else if(descriptionData.includes("clear")){
                    videoBG.setAttribute("src", "./src/sun.mp4");
                }
                else if(descriptionData.includes("snow")){
                    videoBG.setAttribute("src", "./src/snow.mp4");
                }
                videoBG.parentNode.load();
                videoBG.parentNode.addEventListener('ended', function(e) {
                    e.target.currentTime = 0;
                    e.target.play();
                }, false);
                console.log("city",cityData, "Date",finalDate, "temp",tempData, "description",descriptionData, "wind",windData, "humidity",humidityData, "cloud",cloudsData, "pressure",pressureData)


            } 
         
            else if(i===8) {
                //index number 8/ 16/ 24/ 32
                const cityData = response.city.name;
                const tempData = responseList[i].main.temp;
                const timestamp = responseList[i].dt_txt;
                const finalDate = getAllTime(timestamp);
                const subWeather = displayWeather(cityData,finalDate,tempData);
                weatherBox1.appendChild(subWeather);
            
            }
            
            else if(i===16){
                const cityData = response.city.name;
                const tempData = responseList[i].main.temp;
                const timestamp = responseList[i].dt_txt;
                const finalDate = getAllTime(timestamp);
                const subWeather = displayWeather(cityData,finalDate,tempData);
                weatherBox2.appendChild(subWeather);
            }
            else if(i===24){
                const cityData = response.city.name;
                const tempData = responseList[i].main.temp;
                const timestamp = responseList[i].dt_txt;
                const finalDate = getAllTime(timestamp);
                const subWeather = displayWeather(cityData,finalDate,tempData);
                weatherBox3.appendChild(subWeather);
            }
            else if(i===32){
                const cityData = response.city.name;
                const tempData = responseList[i].main.temp;
                const timestamp = responseList[i].dt_txt;
                const finalDate = getAllTime(timestamp);
                const subWeather = displayWeather(cityData,finalDate,tempData);
                weatherBox4.appendChild(subWeather);
            }
        }}
        
    })
    
};



/**
 * displayWeather function build several html tag, add CSS class, 
 * and then fill the contents which were received as params.
 * Several params are optional depends on the use purpose: main weather display, small weather display.
 * params. 
 * @param {string} city mandatory
 * @param {string} day mandatory
 * @param {number} temperature mandatory
 * @param {string} description optional
 * @param {number} wind optional
 * @param {number} humidity optional
 * @param {number} clouds optional
 * @param {number} pressure optional
 * @returns mainDiv which is filled many html tags which are created with this function and mainDiv will
 * show all the weather-related to contents to user.
 */

const displayWeather = (city, day, temperature, description, wind, humidity, clouds=0, pressure) => {
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
        windTag.textContent=`Wind : ${wind} m/h`;
        humidityTag.textContent=`Humidity : ${humidity} ％`;
        cloudsTag.textContent=`Clouds : ${clouds} ％`;
        pressureTag.textContent=`Pressure : ${pressure} p/H`;

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





/**
 * Things to do
 * 1. shorten get the day, :::::::::done
 * 2. shorten get the month, :::::::::done
 * 3. shorten video handling:::::::::done
 * 4. Add if status code == 200
 * 5. I have to remember!!!!!! if I just persist using if ?!? even though I finished the function that I wanted 
 * poor computer is going to check everything... and it is useless...
 * 
 */