import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from '../src/components/WeatherCard';

test('renders weather card with correct data', () => {
  const { getByText } = render(
    <WeatherCard city="Delhi" temperature={32} condition="Sunny" icon="01d" />
  );

  expect(getByText('Delhi')).toBeTruthy();
  expect(getByText('32°C')).toBeTruthy();
  expect(getByText('Sunny')).toBeTruthy();
});
