import React, { useState } from 'react';

const NumberOfEvents = ({ numberOfEvents, setNumberOfEvents, setErrorAlert }) => {
    const [error, setError] = useState('');

    const handleInputChanged = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value < 1 || value > 32) {
            setError('Select number from 1 to 32');
            setErrorAlert('Select number from 1 to 32');
        } else {
            setError('');
            setErrorAlert('');
            setNumberOfEvents(value);
        }
    };

    return (
        <div id="number-of-events">
            <label className='noe-label' htmlFor="number-of-events-input">Number of Events</label>
            <input
                type="number"
                className="number-of-events"
                id="number-of-events-input"
                value={numberOfEvents || ''}
                onChange={handleInputChanged}
                data-testid="number-of-events-input"
            />
            {error && <div className="error-alert">{error}</div>}
        </div>
    );
};

export default NumberOfEvents;