import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Horoscope from './Horoscope';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#dac9f4",
      contrastText: '#121212',
    }
  }
});

function App() {
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <header style={{color: "gray", textAlign: "left"}}>
            Developed by Adam Reynolds and Aditya Tuladhar. Powered by <a href="https://cohere.ai/">co:here</a>. Problems or feedback? Send an email to <a href = "mailto: adam@tarinyoom.io">adam@tarinyoom.io</a>.
        </header>
        <header className="App-header">
          <h1>zo:diac</h1>
        </header>
        <Horoscope/>
        
      </div>
    </ThemeProvider>

  );
}

export default App;
