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
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
        // googleMapsApiKey="AIzaSyD3RdbtJb3-pRyKmUPp76gHAYirb4JnoBk"
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