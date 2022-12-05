import './About.css';

function About() {
  
  return (
      <div className="App">
		<a href="/">Back to zo:diac</a>
		<h4>What is zo:diac?</h4>
		<p>zo:diac is a horoscope reader powered by a neural network provided by <a href="https://cohere.ai/">co:here</a>.</p>
		<h4>What's a neural network?</h4>
		<p>A neural network is an artificial intelligence program that learns in this case by reading text.
			It's fed data from public sources, and learns the information within. Learn more about co:here's datasets <a href="https://docs.cohere.ai/docs/data-statement">here</a>.</p>
		<h4>Does it actually know my horoscope?</h4>
		<p>The neural network can draw astrology information from any source it reads from, including the <a href="https://lib.msu.edu/gds/">Google Books Dataset</a> and <a href="https://tumblr.com">Tumblr</a>, both of which contain significant amounts of astrology content.
			Neural networks are excellent at picking up and identifying trends, so it can sense patterns in astrology that even the best human astrologers might not be able to pick up on.</p>
		<footer>
            Developed by Adam Reynolds and Aditya Tuladhar.
        </footer>
      </div>
  );
}

export default About;
