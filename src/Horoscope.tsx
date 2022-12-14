import { LoadingButton } from "@mui/lab";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./Horoscope.css";
import {
  findZodiacSign,
  getHoroscope,
  getHoroscopeAddition,
  getHoroscopeHeader,
} from "./Controller";
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function Horoscope() {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [mainButtonDisabled, setMainButtonDisabled] = useState(true);
  const [showContinue, setShowContinue] = useState(false);
  const [showAltPrompt, setShowAltPrompt] = useState(false);

  // name and date
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [userBirthDay, setUserBirthDay] = useState<number | null>(null);
  const [userBirthMonth, setUserBirthMonth] = useState<number | null>(null);
  
  const [topic, setTopic] = useState<string>("");

  const [initialized, setInitialized] = useState<boolean>(false);
  const [prelude, setPrelude] = useState<string>("");
  const [horoscope, setHoroscope] = useState<string>("");

  const today = new Date().toLocaleDateString('en-us', {year:"numeric", day:"numeric", month:"short"}) // "Jul 2021 Friday";
  const [subtitle, setSubtitle] = useState<string>(`The date is ${today}. To consult zo:diac about today, provide your name and birth date.`);

  useEffect(() => {
    if (!initialized) {
      if (!name || name.length === 0 || !date || date.toString() === "Invalid Date" || showContinue) {
        setMainButtonDisabled(true);
      } else {
        setMainButtonDisabled(false);
      }  
    } else {
      if (topic.length === 0 || showContinue) {
        setMainButtonDisabled(true);
      } else {
        setMainButtonDisabled(false);
      }
    }
  }, [name, date, topic, initialized, showContinue]);


  return (
    <>
    	<NavLink to="/about">What is zo:diac?</NavLink>

      <div>
        <h4 id="subtitle" style={{textAlign:"center", paddingBottom:"20px"}}>{subtitle}</h4>
        <div className=".flex-row" hidden={!showAltPrompt}>
        <TextField
            id="topic"
            label="Topic"
            style={{paddingRight: '10px'}}
            autoComplete="off"
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          />
        </div>
        <div className=".flex-row" hidden={showAltPrompt}>
        <TextField
            id="username"
            label="Your Name"
            style={{paddingLeft: '10px', paddingRight: '10px'}}
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
          disabled={mainButtonDisabled}
          variant="contained"
          style={{marginTop:'20px'}}
          onClick={async () => {
            if (initialized && userBirthDay != null && userBirthMonth != null) {
              setLoading(true);
              const sign = findZodiacSign(userBirthDay, userBirthMonth);
              getHoroscopeAddition(horoscope, topic, sign).then((horoscope: string) => {
                setPrelude(`Regarding ${topic}, your horoscope is as follows:`);
                setHoroscope(horoscope);
                setLoading(false);
                setMainButtonDisabled(true);
                setShowContinue(true);
              })
            } else {
              if (userBirthDay != null && userBirthMonth != null) {
                setLoading(true);
                const sign = findZodiacSign(userBirthDay, userBirthMonth);
                const prelude = getHoroscopeHeader(name, sign);
                getHoroscope(sign).then((horoscope: string) => {
                  setPrelude(prelude);
                  setHoroscope(horoscope);
                  setLoading(false);
                  setLoaded(true);
                  setInitialized(true);
                  setMainButtonDisabled(true);
                  setShowContinue(true);
                })  
              }
            }
        }}
        >
          Consult zo:diac
        </LoadingButton>
      </div>
      <div id="results" hidden={!loaded}>
        <h4 id="horoscopeHeader" className="Response">{prelude}</h4>
				<p id="horoscopeText" className="Response">{horoscope}</p>
        <div hidden={!showContinue}>
        <LoadingButton
          variant="contained"
          id="continueButton"
          style={{margin:'20px'}}
          onClick={() => {
            setShowAltPrompt(true);
            setShowContinue(false);
            setMainButtonDisabled(false);
            setSubtitle("What topic would you like to explore? (romance, career, etc.)");
          }}
            > Continue Exploring
        </LoadingButton>
        </div>
      </div>
    </>
  );
}

export default Horoscope;
