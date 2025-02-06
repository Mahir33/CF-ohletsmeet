import React, { useEffect, useState } from 'react';
// Components:
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import Loader from './components/Loader';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
// API:
import { extractLocations, getEvents } from './api';
// CSS:
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [allLocations, setAllLocations] = useState(null);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [loading, setLoading] = useState(true);
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  const fetchData = async () => {
    try {
      const allEvents = await getEvents();
      const filteredEvents = currentCity === "See all cities" ?
        allEvents :
        allEvents.filter(event => event.location === currentCity);
      setEvents(filteredEvents.slice(0, numberOfEvents));
      setAllLocations(extractLocations(allEvents));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [numberOfEvents, currentCity]);

  return (
    <div className="App">
      {loading && (
        <div className="loading-screen">
          <Loader />
        </div>
      )}
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
      </div>
      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
        />
      <NumberOfEvents 
        numberOfEvents={numberOfEvents} 
        setNumberOfEvents={setNumberOfEvents}
        setErrorAlert={setErrorAlert}
        />
      <EventList events={events} />
    </div>
  );
}

export default App;