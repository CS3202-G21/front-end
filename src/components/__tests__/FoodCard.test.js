import { render, screen, fireEvent } from '@testing-library/react';
import FoodCard from '../FoodCard';
import React from 'react';
import { act } from 'react-dom/test-utils';

describe('Room Card Render', () => {
  describe('Room card with prop', () => {
    it('render room card', async () => {
      const { getByLabelText, getAllByLabelText, findByText } = render(
        <FoodCard
          key={1}
          id={2}
          photo="http://178.128.121.215:8000/media/photos/menu_items/main/coke.png"
          title="Coke"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, arcu et eleifend luctus, diam ligula gravida nisi, vitae faucibus dolor tellus sed tellus. Duis neque tortor, malesuada et interdum in, efficitur id ipsum. Nunc porta porta urna eget lacinia. Maecenas ac nisi vel metus mattis sodales ut consequat augue. Mauris rhoncus, mi quis lacinia eleifend, ipsum libero auctor nisl, eu venenatis metus eros a justo. Integer quis mauris ac elit feugiat posuere. Mauris cursus nunc sed diam eleifend feugiat. Maecenas porta dictum tellus et facilisis. Phasellus erat dui, condimentum at mi id, molestie posuere elit."
          availability={true}
          price="100.00"
        />
      );
    });
  });
});
