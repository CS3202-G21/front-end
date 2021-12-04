import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Register';
import React from 'react';
import { act } from 'react-dom/test-utils';

describe('Register', () => {
  describe('with valid username input', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getByRole, findByText } = render(<Register />);

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

  describe('with invalid username input', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getByRole, findByText } = render(<Register />);

      await act(async () => {
        fireEvent.change(getByLabelText('Username *'), {
          target: { value: 'test' },
        });
      });
      await act(async () => {
        fireEvent.click(getByRole('button'));
      });
      await findByText('username must be at least 6 characters');
    });
  });

  describe('with valid first name input', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getByRole, findByText } = render(<Register />);

      await act(async () => {
        fireEvent.change(getByLabelText('First Name *'), {
          target: { value: '' },
        });
      });
      await act(async () => {
        fireEvent.click(getByRole('button'));
      });
      await findByText('firstName is a required field');
    });
  });

  describe('with invalid last name input', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getByRole, findByText } = render(<Register />);

      await act(async () => {
        fireEvent.change(getByLabelText('Last Name *'), {
          target: { value: '' },
        });
      });
      await act(async () => {
        fireEvent.click(getByRole('button'));
      });
      await findByText('lastName is a required field');
    });
  });

  describe('without email input', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getByRole, findByText } = render(<Register />);

      await act(async () => {
        fireEvent.change(getByLabelText('Email Address *'), {
          target: { value: '' },
        });
      });

      await act(async () => {
        fireEvent.click(getByRole('button'));
      });
      await findByText('email is a required field');
    });
  });

  describe('with invalid email input', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getByRole, findByText } = render(<Register />);

      await act(async () => {
        fireEvent.change(getByLabelText('Email Address *'), {
          target: { value: 'test' },
        });
      });

      await act(async () => {
        fireEvent.click(getByRole('button'));
      });
      await findByText('email must be a valid email');
    });
  });
  describe('with invalid password input', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getByRole, findByText } = render(<Register />);

      await act(async () => {
        fireEvent.change(getByLabelText('Password *'), {
          target: { value: 'test' },
        });
      });

      await act(async () => {
        fireEvent.click(getByRole('button'));
      });
      await findByText('password must be at least 6 characters');
    });
  });
  describe('with invalid password and invalid confirm password input', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getByRole, findByText } = render(<Register />);

      await act(async () => {
        fireEvent.change(getByLabelText('Password *'), {
          target: { value: 'test' },
        });
      });
      await act(async () => {
        fireEvent.change(getByLabelText('Confirm Password *'), {
          target: { value: 'tes' },
        });
      });

      await act(async () => {
        fireEvent.click(getByRole('button'));
      });
      await findByText('password must be at least 6 characters');
      await findByText('Passwords must match');
    });
  });

  describe('with valid password and invalid confirm password input', () => {
    it('calls the onSubmit function', async () => {
      const { getByLabelText, getByRole, findByText } = render(<Register />);

      await act(async () => {
        fireEvent.change(getByLabelText('Password *'), {
          target: { value: 'test123' },
        });
      });
      await act(async () => {
        fireEvent.change(getByLabelText('Confirm Password *'), {
          target: { value: 'test124' },
        });
      });

      await act(async () => {
        fireEvent.click(getByRole('button'));
      });
      await findByText('Passwords must match');
    });
  });
});
