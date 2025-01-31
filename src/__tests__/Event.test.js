import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Event from "../components/Event";
// import mockData from "../mock-data";
import { getEvents } from "../api";

describe("<Event /> component", () => {
    let EventDOM;

    beforeEach(async () => {
        // {
        //     "kind": "calendar#event",
        //     "etag": "\"3181161784712000\"",
        //     "id": "4eahs9ghkhrvkld72hogu9ph3e_20200519T140000Z",
        //     "status": "confirmed",
        //     "htmlLink": "https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MTlUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",
        //     "created": "2020-05-19T19:17:46.000Z",
        //     "updated": "2020-05-27T12:01:32.356Z",
        //     "summary": "Learn JavaScript",
        //     "description": "Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.",
        //     "location": "London, UK",
        //     "creator": {
        //      "email": "fullstackwebdev@careerfoundry.com",
        //      "self": true
        //     },
        //     "organizer": {
        //      "email": "fullstackwebdev@careerfoundry.com",
        //      "self": true
        //     },
        //     "start": {
        //      "dateTime": "2020-05-19T16:00:00+02:00",
        //      "timeZone": "Europe/Berlin"
        //     },
        //     "end": {
        //      "dateTime": "2020-05-19T17:00:00+02:00",
        //      "timeZone": "Europe/Berlin"
        //     },
        //     "recurringEventId": "4eahs9ghkhrvkld72hogu9ph3e",
        //     "originalStartTime": {
        //      "dateTime": "2020-05-19T16:00:00+02:00",
        //      "timeZone": "Europe/Berlin"
        //     },
        //     "iCalUID": "4eahs9ghkhrvkld72hogu9ph3e@google.com",
        //     "sequence": 0,
        //     "reminders": {
        //      "useDefault": true
        //     },
        //     "eventType": "default"
        //    }
        const getAllEvents = await getEvents();
        const singleEvent = getAllEvents[0];
        EventDOM = render(<Event event={singleEvent} />);
    });

    test('render event location', () => {
        const locationElement = screen.getByText("London, UK");
        expect(locationElement).toBeInTheDocument();
    });

    test('render event summary', () => {
        const summaryElement = screen.getByText("Learn JavaScript");
        expect(summaryElement).toBeInTheDocument();
    });

    test('render show details button', () => {
        const buttonElement = screen.getByText("Show Details");
        expect(buttonElement).toBeInTheDocument();
    });

    test('hide event description by default', () => {
        expect(EventDOM.queryByText(location)).toBeNull();
    });

    test("show event details button is present", async () => {
        expect(EventDOM.queryByText("Show Details")).toBeInTheDocument();
    });

    test('shows event details when "Show Details" button is clicked', async () => {
        const user = userEvent.setup();
        const buttonElement = EventDOM.getByText("Show Details");
        await user.click(buttonElement);

        const descriptionElement = EventDOM.queryByTestId("event-description");
        expect(descriptionElement).toBeInTheDocument();
        expect(buttonElement.textContent).toBe("Hide Details");
    });
    
    test('hides event details when "Hide Details" button is clicked', async () => {
    
        const user = userEvent.setup();
        const buttonElement = EventDOM.getByText("Show Details");
        await user.click(buttonElement); // Show details
        await user.click(buttonElement); // Hide details
        
    
        const descriptionElement = EventDOM.queryByTestId("event-description");
        expect(descriptionElement).not.toBeInTheDocument();
        expect(buttonElement.textContent).toBe("Show Details");
    });

});