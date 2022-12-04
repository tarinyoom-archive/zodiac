import { LoadingButton } from "@mui/lab";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import "./Horoscope.css";
import {
  findZodiacSign,
  setHoroscope,
} from "./Controller";
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function Horoscope() {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // name and date
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [userBirthDay, setUserBirthDay] = useState<number | null>(null);
  const [userBirthMonth, setUserBirthMonth] = useState<number | null>(null);

  useEffect(() => {
    if (!name || name.length == 0 || !date || date.toString() === "Invalid Date") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [name, date]);

  return (
    <>
      <div>
        <div className=".flex-row">
          <TextField
            id="username"
            label="Your Name"
            style={{paddingRight: '10px'}}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Your Birth Date"
              value={date}
              onChange={(newValue: Dayjs | null) => {
                setUserBirthDay(newValue ? newValue.date() : null);
                setUserBirthMonth(newValue ? newValue.month() : null);
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <LoadingButton
          loading={loading}
          id="mainButton"
          disabled={buttonDisabled || loaded}
          variant="contained"
          style={{margin:'40px'}}
          onClick={async () => {
            if (userBirthDay != null && userBirthMonth != null) {
              const sign = findZodiacSign(userBirthDay, userBirthMonth);
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 15000);
              setHoroscope(sign, "horoscopeHeader", "horoscopeText").then(
                () => {
                  setLoading(false);
                  setLoaded(true);
                }
            );}
          }}
        >
          Consult zo:diac
        </LoadingButton>
      </div>
      <div id="results" hidden={!loaded}>
        <h4 id="horoscopeHeader">Sign here</h4>
        <p id="horoscopeText">Horoscope here</p>
      </div>
    </>
  );
}

export default Horoscope;
