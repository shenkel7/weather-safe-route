import React, {useState, useEffect} from 'react'

const WEATHER_URL = 'https://api.openweathermap.org';

const Weather = () => {

    //lat: 32.9858,
    //lng: -96.7501
    useEffect(() => {
        getSeverity();
    }, [])

    const[severity, setSeverity] = useState(0);

    const getSeverity = () => {
        console.log("getting id")
        fetch(`${WEATHER_URL}/data/2.5/weather?lat=32.9858&lon=-96.7501&appid=929e14d00a8fbb5b111d7092b9acb7f1`)
        .then((response => response.json()))
        .then((data) =>{
            console.log("weather ID: " + data.weather[0].id);
            const one = String(data.weather[0].id).charAt(0);
            const firstDigit = Number(one);
            console.log("first digit is: " + firstDigit)

            switch(firstDigit) {
                case 2:
                    setSeverity(4.0);
                    break;
                case 3:
                    setSeverity(2.0);
                    break;
                case 5:
                    setSeverity(3.0);
                    break;
                case 6:
                    setSeverity(4.5);
                    break;
                case 7:
                    setSeverity(5.0);
                    break;
                case 8:
                    setSeverity(1.0);
                    break;
                default:
                    setSeverity(-1.0);
            }
            console.log("severity: " + severity);
        })
        .catch((err)=> {
            console.log("error", err);
        })
    }
    return <div>
        Weather
    </div>
}

export default Weather;