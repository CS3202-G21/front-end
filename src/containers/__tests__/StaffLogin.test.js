import { render, screen, fireEvent } from '@testing-library/react';
import StaffLogin from '../Staff/StaffLogin';
import React from 'react';
import { act } from 'react-dom/test-utils';

describe('Staff Login', () => {
  describe('with valid username input', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getByRole } = render(<StaffLogin />);

      await act(async () => {
        fireEvent.change(getByLabelText('Username *'), {
          target: { value: 'test123' },
        });
      });
      await act(async () => {
        fireEvent.click(getByRole('button'));
      });
    });
  });
  describe('with invalid StaffLogin input', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getByRole, findByText } = render(<StaffLogin />);

      await act(async () => {
        fireEvent.change(getByLabelText('Username *'), {
          target: { value: '' },
        });
      });
      await act(async () => {
        fireEvent.click(getByRole('button'));
      });
      await findByText('username is a required field');
    });
  });
});
