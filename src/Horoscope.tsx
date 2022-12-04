import { LoadingButton } from "@mui/lab";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import "./Horoscope.css";
import {
  findZodiacSign,
  getHoroscope,
  getHoroscopeHeader,
} from "./Controller";
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Interaction from "./Interaction";

function Horoscope() {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // name and date
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [userBirthDay, setUserBirthDay] = useState<number | null>(null);
  const [userBirthMonth, setUserBirthMonth] = useState<number | null>(null);

  const [subHeader, setSubHeader] = useState<string>("");
  const [subBody, setSubBody] = useState<string>("");

  useEffect(() => {
    if (!name || name.length === 0 || !date || date.toString() === "Invalid Date") {
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
            autoComplete="off"
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
          style={{marginTop:'20px'}}
          onClick={async () => {
            if (userBirthDay != null && userBirthMonth != null) {
              const sign = findZodiacSign(userBirthDay, userBirthMonth);
              setLoading(true);
              setSubHeader(getHoroscopeHeader(name, sign));
              getHoroscope(sign).then((horoscope: string) => {
                setSubBody(horoscope);
                setLoading(false);
                setLoaded(true);
              });
        }}}
        >
          Consult zo:diac
        </LoadingButton>
      </div>
      <div id="results" hidden={!loaded}>
        <Interaction show={loaded} head={subHeader} body={subBody}></Interaction>
      </div>
    </>
  );
}

export default Horoscope;
