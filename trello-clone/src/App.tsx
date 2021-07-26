// import React from 'react'; // Don't need to import React anymore. That's cool.
// import logo from './logo.svg';
import { ReactComponent as Logo } from './logo.svg';  // Using react-scripts to import an SVG as a component.
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Logo title="Some Title" className="App-logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React, again!
        </a>
      </header>
    </div>
  );
}

export default App;
