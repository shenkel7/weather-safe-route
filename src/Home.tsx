import React from 'react'
import MediaCard from './components/Card'

  const center = {
    lat: 32.9858,
    lng: -96.7501
  };


const Home = () => {
    return (
      <div style={{backgroundImage: `url(./im/m.jpeg)`}}>   
      <MediaCard />
      </div>
    )
}

export default Home;