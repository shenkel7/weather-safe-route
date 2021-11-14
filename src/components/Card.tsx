import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Input from './Input'
import Grid from '@mui/material/Grid';
import Buttons from './Button'

export default function MediaCard() {
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
        <Input text="Start location"/>
        <div style={{marginTop: '-1.5em'}}/>
        <Input text="End location"/>
      </div>
      
      <CardActions>
        {/* <Buttons /> */}
        
      </CardActions>
    </Card>
  );
}