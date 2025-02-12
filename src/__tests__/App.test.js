import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
    let AppDOM;
    beforeEach(() => {
        AppDOM = render(<App />);
    });

    test('renders list of events', () => {
        const eventList = AppDOM.container.querySelector('#event-list');
        expect(eventList).toBeInTheDocument();
    });

    test('renders CitySearch', () => {
        const citySearch = AppDOM.container.querySelector('#city-search');
        expect(citySearch).toBeInTheDocument();
    });

    test('renders NumberOfEvents', () => {
        const numberOfEvents = AppDOM.container.querySelector('#number-of-events');
        expect(numberOfEvents).toBeInTheDocument();
    });

    test('renders a loader', () => {
        const loader = AppDOM.container.querySelector('.loader');
        expect(loader).toBeInTheDocument();
    });

    test('handles state changes correctly', async () => {
        // Simulate an event that triggers setEvents
        const citySearchInput = screen.getByPlaceholderText('Search for a city');
        fireEvent.change(citySearchInput, { target: { value: 'Berlin' } });
        fireEvent.keyDown(citySearchInput, { key: 'Enter', code: 'Enter' });

        await waitFor(() => {
            const eventListItems = AppDOM.container.querySelectorAll('#event-list li');
            expect(eventListItems.length).toBeGreaterThan(0);
        });

        // Simulate an event that triggers setNumberOfEvents
        const numberOfEventsInput = screen.getByLabelText('Number of Events');
        fireEvent.change(numberOfEventsInput, { target: { value: 10 } });

        await waitFor(() => {
            const eventListItems = AppDOM.container.querySelectorAll('#event-list li');
            expect(eventListItems.length).toBe(10);
        });
    });
});

describe('<App /> integration', () => {
    test('renders a list of events matching the city selected by the user', async () => {
        const { container } = render(<App />);
        const citySearchInput = screen.getByPlaceholderText('Search for a city');
        fireEvent.change(citySearchInput, { target: { value: 'Berlin' } });
        fireEvent.keyDown(citySearchInput, { key: 'Enter', code: 'Enter' });

        await waitFor(() => {
            const eventListItems = container.querySelectorAll('#event-list li');
            expect(eventListItems.length).toBeGreaterThan(0);
        });
    });
});