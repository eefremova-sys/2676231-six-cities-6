import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavEmpty from './fav-empty';

const renderWithRouter = (component: JSX.Element) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('FavEmpty page', () => {
  it('should render empty favorites page', () => {
    renderWithRouter(<FavEmpty />);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });

  it('should render header with logo', () => {
    renderWithRouter(<FavEmpty />);

    expect(screen.getAllByAltText('6 cities logo').length).toBeGreaterThan(0);
  });
});
