import React from 'react';
import './App.scss';
import Search from './components/search/Search';
import { LocationContextProvider } from './services/location/location.context';

function App({ moduleData }) {
  console.log(
    'all of your data typically accessed via the "module" keyword in HubL is available as JSON here!',
    moduleData,
  );
  return (
    <div className="cms-react-boilerplate__container">
      <LocationContextProvider>
        <Search />
      </LocationContextProvider>
    </div>
  );
}

export default App;
