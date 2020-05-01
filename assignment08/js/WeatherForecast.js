/*
    Tucker Kent
    WeatherForecast.js
    19SP_INFO_2134_WW Online - JavaScript II
    Thoendel
    1 May 2020
*/

class WeatherForecast { //creating WeatherForecast class

    constructor(date, temp, min, max) { // constructor for class 
        this.date = date; //setting date passed
        this.temp = temp; //setting temperature passed
        this.min = min; //setting min temperature passed
        this.max = max; //setting max temperature passed
    }

    getDate() { //returns the objects date 
        return this.date; //return statement
    }

    getTemp() { //getTemp method
        return this.temp; //returns temperature
    }

    getMinTemp() { //getMinTemp method
        return this.min; //returns min temperature
    }

    getMaxTemp() { //getMaxTemp method
        return this.max; //returns max temperature
    }

    getDayString() { //getDayString method
        let day = this.date.getDay(); //sets the day integer value returned from getDay() to day variable
        let dayAbbr; //declaring variable to hold the 3 Digit day string
        switch (day) { //dwitch statement based on returned value to day variable from getDay()
            case 0: //if day is 0
                dayAbbr = "Sun"; //sets string to Sun
                break; //break out of switch
            case 1: //if day is 1
                dayAbbr = "Mon"; //sets string to Mon
                break; //break out of switch
            case 2: //if day is 2
                dayAbbr = "Tue"; //sets string to Tue
                break;//break out of switch
            case 3: //if day is 3
                dayAbbr = "Wed"; //sets string to Wed
                break; //break out of switch
            case 4: //if day is 4
                dayAbbr = "Thu"; //sets string to Thu
                break; //break out of switc
            case 5: //if day is 5
                dayAbbr = "Fri"; //sets string to Fri
                break; //break out of switch
            case 6: //if day is 6
                dayAbbr = "Sat"; //sets string to Sat
                break;//break out of switch

        }
        let month = this.date.getMonth(); //declaring and setting month variable to int returned from getMonth()
        let dayNum = this.date.getDate(); //declaring and setting dayNum variable to int returned from getDate()
        let dayString = `${dayAbbr}, ${month + 1}/${dayNum}`; //declaring and setting dayString to template literal with return value
        return dayString; //returns string to caller
    }

}