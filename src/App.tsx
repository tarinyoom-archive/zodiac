import './App.css';
import Horoscope from './Horoscope';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>zo:diac</h1>
        <h4>Let an AI help guide your day.</h4>
      </header>
      <Horoscope/>
      <footer style={{color: "gray", position: "fixed", bottom: 0}}>
          Developed by Adam Reynolds and Aditya Tuladhar. Powered by <a href="https://cohere.ai/">co:here</a>.
      </footer>
    </div>
  );
}

export default App;
