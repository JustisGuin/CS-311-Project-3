"use client"; // Indicates that this component is a client component in a Next.js application

import { useState, ChangeEvent, FocusEvent } from "react"; // Import necessary hooks from React

// Object to hold predefined validation functions
const validationStepFunctions: { [stepName: string]: (input: string) => string } = {
  "not-empty": function (input: string) {
    if (!input) {
      return "This field is required."; // Error message if the input is empty
    }
    return ""; // Return an empty string if validation passes
  },
};

// Interface defining the props for the Input component
interface InputProps {
  label: string; // Label for the input field
  name: string; // Name attribute for the input field
  placeholder?: string; // Optional placeholder text for the input field
  serverErrorMessage?: string; // Optional error message from the server
  validationSteps?: string[]; // Array of validation steps to apply
  validateInput?: (input: string) => string; // Optional custom validation function
  validationFunction?: (input: string) => string; // Optional additional validation function
  disabled?: boolean; // Optional flag to disable the input
  submitting?: boolean; // Optional flag to indicate if the form is submitting
}

// Main Input component
export default function Input({
  label,
  name,
  placeholder = "", // Default placeholder is an empty string
  serverErrorMessage = "", // Default server error message is an empty string
  validationSteps = [], // Default validation steps is an empty array
  validationFunction, // Optional additional validation function
  disabled = false, // Default disabled state is false
  submitting = false, // Default submitting state is false
}: InputProps) {
  const [errorMessage, setErrorMessage] = useState<string>(""); // State to hold the error message

  // Define the type for validation functions
  type ValidationFunction = (input: string) => string;

  // Create an array of validation functions based on the provided validation steps
  const validationFunctions: ValidationFunction[] = Object.keys(validationStepFunctions)
    .filter((key: string) => validationSteps.includes(key)) // Filter based on validation steps
    .map((key) => validationStepFunctions[key]); // Map to the corresponding validation functions

  // Function to run validation on the input value
  function runValidation(value: string) {
    let messageCreated = false; // Flag to track if an error message was created

    // Run predefined validation functions
    validationFunctions.forEach((validationFunction) => {
      const message = validationFunction(value); // Get the validation message
      if (message) {
        setErrorMessage(message); // Set the error message
        messageCreated = true; // Mark that a message was created
        return; // Exit the loop if a message is found
      }
    });

    // Run the custom validation function if provided
    if (validationFunction) {
      const customMessage = validationFunction(value); // Get the custom validation message
      if (customMessage) {
        setErrorMessage(customMessage); // Set the error message
        messageCreated = true; // Mark that a message was created
      }
    }

    // If no messages were created, clear the error message
    if (!messageCreated) {
      setErrorMessage(""); // Clear the error message
    }
  }

  // Handle input change event
  function onChanged(event: ChangeEvent<HTMLInputElement>) {
    runValidation(event.target.value); // Run validation on the new value
  }

  // Handle input focus event
  function onFocus(event: FocusEvent<HTMLInputElement>) {
    runValidation(event.target.value); // Run validation on the current value
  }

  // Component to display error messages
  function ErrorMessage({ message }: { message: string }): null | JSX.Element {
    if (!message) {
      return null; // Return null if there is no message
    }

    return <p className="font-bold text-error">{message}</p>; // Render the error message
  }

  // Render the input field with label and error messages
  return (
    <label className="flex flex-col my-4 text-center">
      {label} // Display the label
      <input
        name={name} // Name attribute for the input field
        placeholder={placeholder} // Placeholder text for the input field
        onFocus={onFocus} // Handle focus event
        onChange={onChanged} // Handle change event
        disabled={disabled || submitting} // Disable input if submitting or explicitly disabled
        className="px-1 bg-darker_primary border-2 rounded-lg mx-auto mt-1" // Input styling
      />
      <ErrorMessage message={ errorMessage} /> // Display the error message if any
      <ErrorMessage message={serverErrorMessage} /> // Display server error message if provided
    </label>
  );
}