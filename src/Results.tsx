import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

  const center = {
    lat: 32.9858,
    lng: -96.7501
  };

const Results = () => {
    return (
      <div>
        <div>
          <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
        >
        <GoogleMap
          mapContainerStyle={{width: '100%', height: '100vh', position: 'absolute'}}
          center={center}
          zoom={10}>
          <></>
        </GoogleMap>
      </LoadScript>
        </div>
      </div>
    )
}

export default Results;