import { render, screen, fireEvent } from '@testing-library/react';
import RoomCard from '../RoomCard';
import React from 'react';
import { act } from 'react-dom/test-utils';

describe('Room Card Render', () => {
  describe('Room card with prop', () => {
    it('render room card', async () => {
      const { getByLabelText, getAllByLabelText, findByText } = render(
        <RoomCard
          key={1}
          id={7}
          roomInfo={{
            photo_main:
              'http://178.128.121.215:8000/media/photos/roomTypes/luxury_double.webp',
            title: 'Luxury Double',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus sodales diam ac dictum. Etiam facilisis feugiat mi eget feugiat. Nam vitae tortor nulla. Maecenas vel ultricies risus. Phasellus aliquam bibendum dolor at gravida. Integer in eros euismod, tristique diam accumsan, scelerisque nibh. Quisque venenatis tristique suscipit.',
            price: '50000.00',
            number_of_adults: 2,
            number_of_beds: 1,
          }}
          room_number={103}
          status={'vacant'}
          floor={1}
        />
      );
    });
  });
});
