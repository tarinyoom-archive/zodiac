import getCompletion from './generateService';
import * as React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";

function MyComponent() {
  const [text, setText] = useState(" ");

  return (
    <>
      <Button
        variant="contained"
        onClick={async () => {
          setText(await getCompletion("I really need to"));
        }}
      >
        Click me to complete the phrase below.
      </Button>
      <p id="phrase">"I really need to... {text}"</p>
      <p> </p>
    </>
  );
}

export default MyComponent;
