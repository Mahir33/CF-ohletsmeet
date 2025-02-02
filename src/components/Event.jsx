import React, {useState} from "react";

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);
    const { summary, location, description, created } = event;

       
    return (
        <li key={event.id} role="listitem" className="event">
        <h2 id="summary">{summary}</h2>
        <p id="when-created">{new Date(created).toUTCString()}</p>
        <p id="event-location">{location}</p>
        <button id="show-hide-btn" className="details-btn" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Hide Details" : "Show Details"}
        </button>
        {showDetails && 
        <p id="event-description" className="details" data-testid="event-description">{description}</p>}
        </li>
    );
}

export default Event;