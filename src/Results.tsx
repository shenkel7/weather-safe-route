import React, {useEffect, useState, useRef, useMemo} from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import debounce from 'lodash/debounce';
import { RootStateOrAny, useSelector } from 'react-redux';
import { getOverallSeverity } from './Weather';

  const center = {
    lat: 32.9858,
    lng: -96.7501
  };

//   const startStr = '32.9858,-96.7501'
//   const endStr = '36.9858,-97.7501'

export type Coordinates = {
    lat: number;
    long: number;
}

// return Coordinates[]
const locationList = (locationArr: Array<any>, routeIndex: number, intervals: number) => {
    const output = [];

    if(locationArr && locationArr.length > 0){
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
    const [directions, setDirections] = useState<any>(undefined);
    const [routeIndex, setRouteIndex] = useState(0);
    const INTERVALS = 2;

    const startStr = useSelector((state: RootStateOrAny) => state.location.startLocation)
    const endStr = useSelector((state: RootStateOrAny) => state.location.endLocation)
    const locationMemo = useMemo(() => locationList(directions?.routes, routeIndex, INTERVALS), [directions]);
    const [severity, setSeverity] = useState(0);

    useEffect(() => {
        getOverallSeverity(locationMemo).then((sev) => {
            setSeverity(sev);
        })
    }, [locationMemo])


    return (
      <div>
        <div>

        <GoogleMap
          mapContainerStyle={{width: '85%', height: '100vh', position: 'absolute'}}
          center={center}
          zoom={10}>
            <DirectionsService 
                options={{origin: startStr, destination: endStr, travelMode: google.maps.TravelMode.DRIVING, provideRouteAlternatives: true}}
                callback={(result, status) => {
                    if(status === "OK"){
                        setDirections(result);
                        console.log(locationMemo);
                    }

                }}
            />
            {directions && 
                <DirectionsRenderer options={{hideRouteList: false, routeIndex: routeIndex}} directions={directions}/>
            } 
                
        </GoogleMap>

        <div style={{position: 'absolute', right: 0, backgroundColor: 'white', height: '100%', padding: 10, width: '20%', borderTopLeftRadius: 25, borderBottomLeftRadius: 25}}>
            Routes
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 10}}>

            {directions && directions.routes.map((element: any, index: number) => {

                return(
                    <button style={{
                        padding: 10,
                        alignItems: 'center',
                        marginTop: 3,
                    }} title={`Route ${index}: Safety Percentage x`} onClick={() => setRouteIndex(index)}>
                    {`Route ${index}: Safety Percentage ${Math.trunc(100 - (Math.random() + 2) * index)}`}
                    </button>
                )
            })}

            {(directions === undefined || directions.length === 0) && 
            <div style={{marginTop: 10}}>
                Yikes! No results were found. Change your inputs and try again!
            </div>
                
                }
            </div>
        </div>
        </div>
      </div>
    )
}

export default Results;