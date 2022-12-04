import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { getHoroscopeAddition } from "./Controller";

function Interaction(props : {"show": boolean, "head": string, "body": string}) {

	const [proceded, setProceded] = useState<boolean>(false);
	const [topic, setTopic] = useState<string | null>(null);
	const [validTopic, setValidTopic] = useState<boolean>(false);

	useEffect(() => {
		if (topic && topic.length > 0) {
		  setValidTopic(true);
		} else {
		  setValidTopic(false);
		}
	  }, [topic]);

  return (
	<>
		<div id="results" hidden={false}>
				<h4 id="horoscopeHeader" className="Response">{props.head}</h4>
				<p id="horoscopeText" className="Response">{props.body}</p>
		</div>
		<LoadingButton
		  variant="contained"
          id="continueButton"
		  disabled={proceded}
          style={{margin:'20px'}}
		  onClick={() => {
			setProceded(true);
		  }}
        >
          Continue Exploring
        </LoadingButton>
		<div hidden={!proceded}>
			<h4>What topic would you like to explore? (e.g., romance, career, etc.)</h4>
			<div className="flex-row">
				<TextField
				id="username"
				label="Topic"
				autoComplete="off"
				style={{paddingRight: '10px'}}
				onChange={(e) => {
					setTopic(e.target.value);
				}}
				/>

			</div>
			<LoadingButton
			id="mainButton"
			disabled={!validTopic}
			variant="contained"
			style={{margin:'20px'}}
			onClick={async () => {
				if (validTopic && topic) {
					const nextResponse = await getHoroscopeAddition(props.body, topic);
					console.log(nextResponse);
				}
				/*
				if (userBirthDay != null && userBirthMonth != null) {
				  const sign = findZodiacSign(userBirthDay, userBirthMonth);
				  setLoading(true);
				  setSubHeader(getHoroscopeHeader(name, sign));
				  getHoroscope(sign).then((horoscope: string) => {
					setSubBody(horoscope);
					setLoading(false);
					setLoaded(true);
				  }*/
			}}
			>
			Consult zo:diac
			</LoadingButton>

		</div>
	</>
  );
}

export default Interaction;
