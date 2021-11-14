import React, {useState, useEffect} from 'react'
import { Coordinates } from './Results';

const WEATHER_URL = 'https://api.openweathermap.org';

export const getOverallSeverity = (locationArr: Array<Coordinates>) => {
    let severity = 0;
    for(let i = 0; i < locationArr.length; i++){
        severity += getSeverity(locationArr[i].lat, locationArr[i].long);
    }
    console.log('currSev', severity)
    return severity;
}

export const getSeverity = (lat: number, lng: number) => {
    if(lat && lng){
    fetch(`${WEATHER_URL}/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
    .then((response => response.json()))
    .then((data) =>{
        console.log("weather ID: " + data.weather[0].id);
        const one = String(data.weather[0].id).charAt(0);
        const firstDigit = Number(one);
        console.log("first digit is: " + firstDigit)

        switch(firstDigit) {
            case 2:
                return 4.0;
            case 3:
                return 2.0;
            case 5:
                return 3.0;
            case 6:
                return 4.5;
            case 7:
                return 5.0;
            case 8:
                return 1.0;
            default:
                return -1.0;
        }
    })
    .catch((err)=> {
        console.log("error", err);
    })

}
return 0;

}


const Weather = () => {
    return <></>;
}

export default Weather;