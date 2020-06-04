import React from 'react';
import { render } from '@testing-library/react';
import Routes from '../routes/Routes';

test('basic example', () => {
  const { getByText } = render(<Routes/>);
  const linkElement = getByText("Email address");
  expect(linkElement).toBeInTheDocument();
});
