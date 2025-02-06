import React from 'react';
import { render, screen } from '@testing-library/react';
import { InfoAlert, ErrorAlert, WarningAlert } from '../components/Alert';

describe('Alert components', () => {
  test('renders InfoAlert with correct styles and text', () => {
    render(<InfoAlert text="Info message" />);
    const alertElement = screen.getByText(/Info message/i);
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveStyle({
      color: 'rgb(0, 0, 255)',
      backgroundColor: 'rgb(220, 220, 255)',
      borderWidth: '2px',
      borderStyle: 'solid',
      fontWeight: 'bolder',
      borderRadius: '7px',
      borderColor: 'rgb(0, 0, 255)',
      textAlign: 'center',
      fontSize: '12px',
      margin: '10px 0',
      padding: '10px'
    });
  });

  test('renders ErrorAlert with correct styles and text', () => {
    render(<ErrorAlert text="Error message" />);
    const alertElement = screen.getByText(/Error message/i);
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveStyle({
      color: 'rgb(255, 0, 0)',
      backgroundColor: 'rgb(255, 127, 127)',
      borderWidth: '2px',
      borderStyle: 'solid',
      fontWeight: 'bolder',
      borderRadius: '7px',
      borderColor: 'rgb(255, 0, 0)',
      textAlign: 'center',
      fontSize: '12px',
      margin: '10px 0',
      padding: '10px'
    });
  });

  test('renders WarningAlert with correct styles and text', () => {
    render(<WarningAlert text="Warning message" />);
    const alertElement = screen.getByText(/Warning message/i);
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveStyle({
      color: 'rgb(255, 0, 0)',
      backgroundColor: 'rgb(255, 127, 127)',
      borderWidth: '2px',
      borderStyle: 'solid',
      fontWeight: 'bolder',
      borderRadius: '7px',
      borderColor: 'rgb(255, 0, 0)',
      textAlign: 'center',
      fontSize: '12px',
      margin: '10px 0',
      padding: '10px'
    });
  });
});