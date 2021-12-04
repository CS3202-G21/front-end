import { render, screen, fireEvent } from '@testing-library/react';
import RatingCard from '../RatingCard';
import React from 'react';
import { act } from 'react-dom/test-utils';

describe('Room Card Render', () => {
  describe('Room card with prop', () => {
    it('render room card', async () => {
      const { getByLabelText, getAllByLabelText, findByText } = render(
        <RatingCard
          key={1}
          customer={105}
          room_id={100}
          customer_review="lorem ipusm sadghadd asdhoadhs asd asdhosdhsd"
        />
      );
    });
  });
});
