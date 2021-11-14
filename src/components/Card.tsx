import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { setEndLocation, setStartLocation,setEndLat, setEndLng, setStartLat, setStartLng } from "../app/locationSlice";
import { useDispatch } from "react-redux";
import { ChangeEvent } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "./Input.css";
import { Link } from "react-router-dom";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string);


export default function MediaCard() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue
  } = usePlacesAutocomplete();
  

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSelectStart = (val: string): void => {
    setValue(val, false);
    setStartingLocation(val);
  };

  const handleSelectEnd = (val: string): void => {
    setValue(val, false);
    setEndingLocation(val);
  };

  const renderSuggestions = (): JSX.Element => {
    const suggestions = data.map(({ place_id, description }: any) => (
      <ComboboxOption key={place_id} value={description} />
    ));
    return (
      <>
        {suggestions}
        <li className="logo">
          <img
            src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
            alt="Powered by Google"
          />
        </li>
      </>
    );
  };
  const [startLocation, setStartingLocation] = useState("");
  const [endLocation, setEndingLocation] = useState("");
  const dispatch = useDispatch();

  const changeStartLocation = (startLocation: any) => {
    Geocode.fromAddress(startLocation).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        dispatch(setStartLocation(`${lat},${lng}`));
        dispatch(setStartLat(lat));
        dispatch(setStartLng(lng));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  const changeEndLocation = (endLocation: any) => {
    Geocode.fromAddress(endLocation).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        dispatch(setEndLocation(`${lat},${lng}`));
        dispatch(setEndLat(lat));
        dispatch(setEndLng(lng));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  const handleClick = (e: any) => {
    Geocode.fromAddress(startLocation).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        changeStartLocation(startLocation);
        console.log(lat, lng);
        console.log("start location: " + startLocation);
      },
      (error) => {
        console.error(error);
      }
    );

    Geocode.fromAddress(endLocation).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        changeEndLocation(endLocation);
        console.log("end location: " + endLocation);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  return (
    <Card sx={{ maxWidth: 465, height: '484px', position: 'absolute', borderRadius: '10%', left: "50%",
    top: "45%",
    transform: "translate(-50%, -50%)" }}>
      <CardContent>
        <Typography style={{ textAlign: "center", marginTop: "1em" }} gutterBottom variant="h2" component="div">
          Safe Travel
        </Typography>
        <Typography variant="body1" color="text.secondary">
        Enter your start and end location to get the safest route!
        </Typography>
      </CardContent>
      
      <div style={{marginTop: '-2.5em'}}>
      <div style={{margin: '0 auto'}}>

{/* start input */}
      <Combobox onSelect={handleSelectStart} aria-labelledby="demo">
        <ComboboxInput
          className="input-field"
          placeholder="Start location"
          value={startLocation}
          onChange={(location: any)=>{
            setStartingLocation(location.target.value);
            handleInput(location);
          }}
          disabled={!ready}
        />
        <ComboboxPopover>
          <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
        </ComboboxPopover>
      </Combobox>

    </div>
        <div style={{marginTop: '-1.5em'}}/>
        <div style={{margin: '0 auto'}}>

{/* end input */}
      <Combobox onSelect={handleSelectEnd} aria-labelledby="demo">
        <ComboboxInput
          className="input-field"
          placeholder="End location"
          value={endLocation}
          onChange={(location: any)=>{
            setEndingLocation(location.target.value);
            handleInput(location);
          }}
          disabled={!ready}
        />
        <ComboboxPopover>
          <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
        </ComboboxPopover>
      </Combobox>

    </div>
      </div>
      
      <CardActions>

        <div style={{display: 'flex', justifyContent: 'center'}}>
        <Link to="/results">
          <button style={{
            backgroundColor: '#0B1B55', 
            color: 'white', 
            width: '80px', 
            height: '30px', 
            alignSelf: 'center',
            marginLeft: 'auto',
          }}
            onClick={handleClick}>GO</button>
        </Link>
        
        </div>
      </CardActions>
    </Card>
  );
}