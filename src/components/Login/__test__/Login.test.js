import React from 'react';
import { render } from '@testing-library/react';
import Login from '../Login';

test('base div element rendered', () => {
    // need to improve test
    const { getByText } = render(<Login />);
    const linkElement = getByText(/Email/i);
});