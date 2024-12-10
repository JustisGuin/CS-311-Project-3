import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GenerateRecipeForm from '@/app/comp/client/generateRecipeForm'; // Adjust the path as needed
import '@testing-library/jest-dom';

describe('GenerateRecipeForm', () => {
  const mockAction = jest.fn();
  const mockOnNext = jest.fn();

  beforeEach(() => {
    render(<GenerateRecipeForm action={mockAction} onNext={mockOnNext} />);
  });

  test('should display an error when step count input is invalid', () => {
    const stepInput = screen.getByLabelText('Number of steps:');
    fireEvent.change(stepInput, { target: { value: '' } });

    expect(screen.getByText('Please enter the number of steps you want.')).toBeInTheDocument();
  });

  test('should call action with FormData on valid form submission', async () => {
    const stepInput = screen.getByLabelText('Number of steps:');
    fireEvent.change(stepInput, { target: { value: '3' } });

    const submitButton = screen.getByText('Generate!');
    fireEvent.click(submitButton);

    expect(mockAction).toHaveBeenCalledTimes(1);
    expect(mockAction).toHaveBeenCalledWith(expect.any(FormData));
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  test('should not call onNext if action fails', async () => {
    mockAction.mockImplementationOnce(() => Promise.reject(new Error('Failed action')));

    const stepInput = screen.getByLabelText('Number of steps:');
    fireEvent.change(stepInput, { target: { value: '3' } });

    const submitButton = screen.getByText('Generate!');
    fireEvent.click(submitButton);

    expect(mockOnNext).not.toHaveBeenCalled();
  });
});
