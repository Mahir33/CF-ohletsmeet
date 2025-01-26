import React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import { getEvents, extractLocations } from './../api';

describe("<CitySearch /> component", () => {

    let CitySearchDOM;
    let cityTextBox;
    beforeEach(() => {
        CitySearchDOM = render(<CitySearch />);
        cityTextBox = CitySearchDOM.queryByRole('textbox');
    });

    test("render text input", () => {
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestion list is hidden by default', () => {
        const suggestions = CitySearchDOM.queryByRole('list');
        expect(suggestions).not.toBeInTheDocument();
    })

    test("render list of suggestions with city textbox gains focus", async () => {
        const user = userEvent.setup();
        await user.click(cityTextBox);
        const suggestions = CitySearchDOM.queryByRole('list');
        expect(suggestions).toBeInTheDocument();
        expect(suggestions).toHaveClass('suggestions');
    });

    test('updates list of suggestions correctly when user types in city textbox', async () => {
      const user = userEvent.setup();
      const allEvents = await getEvents();
      const allLocations = extractLocations(allEvents);
      CitySearchDOM.rerender(<CitySearch allLocations={allLocations} />);
  
  
      // user types "Berlin" in city textbox
      const cityTextBox = CitySearchDOM.queryByRole('textbox');
      await user.type(cityTextBox, "Berlin");
  
  
      // filter allLocations to locations matching "Berlin"
      const suggestions = allLocations? allLocations.filter((location) => {
        return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
      }): [];
  
  
      // get all <li> elements inside the suggestion list
      const suggestionListItems = CitySearchDOM.queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(suggestions.length + 1);
      for (let i = 0; i < suggestions.length; i += 1) {
        expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
      }
    });

    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
      const user = userEvent.setup();
      const allEvents = await getEvents(); 
      const allLocations = extractLocations(allEvents);
      CitySearchDOM.rerender(<CitySearch allLocations={allLocations} />);
  
  
      const cityTextBox = CitySearchDOM.queryByRole('textbox');
      await user.type(cityTextBox, "Berlin");
  
  
      // the suggestion's textContent look like this: "Berlin, Germany"
      const BerlinGermanySuggestion = CitySearchDOM.queryAllByRole('listitem')[0];
  
  
      await user.click(BerlinGermanySuggestion);
  
  
      expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
});