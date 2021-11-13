import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

const Home = () => {
    return (
        <LoadScript
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY as string}
        >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}>
          <></>
        </GoogleMap>
      </LoadScript>
    )
}

export default Home;