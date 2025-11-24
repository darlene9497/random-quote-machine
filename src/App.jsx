import { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const colors = ['#16a34a', '#dc2626', '#2563eb', '#d97706', '#7c3aed', '#db2777'];

  const [quote, setQuote] = useState({ content: '', author: '' });
  const [color, setColor] = useState(colors[0]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch a random quote from DummyJSON API
  const fetchQuote = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('https://dummyjson.com/quotes/random');
      const data = await res.json();
      
      // change color first
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setColor(randomColor);
      
      // set the quote
      setQuote({
        content: data.quote,
        author: data.author
      });
    } catch (err) {
      console.error('Error fetching quote:', err);
      setQuote({
        content: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // fetch initial quote on mount
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className='main-container' style={{ backgroundColor: color }}>
      <div className="quote-box">
        <div className="quote-box__icon-text">
          <svg className="quote-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24" style={{ color: color }}>
            <path fillRule="evenodd" d="M6 6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3H5a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2H6Zm9 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3Z" clipRule="evenodd"/>
          </svg>
          <span style={{ color: color }}>
            {isLoading ? 'Loading...' : quote.content}
          </span>
        </div>
        <div className="quote-box__author" style={{ color: color }}>
          - {quote.author || 'Unknown'}
        </div>
        <div className="quote-box__footer">
          <div className="quote-box__footer--links">
            <a 
              href={`https://twitter.com/intent/tweet?text="${encodeURIComponent(quote.content)}" - ${encodeURIComponent(quote.author)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ backgroundColor: color }}
            >
              <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24" fill="currentColor" aria-hidden="true">
                <path d="M523.4 215.7C523.7 220.2 523.7 224.8 523.7 229.3C523.7 368 418.1 527.9 225.1 527.9C165.6 527.9 110.4 510.7 64 480.8C72.4 481.8 80.6 482.1 89.3 482.1C138.4 482.1 183.5 465.5 219.6 437.3C173.5 436.3 134.8 406.1 121.5 364.5C128 365.5 134.5 366.1 141.3 366.1C150.7 366.1 160.1 364.8 168.9 362.5C120.8 352.8 84.8 310.5 84.8 259.5L84.8 258.2C98.8 266 115 270.9 132.2 271.5C103.9 252.7 85.4 220.5 85.4 184.1C85.4 164.6 90.6 146.7 99.7 131.1C151.4 194.8 229 236.4 316.1 240.9C314.5 233.1 313.5 225 313.5 216.9C313.5 159.1 360.3 112 418.4 112C448.6 112 475.9 124.7 495.1 145.1C518.8 140.6 541.6 131.8 561.7 119.8C553.9 144.2 537.3 164.6 515.6 177.6C536.7 175.3 557.2 169.5 576 161.4C561.7 182.2 543.8 200.7 523.4 215.7z"/>
              </svg>
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?quote="${encodeURIComponent(quote.content)}" - ${encodeURIComponent(quote.author)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ backgroundColor: color }}
            >
              <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24" fill="currentColor" aria-hidden="true">
                <path d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z"/>
              </svg>
            </a>
          </div>
          <div className="quote-box__footer-btn">
            <button 
              onClick={fetchQuote} 
              disabled={isLoading}
              style={{ backgroundColor: color }}
            >
              {isLoading ? 'Loading...' : 'New quote'}
            </button>
          </div>
        </div>
      </div>
      <div className="credits">
        <p>Made with ♥ by <a href="https://www.linkedin.com/in/darlene-n">Darlene</a></p>
      </div>
    </div>
  );
}

export default App;