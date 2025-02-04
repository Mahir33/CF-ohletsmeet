import React from 'react';
import { render, screen } from '@testing-library/react';
import TriangleLoader from '../components/TriangleLoader';

describe('TriangleLoader component', () => {
    test('renders TriangleLoader component', () => {
        render(<TriangleLoader />);
        const loaderElement = screen.getByLabelText('triangle-loading');
        expect(loaderElement).toBeInTheDocument();
    });
});
