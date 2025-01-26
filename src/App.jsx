import React, { useState } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import mockData from './mock-data';

function App() {

  const [numberOfEvents, setNumberOfEvents] = useState(32);

  return (
    <div className="App">
      <NumberOfEvents numberOfEvents={numberOfEvents} setNumberOfEvents={setNumberOfEvents}/>
      <CitySearch />
      <EventList events={mockData}/>
    </div>
  );
}


export default App;