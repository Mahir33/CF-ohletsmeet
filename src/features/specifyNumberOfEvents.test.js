import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import NumberOfEvents from '../components/NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('User does not type in the number-of-events field', ({ given, when, then }) => {
        let AppComponent;
        given('I am a user', () => {
            AppComponent = render(<App />);
        });

        when('I do not type in the number-of-events field', () => {
            // No action needed
        });

        then('the default number of events should be shown', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32); // Zakładając, że domyślna liczba wydarzeń to 32
            });
        });
    });

    test('User types in the number-of-events field', ({ given, when, then }) => {
        let AppComponent;
        given('I am a user', () => {
            AppComponent = render(<App />);
        });

        when('I type a number on number-of-events field', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const numberOfEventsInput = within(AppDOM).getByLabelText('Number of Events');
            fireEvent.change(numberOfEventsInput, { target: { value: 3 } });
        });

        then('I should be able to see a list of events with the number I typed as the length', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(3);
            });
        });
    });
});