// Jest globals for linting
/* global test, expect, jest */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../Dashboard.jsx';
import SpiceRack from '../SpiceRack.jsx';

/* ===========================================================
   Test 1: Recipe Search Functionality (SpiceRack)
   Purpose: Ensure searching updates recipe grid
   =========================================================== */
test('SpiceRack: searching updates recipe grid', async () => {
  // Arrange
  render(
    <SpiceRack
      onGoToDashboard={() => {}}
      onGoToRegister={() => {}}
      handleLogout={() => {}}
    />
  );

  // Act
  const input = screen.getByPlaceholderText(/search recipes/i);
  fireEvent.change(input, { target: { value: 'Lasagna' } });

  const button = screen.getByRole('button', { name: /search/i });
  fireEvent.click(button);

  // Assert
  // Example (requires axios mocking):
  // expect(screen.getByText(/lasagna/i)).toBeInTheDocument();
});

/* ===========================================================
   Test 2: Navigation Buttons (Dashboard)
   Purpose: Ensure dashboard routes trigger correct callbacks
   =========================================================== */
test('Dashboard: navigation buttons route correctly', () => {
  // Arrange
  const mockDashboard = jest.fn();
  const mockRegister = jest.fn();
  const mockLogout = jest.fn();

  render(
    <Dashboard
      handleLogout={mockLogout}
      onGoToToDo={() => {}}
      onGoToDashboard={mockDashboard}
      onGoToWeather={() => {}}
      onGoToRegister={mockRegister}
      onGoToLogin={() => {}}
      onGoToContactForm={() => {}}
      onGoToSpiceRack={() => {}}
    />
  );

  // Act + Assert
  fireEvent.click(screen.getByText(/dashboard/i));
  expect(mockDashboard).toHaveBeenCalled();

  fireEvent.click(screen.getByText(/login/i));
  expect(mockRegister).toHaveBeenCalled();

  fireEvent.click(screen.getByText(/logout/i));
  expect(mockLogout).toHaveBeenCalled();
});

/* ===========================================================
   Test 3: Favorite Button Toggle (SpiceRack)
   Purpose: Ensure favorite button toggles correctly
   =========================================================== */
test('SpiceRack: favorite button toggles', () => {
  // Arrange
  render(
    <SpiceRack
      onGoToDashboard={() => {}}
      onGoToRegister={() => {}}
      handleLogout={() => {}}
    />
  );

  // Act
  // const favButton = screen.getByLabelText(/favorite/i);
  // fireEvent.click(favButton);

  // Assert
  // expect(favButton).toHaveClass('active');
});

/* ===========================================================
   Test 4: Contact Modal (Dashboard)
   Purpose: Verify contact modal opens correctly
   =========================================================== */
test('Dashboard: contact modal opens', () => {
  // Arrange
  const mockOpenContact = jest.fn();

  render(
    <Dashboard
      handleLogout={() => {}}
      onGoToToDo={() => {}}
      onGoToDashboard={() => {}}
      onGoToWeather={() => {}}
      onGoToRegister={() => {}}
      onGoToLogin={() => {}}
      onGoToContactForm={mockOpenContact}
      onGoToSpiceRack={() => {}}
    />
  );

  // Act
  // fireEvent.click(screen.getByText(/contact/i));

  // Assert
  // expect(mockOpenContact).toHaveBeenCalled();
  // expect(screen.getByRole('dialog')).toBeInTheDocument();
});

/* ===========================================================
   Test 5: Sort by Rating (SpiceRack)
   Purpose: Ensure sorting logic behaves correctly
   =========================================================== */
test('SpiceRack: sort by rating works', () => {
  // Arrange
  render(
    <SpiceRack
      onGoToDashboard={() => {}}
      onGoToRegister={() => {}}
      handleLogout={() => {}}
    />
  );

  // Act
  // const sortDropdown = screen.getByLabelText(/sort/i);
  // fireEvent.change(sortDropdown, { target: { value: 'rating' } });

  // Assert
  // expect(...).toBeSortedByRating();
});
// Setup — mock axios

// You need this at the top of the file:


// Jest globals for linting
/* global test, expect, jest */

