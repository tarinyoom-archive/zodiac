import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { FormControl, TextField } from "@mui/material";
import './Horoscope.css';
import { isValidSign, setHoroscope, showDiv } from './Controller';

function MyComponent() {

  const [loading, setLoading] = useState(false);
  const [userSign, setUserSign] = useState("");

  return (
    <>
      <div style={{paddingTop: "30px", paddingBottom: "30px"}}>
        <FormControl style={{margin: "auto", color: "white"}}>
        <TextField
            color="secondary"
            helperText="Enter your name"
            id="username"
            label="Name"
          />
        <TextField
            color="secondary"
            helperText="Enter your sign: Aries, Taurus, Gemini, etc."
            id="sign"
            label="Sign"
            onChange={(e: object) => {
              setUserSign((e as any).target.value);
            }}
          />
        </FormControl>
      </div>
      <LoadingButton
        loading={loading}
        id="mainButton"
        variant="contained"
        onClick={async () => {
          if (isValidSign(userSign)) {
            setLoading(true);
            setHoroscope(userSign, "horoscopeHeader", "horoscopeText").then(() => {
              setLoading(false);
              showDiv("results")
            });  
          }
        }}
      >
        Consult 
      </LoadingButton>
      <div id="results" style={{display:"none"}}>
        <h4 id="horoscopeHeader">Sign here</h4>
        <p id="horoscopeText">Horoscope here</p>
      </div>
    </>
  );
}

export default MyComponent;
