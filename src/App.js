import React from 'react';
import './App.scss';
import SearchBar from './components/search/Searchbar';

function App({ moduleData }) {
  console.log(
    'all of your data typically accessed via the "module" keyword in HubL is available as JSON here!',
    moduleData,
  );
  return (
    <div className="cms-react-boilerplate__container">
      <SearchBar />
    </div>
  );
}

export default App;
