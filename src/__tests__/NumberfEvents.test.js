import React from 'react';
import { render, screen } from '@testing-library/react';
import  userEvent  from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';
describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsDOM;
    beforeEach(() => {
        NumberOfEventsDOM = render(
            <NumberOfEvents 
                numberOfEvents={32} 
                setNumberOfEvents={() => {}}
        />
        );
    });
    

    test('component contains an element with the role of the textbox', () => {
        const numberOfEvents = NumberOfEventsDOM.queryByRole('textbox');
        expect(numberOfEvents).toBeInTheDocument();
    });

    test('o ensure that the default value of the input field is 32.', () => {
        const numberOfEvents = NumberOfEventsDOM.queryByRole('textbox');
        expect(numberOfEvents.value).toBe('32');
    });

    test('the value of the NumberOfEvents component’s textbox changes accordingly when a user types in it within App', async () => {
        render(<App />);
        const numberOfEvents = screen.queryAllByTestId('number-of-events-input');
        const element = numberOfEvents[1];
        expect(element.value).toBe('32');

        const user = userEvent.setup();
        await user.type(element, '{backspace}{backspace}10');
        expect(element.value).toBe('10');
    });
    
});