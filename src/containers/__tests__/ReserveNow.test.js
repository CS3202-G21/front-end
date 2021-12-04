import { render, screen, fireEvent } from '@testing-library/react';
import ReserveNow from '../Restaurant/ReserveNow';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { RootStore } from '../../stores/RootStore';

describe('Reserve Now', () => {
  describe('with invalid username input', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getByRole, findByText } = render(<ReserveNow />);
      const button = getByLabelText('gotoCheckout');
      await act(async () => {
        fireEvent.click(button);
      });
      await findByText('You must specify a number greater than 0');
    });
  });
  describe('with invalid date input for select future date', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getAllByLabelText, getByRole } = render(
        <ReserveNow />
      );
      const button = getByLabelText('gotoCheckout');
      const startDate = getByLabelText('Nov 9, 2021');

      await act(async () => {
        fireEvent.click(startDate);
      });
      await act(async () => {
        fireEvent.click(button);
      });
    });
  });
});
