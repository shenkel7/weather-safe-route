import React from 'react'
import MediaCard from './components/Card'
import Geocode from "react-geocode";


Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string);

const Home = () => {
    return (
      <div>   
      <MediaCard />
      </div>
    )
}

export default Home;