import './About.css';
import { NavLink } from 'react-router-dom';

function About() {
  
  return (
      <div className="App">
		<NavLink to="/">Back to zo:diac</NavLink>
		<h4>What is zo:diac?</h4>
		<p>zo:diac is a horoscope reader powered by a neural network provided by <a href="https://cohere.ai/">co:here</a>. It creates a unique horoscope for you based on your information and your topics of interest.</p>
		<h4>Does it actually know my horoscope?</h4>
		<p>This neural network learns in the same ways humans do-- by reading! It draws astrology information from publicly available blogs and books,
			and can pick up patterns and form opinions based on what it's seen.
		</p>
		<footer>
            Developed by Adam Reynolds and Aditya Tuladhar.
        </footer>
      </div>
  );
}

export default About;
