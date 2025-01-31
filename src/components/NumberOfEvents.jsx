import React, { useState } from "react";

const NumberOfEvents = ({ numberOfEvents, setNumberOfEvents }) => {

    return (
        <div id="number-of-events">
            <label htmlFor="number-of-events">Number of Events:</label>
            <input
                aria-label="Number of Events"
                className="number-of-events-input"
                type="number"
                data-testid="number-of-events-input"
                id="number-of-events"
                value={numberOfEvents}
                role="textbox"
                onChange={(e) => setNumberOfEvents(e.target.value)}
            />
        </div>
    );
}

export default NumberOfEvents;