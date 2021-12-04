import { render, screen, fireEvent } from '@testing-library/react';
import BookNow from '../Hotel/BookNow';
import React from 'react';
import { act } from 'react-dom/test-utils';

describe('Book Now', () => {
  describe('with invalid date input for select future date', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getAllByLabelText, findByText } = render(
        <BookNow />
      );
      const button = getByLabelText('gotoCheckout');
      const startDate = getAllByLabelText('Nov 9, 2021');
      const futureDate = getAllByLabelText('Nov 11, 2021');

      await act(async () => {
        fireEvent.click(startDate[0]);
      });
      await act(async () => {
        fireEvent.click(futureDate[1]);
      });
      await act(async () => {
        fireEvent.click(button);
      });
      await findByText('Select a future as start date');
    });
  });

  describe('with invalid date input', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getAllByLabelText, findByText } = render(
        <BookNow />
      );
      const button = getByLabelText('gotoCheckout');
      const startDate = getAllByLabelText('Nov 11, 2021');
      const futureDate = getAllByLabelText('Nov 11, 2021');

      await act(async () => {
        fireEvent.click(startDate[0]);
      });
      await act(async () => {
        fireEvent.click(futureDate[1]);
      });
      await act(async () => {
        fireEvent.click(button);
      });
      await findByText(
        'Select a date where end date is greater than start date'
      );
    });
  });
});
