import { render, screen, fireEvent } from '@testing-library/react';
import HorizontalTile from '../HorizontalTile';
import React from 'react';
import { act } from 'react-dom/test-utils';

describe('Room Card Render', () => {
  describe('Room card with prop', () => {
    it('render room card', async () => {
      const { getByLabelText, getAllByLabelText, findByText } = render(
        <HorizontalTile
          key={1}
          data={{
            customer_id: 3,
            customer_review: 'Mock Review',
            checked_in: true,
            checked_out: false,
            payment_status: 'paid',
            id: 1,
            room_id: 5,
            start_date: '',
            end_date: '',
            total_price: '',
          }}
        />
      );
    });
  });
});
