import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let setNumberOfEvents, setErrorAlert;

  beforeEach(() => {
    setNumberOfEvents = jest.fn();
    setErrorAlert = jest.fn();
  });

  test('renders input field with correct initial value', () => {
    render(<NumberOfEvents numberOfEvents={32} setNumberOfEvents={setNumberOfEvents} setErrorAlert={setErrorAlert} />);
    const inputElement = screen.getByTestId('number-of-events-input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(32);
  });

  test('calls setNumberOfEvents and setErrorAlert with correct values when input is valid', () => {
    render(<NumberOfEvents numberOfEvents={32} setNumberOfEvents={setNumberOfEvents} setErrorAlert={setErrorAlert} />);
    const inputElement = screen.getByTestId('number-of-events-input');
    fireEvent.change(inputElement, { target: { value: '10' } });
    expect(setNumberOfEvents).toHaveBeenCalledWith(10);
    expect(setErrorAlert).toHaveBeenCalledWith('');
  });

  test('shows error message and calls setErrorAlert when input is invalid', () => {
    render(<NumberOfEvents numberOfEvents={32} setNumberOfEvents={setNumberOfEvents} setErrorAlert={setErrorAlert} />);
    const inputElement = screen.getByTestId('number-of-events-input');
    fireEvent.change(inputElement, { target: { value: '0' } });
    expect(screen.getByText('Select number from 1 to 32')).toBeInTheDocument();
    expect(setErrorAlert).toHaveBeenCalledWith('Select number from 1 to 32');
    expect(setNumberOfEvents).not.toHaveBeenCalled();
  });

  test('clears error message when input becomes valid', () => {
    render(<NumberOfEvents numberOfEvents={32} setNumberOfEvents={setNumberOfEvents} setErrorAlert={setErrorAlert} />);
    const inputElement = screen.getByTestId('number-of-events-input');
    fireEvent.change(inputElement, { target: { value: '0' } });
    expect(screen.getByText('Select number from 1 to 32')).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: '10' } });
    expect(screen.queryByText('Select number from 1 to 32')).not.toBeInTheDocument();
    expect(setNumberOfEvents).toHaveBeenCalledWith(10);
    expect(setErrorAlert).toHaveBeenCalledWith('');
  });
});