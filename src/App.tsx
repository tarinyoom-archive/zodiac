import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Horoscope from './Horoscope';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from './About';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#dac9f4",
      contrastText: '#121212',
    }
  }
});



const router = createBrowserRouter([
  {
    path: "/",
    element: <Horoscope/>,
  },
  {
    path: "/about",
    element: <About/>
  }
]);

function App() {
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <h1>zo:diac</h1>
        </header>
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
