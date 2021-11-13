import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import MediaCard from './components/Card'
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };


const Home = () => {
    return (
      <div>
        <div>
          <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
        <GoogleMap
          mapContainerStyle={{width: '100%', height: '100vh', position: 'absolute'}}
          center={center}
          zoom={10}>
          <></>
        </GoogleMap>
      </LoadScript>
        </div>
        
      <MediaCard />
      </div>
    )
}

export default Home;