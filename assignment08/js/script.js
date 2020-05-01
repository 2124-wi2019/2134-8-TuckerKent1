/*
    Tucker Kent
    script.js
    19SP_INFO_2134_WW Online - JavaScript II
    Thoendel
    1 May 2020
*/
window.addEventListener('load', () => { //event listener on load event to call code
    
    startClock(); //uncommented 
    //YOUR CODE SHOULD START BELOW THIS LINE
    const currentDiv = document.getElementById("currentWxHolder"); //declaring and setting reference to div element
    const fiveDayDiv = document.getElementById("fiveDayInfoHolder"); //declaring and setting reference to div element
    let dataAttList = document.querySelectorAll("button"); //using querySelectorAll to return collection of button elements
    let userLat; //declaring latitude variable
    let userLong; //declaring longitude variable
    
    navigator.geolocation.getCurrentPosition(getCoords); //calling geolocation API --invokes getCoords() below

    document.addEventListener("click", (event) => { //adding event listener for click event on document -- for both buttons in one event
        if(event.target === dataAttList[0]){ //if the click occurs on the get current weather button
            getCurrentWX(); //calls method to get current weather
        } else if(event.target === dataAttList[1]){ //if click occurs on get five day button
            getFiveDay(); //calls method to retrieve five day forecase
        }
    });

    function getCoords(position) { //functin to store lat and lon coordinates from geolocation
        userLat = position.coords.latitude; //storing latitude
        userLong = position.coords.longitude; //storing longitude in variable
    }

    function getCurrentWX() {
        let weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&units=imperial&appid=a0452beb301c4a3af9f5c0fda6bdcc97`; //setting url to api using templte literal
                                    //note: I didn't see any reason not to just put the urls directly into the variable -- this might be repeating, but I thought maybe it was simpler
        fetch(weatherURL) //calling fetch API
        .then((response) => { //when response returns
            if(response.ok){ //if response is okay
                return response.json(); //returning response as json object
            }
            throw new Error(response.statusText); //if error logs the status
        })
        .then(data => { //wroking with the json data
            currentDiv.innerHTML = ""; //setting the innerHTML of the current weather div to blank to keep from repeating
            let location = document.createElement("h2"); //creating h2 element
            location.innerHTML = `${data.name}`; //setting h2 innerHTML to template literal with location name

            let innerDiv1 = document.createElement("div"); //creating div element
            let innerDiv2 = document.createElement("div"); //creating div element
            let innerDiv3 = document.createElement("div"); //creating div element
            innerDiv1.innerHTML = `Current Temp: ${data.main.temp}${"&#176"} F`; //setting first div to temperature 
            innerDiv2.innerHTML = `Max Temp: ${data.main.temp_max}${"&#176"} F`; //setting second div to max temp
            innerDiv3.innerHTML = `Min Temp: ${data.main.temp_min}${"&#176"} F`; //setting third div to min temp

            currentDiv.appendChild(location); //appending location h2
            currentDiv.appendChild(innerDiv1); //appending div
            currentDiv.appendChild(innerDiv2); //appending div
            currentDiv.appendChild(innerDiv3); //appending div
        })
        .catch(error => console.log("Error occurred during fetch operations " + error)); //if error log to console
    }

    function getFiveDay() { //functin to get the five day or 3 part forecast
        let fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLong}&units=imperial&appid=a0452beb301c4a3af9f5c0fda6bdcc97`; //setting url
                                //again -- thought posting the entire url for each api call had more simplicity than breaking it down and reusing
        fetch(fiveDayURL) //calling on fetch api
        .then((response) => { //when response is received
            if(response.ok){ //if response is okay
                return response.json(); //returning response as json object
            }
            throw new Error(response.statusText); //if error -- logging 
        })
        .then(data => { //working with json data returned
            fiveDayDiv.innerHTML = ""; //resetting fiveDay dive in case of multiple calls
            let h2 = document.createElement("h2"); //creating h2 element
            h2.innerHTML = `${data.city.name}`; //setting city name in h2 element

            let innerH3 = document.createElement("h3"); //creating h3 element -- assignment specified div but the example looked more like h3 so I changed it up
            innerH3.innerHTML = `3 Hour Forecast`; // setting template literal to h3

            fiveDayDiv.appendChild(h2); //appending to fiveDatDiv
            fiveDayDiv.appendChild(innerH3); //appending to fiveDayDiv
            
            for(let i = 0; i < 3; i++){ //data.list[i] -- for loop to iterate through the first 3 returned times
                let responseTime = `${data.list[i].dt_txt}`; //getting forecast time from json data
                let dateTime = new Date(responseTime);  //creating date object with forecast time returned
                let forecastTime = dateTime.toLocaleTimeString(); //setting forecastTime to a more suitable format

                let innerDiv1 = document.createElement("div"); //creating div for time
                innerDiv1.innerHTML = `Forecast Time(UTC): ${forecastTime}`; //setting innerDiv1 to template literal for the formatted time

                let innerDiv2 = document.createElement("div"); //creating div for temp
                innerDiv2.innerHTML = `Temperature: ${data.list[i].main.temp}${"&#176"} F`; //setting template literal with temp to div

                let innerDiv3 = document.createElement("div"); //creating div for max temp
                innerDiv3.innerHTML = `Max Temperature: ${data.list[i].main.temp_max}${"&#176"} F`; //setting template literal with max temp to div

                let innerDiv4 = document.createElement("div"); //creating div for min temp
                innerDiv4.innerHTML = `Min Temperature: ${data.list[i].main.temp_min}${"&#176"} F`; //setting template literal with min temp to div

                let hrElement = document.createElement("hr"); //creatign horizontal rule element

                let wXInstance = new WeatherForecast(dateTime, data.list[i].main.temp, data.list[i].main.temp_min, data.list[i].main.temp_max); //creating instance of WeatherForecast class with json data
                let dateDisplay = document.createElement("h4"); //creating h4 element to display wXInstance data
                dateDisplay.innerHTML = wXInstance.getDayString(); //calling getDayString() mthod of WeatherForecast class

                fiveDayDiv.appendChild(dateDisplay); //appending  h4 to fiveDayDiv
                fiveDayDiv.appendChild(innerDiv1); //appending div to fiveDayDiv
                fiveDayDiv.appendChild(innerDiv2); //appending div to fiveDayDiv
                fiveDayDiv.appendChild(innerDiv3); //appending div to fiveDayDiv
                fiveDayDiv.appendChild(innerDiv4); //appending div to fiveDayDiv
                fiveDayDiv.appendChild(hrElement); //appening horizontal rule element to fiveDayDiv
            }
        })
        .catch(error => console.log("Error occurred during fetch operations " + error)); //if error occurs during fetch -- logging 
    }


});