import React from 'react';
import { render } from '@testing-library/react-native';
import RiskIndicator from '../src/components/RiskIndicator';

describe('RiskIndicator', () => {
  it('renders label', () => {
    const { getByText } = render(<RiskIndicator risk="moderate" />);
    expect(getByText('Moderate')).toBeTruthy();
  });
});
