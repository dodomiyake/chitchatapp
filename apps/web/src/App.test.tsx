import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('web shells', () => {
  it('renders the authentication shell by default', () => {
    render(
      <MemoryRouter initialEntries={['/auth']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'ChitChat' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeDisabled();
  });

  it('renders the desktop three-panel shell', () => {
    render(
      <MemoryRouter initialEntries={['/desktop']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('navigation', { name: 'Desktop primary' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Alex' })).toBeInTheDocument();
  });
});
