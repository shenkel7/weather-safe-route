import React, {useState, useEffect} from 'react'
import { Coordinates } from './Results';

const WEATHER_URL = 'https://api.openweathermap.org';

export const getOverallSeverity = async (locationArr: Array<Coordinates>) => {
    let severity = 0;
    for(let i = 0; i < locationArr.length; i++){
        console.log(await getSeverity(locationArr[i].lat, locationArr[i].long));
    }
    console.log('currSev', severity)
    return severity;
}

export const getSeverity = async (lat: number, lng: number) => {
    if(lat && lng){
    fetch(`${WEATHER_URL}/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
    .then((response => response.json()))
    .then((data) =>{
        console.log("weather ID: " + data.weather[0].id);
        const one = String(data.weather[0].id).charAt(0);
        const firstDigit = Number(one);
        console.log("first digit is: " + firstDigit)
        let output = 0;

        switch(firstDigit) {
            case 2:
                output = 4.0;
                break;
            case 3:
                output = 2.0;
                break;
            case 5:
                output = 3.0;
                break;
            case 6:
                output = 4.5;
                break;
            case 7:
                output = 5.0;
                break;
            case 8:
                output = 1.0;
                break;
            default:
                output = -1.0;
                break;
        }
        return output;
    })
    .catch((err)=> {
        console.log("error", err);
    })

}
}


const Weather = () => {
    return <></>;
}

export default Weather;