import React from 'react';
import {render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../Dashboard.jsx';
import SpiceRack from '../SpiceRack.jsx';
import axios from 'axios';

jest.mock('axios');

/* ======================================================================
   Mock Recipe Data
   ====================================================================== */
const mockRecipes = [
  { id: 1, title: 'Lasagna', rating: 4 },
  { id: 2, title: 'Apple Pie', rating: 5 },
  { id: 3, title: 'Burger', rating: 3 }
];

/* ======================================================================
   Test 1: Recipe Search Functionality
   ====================================================================== */
test('SpiceRack: searching updates recipe grid', async () => {
  // Arrange
  axios.get.mockResolvedValueOnce({ data: mockRecipes });

  render(
    <SpiceRack
      onGoToDashboard={() => {}}
      onGoToRegister={() => {}}
      handleLogout={() => {}}
    />
  );

  // Act
  const input = screen.getByPlaceholderText(/search recipes/i);
  fireEvent.change(input, { target: { value: 'Lasagna' } });

  const button = screen.getByRole('button', { name: /search/i });
  fireEvent.click(button);

  // Assert
  await waitFor(() => {
    expect(screen.getByText(/lasagna/i)).toBeInTheDocument();
  });
});

/* ======================================================================
   Test 2: Navigation Buttons (Dashboard)
   ====================================================================== */
test('Dashboard: navigation buttons route correctly', () => {
  // Arrange
  const mockDashboard = jest.fn();
  const mockLogin = jest.fn();
  const mockLogout = jest.fn();

  render(
    <Dashboard
      handleLogout={mockLogout}
      onGoToToDo={() => {}}
      onGoToDashboard={mockDashboard}
      onGoToWeather={() => {}}
      onGoToRegister={() => {}}
      onGoToLogin={mockLogin}
      onGoToContactForm={() => {}}
      onGoToSpiceRack={() => {}}
    />
  );

  // Act + Assert
  fireEvent.click(screen.getByText(/dashboard/i));
  expect(mockDashboard).toHaveBeenCalled();

  fireEvent.click(screen.getByText(/login/i));
  expect(mockLogin).toHaveBeenCalled();

  fireEvent.click(screen.getByText(/logout/i));
  expect(mockLogout).toHaveBeenCalled();
});

/* ======================================================================
   Test 3: Favorite Button Toggle
   ====================================================================== */
test('SpiceRack: favorite button toggles', async () => {
  // Arrange
  axios.get.mockResolvedValueOnce({ data: mockRecipes });

  render(
    <SpiceRack
      onGoToDashboard={() => {}}
      onGoToRegister={() => {}}
      handleLogout={() => {}}
    />
  );

  // Wait for recipes to load
  const lasagna = await screen.findByText(/lasagna/i);

  // Act
  const favButton = lasagna.closest('[data-testid="recipe-card"]')
                           .querySelector('[data-testid="favorite-btn"]');

  fireEvent.click(favButton);

  // Assert
  expect(favButton).toHaveClass('active');
});

/* ======================================================================
   Test 4: Contact Modal Opens
   ====================================================================== */
test('Dashboard: contact modal opens', () => {
  // Arrange
  const mockOpenContact = jest.fn();

  render(
    <Dashboard
      handleLogout={() => {}}
      onGoToToDo={() => {}}
      onGoToDashboard={() => {}}
      onGoToWeather={() => {}}
      onGoToRegister={() => {}}
      onGoToLogin={() => {}}
      onGoToContactForm={mockOpenContact}
      onGoToSpiceRack={() => {}}
    />
  );

  // Act
  fireEvent.click(screen.getByText(/contact/i));

  // Assert
  expect(mockOpenContact).toHaveBeenCalled();
});

/* ======================================================================
   Test 5: Sort by Rating
   ====================================================================== */
test('SpiceRack: sort by rating works', async () => {
  // Arrange
  axios.get.mockResolvedValueOnce({ data: mockRecipes });

  render(
    <SpiceRack
      onGoToDashboard={() => {}}
      onGoToRegister={() => {}}
      handleLogout={() => {}}
    />
  );

  // Act
  const dropdown = await screen.findByLabelText(/sort/i);
  fireEvent.change(dropdown, { target: { value: 'rating' } });

  // Assert sorted order: highest → lowest
  await waitFor(() => {
    const renderedTitles = screen.getAllByTestId('recipe-title').map(el => el.textContent);
    expect(renderedTitles).toEqual(['Apple Pie', 'Lasagna', 'Burger']);
  });
});
