import React, { useEffect, useState } from 'react';
// Components:
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import Loader from './components/Loader';
// API:
import { extractLocations, getEvents } from './api';
// CSS:
import './App.css';

function App() {

  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [allLocations, setAllLocations ] = useState(null);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [loading, setLoading] = useState(true);



  
  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
     allEvents :
     allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, numberOfEvents))
    setAllLocations(extractLocations(allEvents))
  }

  const showHideLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    fetchData();
    showHideLoading();
  }, [numberOfEvents, currentCity]);

  return (
    <div className="App">
      {loading && (
        <div className="loading-screen">
          <Loader />
        </div>
      )}
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity}/>
      <NumberOfEvents numberOfEvents={numberOfEvents} setNumberOfEvents={setNumberOfEvents}/>
      <EventList events={events}/>
    </div>
  );
}


export default App;