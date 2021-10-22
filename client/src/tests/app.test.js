import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//import Login from '../components/SignUp/Login';
import LandingPage from '../views/LandingPage';

const server = setupServer(
  rest.post('http://localhost:3001/uber-eats/api/LangingPage', (req, res, ctx) => res(ctx.json([{ EmailId: 'user1@gmail.com' }]))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Customer Login Tests', () => {
  it('Should allow users to enter email id and and password on the screen', async () => {
    render(<LandingPage />);
    const email = screen.getByTestId('email').querySelector('input');
    const password = screen.getByTestId('password').querySelector('input');
    fireEvent.change(email, { target: { value: 'user1@gmail.com' } });
    fireEvent.change(password, { target: { value: 'user1' } });

    expect(email.value).toBe('user1@gmail.com');
    expect(password.value).toBe('user1');
  });

  it('Should render Login component', () => {
    render(<LandingPage />);
    const customerLoginText = screen.getByText(/Welcome Back/i);
    expect(customerLoginText).toBeInTheDocument();
  });
});