"use client"; // Indicates that this component is a client component in a Next.js application

import { useState, ChangeEvent, FocusEvent, FormEvent } from "react"; // Import necessary hooks from React

// Interface defining the structure of input data for the form
export interface InputData {
  label: string; // Label for the input field
  name: string; // Name attribute for the input field
  placeholder: string; // Placeholder text for the input field
  validationFunction?: (value: string) => Promise<string>; // Optional async validation function
}

// Interface defining the props for the Input component
interface InputProps {
  label: string; // Label for the input field
  name: string; // Name attribute for the input field
  placeholder?: string; // Optional placeholder text for the input field
  validationFunction?: (value: string) => Promise<string>; // Optional async validation function
  onErrorStateUpdated?: (value: string) => void; // Function to update error state
}

// Main ValidatedForm component
export function ValidatedForm({
  inputs, // Array of input data
  action, // Function to call on form submission
}: {
  inputs: InputData[]; // Type for inputs prop
  action: () => Promise<void>; // Type for action prop
}) {
  // Handle form submission
  async function onSubmitted(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default form submission behavior
    // Handle form submission logic here
    await action(); // Call the action function
  }

  // Render the form with input fields
  return (
    <form onSubmit={onSubmitted}>
      {inputs.map((input) => (
        <Input
          key={input.name} // Unique key for each input
          label={input.label} // Label for the input field
          name={input.name} // Name attribute for the input field
          placeholder={input.placeholder} // Placeholder text for the input field
          validationFunction={input.validationFunction} // Validation function for the input
        />
      ))}
      <button type="submit">Submit</button> {/* Submit button for the form */}
    </form>
  );
}

// Main Input component
export function Input({
  label, // Label for the input field
  name, // Name attribute for the input field
  placeholder, // Placeholder text for the input field
  validationFunction = async (value: string) => "", // Default validation function that returns an empty string
  onErrorStateUpdated = (value: string) => {}, // Default function to update error state
}: InputProps) {
  const [message, setMessage] = useState<string>(""); // State to hold the error message

  // Handle input blur event (when the input loses focus)
  async function onInputDeselected(event: FocusEvent<HTMLInputElement>): Promise<void> {
    if (message) {
      return; // If there's already an error message, do nothing
    }
    const value: string = event.target.value; // Get the input value
    const response: string = await validationFunction(value); // Validate the input value
    setMessage(response); // Set the error message based on validation response
    onErrorStateUpdated(response); // Call the error state update function
  }

  // Handle input change event
  async function onInputChanged(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    if (!message) {
      return; // If there's no error message, do nothing
    }
    const value: string = event.target.value; // Get the input value
    const response: string = await validationFunction(value); // Validate the input value
    setMessage(response); // Set the error message based on validation response
    onErrorStateUpdated(response); // Call the error state update function
  }

  // Component to display error messages
  function ErrorMessage(): null | JSX.Element {
    if (!message) {
      return null; // Return null if there's no message
    }

    return (
      <span className="font-bold text-error">
        {message} {/* Render the error message */}
      </span>
    );
  }

  // Render the input field with label and error messages
  return (
    <label className="flex flex-col my-4 text-center">
      {label} {/* Display the label */}
      <input
        name={name} // Name attribute for the input field
        placeholder={placeholder} // Placeholder text for the input field
        onBlur={onInputDeselected} // Handle blur event
        onChange={onInputChanged} // Handle change event
        className="px-1 bg-darker_primary border-2 rounded-lg mx-auto mt-1" // Input styling
 />
      <ErrorMessage /> {/* Render any error messages */}
    </label>
  );
}