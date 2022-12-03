import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { FormControl,TextField, Select, MenuItem } from "@mui/material";
import './Horoscope.css';
import { setHoroscope, showDiv } from './Controller';

function MyComponent() {

  const [loading, setLoading] = useState(false);

  return (
    <>
      <div style={{paddingTop: "30px", paddingBottom: "30px"}}>
        <FormControl style={{margin: "auto", color: "white"}}>
        <TextField
            helperText="Enter your name"
            id="username"
            label="Name"
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={3}
            label="Age"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <LoadingButton
        loading={loading}
        id="mainButton"
        variant="contained"
        onClick={async () => {
          setLoading(true);
          setHoroscope("aries", "signDescriptionText", "horoscopeText").then(() => {
            setLoading(false);
            showDiv("results")
          });
        }}
      >
        Consult the AI 
      </LoadingButton>
      <div id="results" style={{display:"none"}}>
        <h4>Your Sign</h4>
        <p id="signDescriptionText">Text here</p>
        <h4>Your Current Horoscope</h4>
        <p id="horoscopeText">Text here</p>
      </div>
    </>
  );
}

export default MyComponent;
