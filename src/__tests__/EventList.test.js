import React from "react";
import { render } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from '../api';

describe("<EventList /> component", () => {

    let EventListDOM;
    let allEvents;
    beforeEach( async () => {
        allEvents = await getEvents();
        EventListDOM = render(<EventList />)
    });

    test("render list of events", () => {
        expect(EventListDOM.queryByRole('list')).toBeInTheDocument();
    });

    test('renders correct number of events', async () => {
        const allEvents = await getEvents(); 
        EventListDOM.rerender(<EventList events={allEvents} />);
        expect(EventListDOM.getAllByRole("listitem")).toHaveLength(allEvents.length);
    });

    test('renders empty list when no events are provided', () => {
        expect(EventListDOM.queryByRole('listitem')).toBeNull();
    });

    test('renders 2 events correctly', async () => {
        const multipleEvents = [allEvents[0], allEvents[1]];
        EventListDOM.rerender(<EventList events={multipleEvents} />);
        expect(EventListDOM.getAllByRole("listitem")).toHaveLength(2);
        expect(EventListDOM.getByText("Learn JavaScript")).toBeInTheDocument();
        expect(EventListDOM.getByText("React is Fun")).toBeInTheDocument();
    })

    test('renders 32 events correctly', async () => {
        const multipleEvents = allEvents.slice(0, 32);
        EventListDOM.rerender(<EventList events={multipleEvents} />);
        expect(EventListDOM.getAllByRole("listitem")).toHaveLength(32);
    });
});