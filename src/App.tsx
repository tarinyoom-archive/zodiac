import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Horoscope from './Horoscope';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <h1>zo:diac</h1>
          <h4 id="subtitle" style={{paddingBottom:"20px"}}>Get insight into your day using a neural network. Get started by filling out the following.</h4>
        </header>
        <Horoscope/>
        <footer style={{color: "gray", position: "absolute", bottom: 0}}>
            Developed by Adam Reynolds and Aditya Tuladhar. Powered by <a href="https://cohere.ai/">co:here</a>.
        </footer>
      </div>
    </ThemeProvider>

  );
}

export default App;
