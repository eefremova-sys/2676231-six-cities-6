import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Error from './error';

const renderWithRouter = (component: JSX.Element) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Error page', () => {
  it('should render error page with 404 message', () => {
    renderWithRouter(<Error />);

    expect(screen.getByText('404.')).toBeInTheDocument();
    expect(screen.getByText('Страница не найдена....')).toBeInTheDocument();
  });

  it('should render link to main page', () => {
    renderWithRouter(<Error />);

    const link = screen.getByText('Go to main page');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });
});
