import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddIngredientsForm from '@/app/comp/client/addIngredient'; // Adjust the import path as necessary
import '@testing-library/jest-dom'; // Import jest-dom for additional matchers
import { jest } from '@jest/globals'; // Optional, as jest is globally available

// Define the type for the action prop
type ActionType = (data: FormData) => Promise<void>;

describe('AddIngredientsForm', () => {
  const mockAction: jest.Mock<ActionType> = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    render(<AddIngredientsForm action={mockAction} onBack={mockOnBack} />);
  });

  test('should reveal the form when "Add an ingredient!" button is clicked', () => {
    const button = screen.getByText('Add an ingredient!');
    fireEvent.click(button);
    
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  test('should call action with FormData on form submission', async () => {
    const button = screen.getByText('Add an ingredient!');
    fireEvent.click(button);

    const nameInput = screen.getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: 'Tomato' } });

    const submitButton = screen.getByText('Add');
    fireEvent.click(submitButton);

    expect(mockAction).toHaveBeenCalledTimes(1);
    expect(mockAction).toHaveBeenCalledWith(expect.any(FormData));
  });

  test('should call onBack when back button is clicked', () => {
    const button = screen.getByText('Add an ingredient!');
    fireEvent.click(button);

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});