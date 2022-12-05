import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#dac9f4",
      contrastText: '#121212',
    }
  }
});

function About() {
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <h1>zo:diac</h1>
        </header>
        
      </div>
    </ThemeProvider>

  );
}

export default About;
