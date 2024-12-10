"use client"; // Indicates that this component is a client component in a Next.js application
import { useState } from "react";
import Input from "@/app/comp/client/input"; // Custom input component

// Interface defining the structure of input data for the form
export interface InputData {
  label: string; // Label for the input field
  name: string; // Name attribute for the input field
  placeholder: string; // Placeholder text for the input field
  validationFunction?: (value: string) => string; // Optional validation function for the input
}

// Main Form component
export function Form({
  inputs, // Array of input data
  action, // Function to call on form submission
  submitText = "Submit", // Text for the submit button, default is "Submit"
}: {
  inputs: InputData[]; // Type for inputs prop
  action: (data: FormData) => Promise<void>; // Type for action prop
  submitText?: string; // Optional text for the submit button
}) {
  const [submitting, setSubmitting] = useState<boolean>(false); // State to track if the form is currently submitting

  // Handle form submission
  function onFormSubmitted(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default form submission behavior
    setSubmitting(true); // Set submitting state to true

    const formData = new FormData(event.currentTarget); // Create FormData from the form
    action(formData).finally(() => {
      setSubmitting(false); // Reset submitting state after action completes
    });
  }

  // Render the form
  return (
    <form onSubmit={onFormSubmitted}>
      {inputs.map((input, index) => (
        <Input
          key={index} // Unique key for each input element
          label={input.label} // Label for the input field
          name={input.name} // Name attribute for the input field
          placeholder={input.placeholder} // Placeholder text for the input field
          validationFunction={input.validationFunction} // Optional validation function for the input
          submitting={submitting} // Pass the submitting state to the Input component
        />
      ))}
      <button type="submit" disabled={submitting}> // Submit button, disabled while submitting
        {submitText} // Text for the submit button
      </button>
    </form>
  );
}