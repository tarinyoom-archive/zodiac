import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { TextField } from "@mui/material";
import "./Horoscope.css";
import {
  isValidSign,
  findZodiacSign,
  setHoroscope,
  showDiv,
} from "./Controller";

function MyComponent() {
  const [loading, setLoading] = useState(false);
  const [userSign, setUserSign] = useState("");
  const [userBirthDate, setuserBirthDate] = useState<Date|null>(null);
  //const [userBirthMonth, setuserBirthMonth] = useState(-1);
  //const [userBirthDay, setuserBirthDay] = useState(-1);

  return (
    <>
      <div className=".flex-row">
        <TextField
          color="secondary"
          //helperText="Enter your name"
          id="username"
          label="Name"
        />
        <TextField
          id="date"
          label="Date & Time of Birth"
          type="date"
          defaultValue=""
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e:any) => {
            //console.log(new Date(e.target.value));
            //setuserBirthMonth(new Date (e.target.value as Date).getMonth());
            //setuserBirthDay(new Date (e.target.value as Date).getDay());
            //setuserBirthDate(new Date(e.target.value));
            //console.log(new Date(e.target.value));
            console.log(e.target.value);
          }}
          
        />
      </div>
      <LoadingButton
        loading={loading}
        id="mainButton"
        variant="contained"
        
        onClick={async () => {
          if (userBirthDate) {
            setUserSign(findZodiacSign(userBirthDate));
          setLoading(true);
          setHoroscope(userSign, "horoscopeHeader", "horoscopeText").then(
            () => {
              setLoading(false);
              showDiv("results");
            }
          );}
        }}
      >
        Consult
      </LoadingButton>
      <div id="results" style={{ display: "none" }}>
        <h4 id="horoscopeHeader">Sign here</h4>
        <p id="horoscopeText">Horoscope here</p>
      </div>
    </>
  );
}

export default MyComponent;
