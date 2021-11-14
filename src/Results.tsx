import React, {useEffect, useState, useRef, useMemo} from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import {useThrottle, useThrottleCallback} from '@react-hook/throttle';

  const center = {
    lat: 32.9858,
    lng: -96.7501
  };

  const start = {
    lat: 32.9858,
    lng: -96.7501
  }

  const startStr = '32.9858,-96.7501'
  const endStr = '36.9858,-97.7501'

  const end = {
    lat: 40,
    lng: -90,
  }


type Coordinates = {
    lat: number;
    long: number;
}

// return Coordinates[]
const locationList = (locationArr: Array<any>, routeIndex: number, intervals: number) => {
    const output = [];

    if(locationArr){
        const intervalLength = Math.floor(locationArr.length / intervals);
        const steps = locationArr[routeIndex].legs[0].steps;
        const endObj = {
            lat: steps[steps.length - 1].start_location.lat(),
            long: steps[steps.length - 1].start_location.lng(),
        }
        output.push(endObj);
        // console.log(locationArr);
        
        for(let i = 0; i < locationArr.length; i += intervalLength){
            const steps = locationArr[routeIndex].legs[0].steps;
            const tempObj = {
                lat: steps[i].start_location.lat(),
                long: steps[i].start_location.lng()
            }
            output.push(tempObj);
        }
    }

    return output;
}

const Results = () => {
    const [directions, setDirections] = useThrottle<any>(undefined);
    const [routeIndex, setRouteIndex] = useState(0);
    const INTERVALS = 2;

    useEffect(() => {
    }, [])

    const locationMemo = useMemo(() => locationList(directions?.routes, routeIndex, INTERVALS), [directions]);

    return (
      <div>
        <div>

        <GoogleMap
          mapContainerStyle={{width: '75%', height: '100vh', position: 'absolute'}}
          center={center}
          zoom={10}>
            <DirectionsService 
                options={{origin: startStr, destination: endStr, travelMode: google.maps.TravelMode.DRIVING, provideRouteAlternatives: true}}
                callback={(result, status) => {
                    if(status === "OK"){
                        setDirections(result);
                        console.log(locationMemo);

                        // console.log(result?.routes[0].legs[0].steps[0].start_location.lat());
                    }

                }}
            />
            {directions && directions.routes.map((element: any, index: number) => 
                <DirectionsRenderer options={{hideRouteList: false, routeIndex: index}} directions={directions}/>)
            }) 
                
        </GoogleMap>

        <div style={{position: 'absolute', right: 0, backgroundColor: 'white', height: '100%', padding: 10, width: '20%', borderTopLeftRadius: 25, borderBottomLeftRadius: 25}}>
            <p>
                Hey
            </p>
        </div>
        </div>
      </div>
    )
}

export default Results;