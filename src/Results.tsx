import React, {useEffect, useState, useRef, useMemo} from 'react'
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker, InfoWindow } from '@react-google-maps/api';
import debounce from 'lodash/debounce';
import { RootStateOrAny, useSelector } from 'react-redux';
import { getOverallSeverity } from './Weather';
import rain from './assets/rain.gif'
import cloudy from './assets/cloudy.gif'
import sunny from './assets/sunny.gif'
import { borderRadius } from '@mui/system';


  const center = {
    lat: 32.9858,
    lng: -96.7501
  };

  const divStyle = {
    background: `#d6c4af`,
    padding: 10,
    // border: `1px solid #ccc`,
  }
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
        const steps = locationArr[routeIndex].legs[0].steps;
        const intervalLength = Math.floor(steps.length / intervals);
        const endObj = {
            lat: steps[steps.length - 1].start_location.lat(),
            long: steps[steps.length - 1].start_location.lng(),
        }
        output.push(endObj);
        // console.log(locationArr);
        
        for(let i = 0; i < locationArr.length; i += intervalLength){
            const steps = locationArr[routeIndex].legs[0].steps;
            const tempObj = {
                lat: steps[i].end_location.lat(),
                long: steps[i].end_location.lng()
            }
            output.push(tempObj);
        }
    }

    return output;
}

const Results = () => {
    const [directions, setDirections] = useState<any>(undefined);
    const [routeIndex, setRouteIndex] = useState(0);
    const INTERVALS = 3;

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

            {locationMemo.map((el, idx) => {   
                const max = 3;
                const min = 0;
                const rando = Math.trunc(Math.random() * (max - min) + min);

                switch(rando){
                    case 0: 
                        return (<InfoWindow
                        position={{lat: el.lat, lng: el.long}}
                        >
                        <div style={divStyle}>
                            <h3>Rain</h3>
                            <img style={{height: 100}} src={rain} alt="loading..." />
                        </div>
                        </InfoWindow>)
                    case 1: 
                        return (<InfoWindow
                        position={{lat: el.lat, lng: el.long}}
                        >
                        <div style={divStyle}>
                            <h3>Cloudy</h3>
                            <img style={{height: 100}} src={cloudy} alt="loading..." />
                        </div>
                        </InfoWindow>)
                    case 2: 
                        return (<InfoWindow
                        position={{lat: el.lat, lng: el.long}}
                        >
                        <div style={divStyle}>
                            <h3>Sunny</h3>
                            <img style={{height: 100}} src={sunny} alt="loading..." />
                        </div>
                        </InfoWindow>)
                }
             })}

                
        </GoogleMap>

        <div style={{position: 'absolute', right: 0, backgroundColor: '#d6c4af', height: '100%', padding: 10, width: '20%', borderTopLeftRadius: 10, borderBottomLeftRadius: 25}}>
            Routes
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 10}}>

            {directions && directions.routes.map((element: any, index: number) => {

                return(
                    <button style={{
                        padding: 10,
                        alignItems: 'center',
                        marginTop: 10,
                        width: '100%',
                        borderWidth: 0,
                        backgroundColor: '#b3926d',
                        borderRadius: 5,
                    }} title={`Route ${index}: Safety Percentage x`} onClick={() => setRouteIndex(index)}>
                    {`Route ${index}:`} 
                    <br/>
                    {`Safety Percentage ${Math.trunc(100 - (Math.random() + 2) * index)}`}
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