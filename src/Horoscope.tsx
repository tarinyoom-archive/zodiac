import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { TextField } from "@mui/material";
import "./Horoscope.css";
import {
  findZodiacSign,
  setHoroscope,
  showDiv,
} from "./Controller";
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function MyComponent() {
  const [loading, setLoading] = useState(false);
  const [date] = useState<Dayjs | null>(null);
  const [userBirthDay, setUserBirthDay] = useState<number | null>(null);
  const [userBirthMonth, setUserBirthMonth] = useState<number | null>(null);

  return (
    <>
      <div className=".flex-row">
        <TextField
          color="secondary"
          //helperText="Enter your name"
          id="username"
          label="Name"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Basic example"
            value={date}
            onChange={(newValue) => {
              setUserBirthDay(newValue ? newValue.date() : null);
              setUserBirthMonth(newValue ? newValue.month() : null);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <LoadingButton
        loading={loading}
        id="mainButton"
        variant="contained"
        
        onClick={async () => {
          if (userBirthDay != null && userBirthMonth != null) {
            const sign = findZodiacSign(userBirthDay, userBirthMonth);
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 5000);
            setHoroscope(sign, "horoscopeHeader", "horoscopeText").then(
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
