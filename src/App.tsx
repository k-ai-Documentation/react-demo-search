import React, { useState } from 'react';
import './App.css';
import SearchBox from './component/SearchBox';
import SearchChat from './component/SearchChat';
import KaiLogo from 'kai-assets/logo.svg';

function App() {
  const [showSearchBox, setShowSearchBox] = useState(true); 

  return (
    <div className="App">
      <div className="content">
        <div className="logo">
          <img src={KaiLogo} alt="Kai Logo" />
        </div>

        <div className="btn-group">
          <button
            className="btn-icon"
            onClick={() => setShowSearchBox(true)} 
          >
            Search
          </button>
          <button
            className="btn-icon"
            onClick={() => setShowSearchBox(false)} 
          >
            Search with identify documents
          </button>
        </div>

        {showSearchBox ? <SearchBox /> : <SearchChat />}
      </div>
    </div>
  );
}

export default App;
