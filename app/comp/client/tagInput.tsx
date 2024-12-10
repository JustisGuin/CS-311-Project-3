"use client"; // Indicates that this component is a client component in a Next.js application

import Input from "@/app/comp/client/input"; // Import the custom Input component

// Main TagInput component
export default function TagInput(
  {
    name, // Name attribute for the input field
    minimumTags = 0, // Minimum number of tags required, default is 0
    serverErrorMessage = "", // Optional error message from the server
    disabled = false // Optional flag to disable the input
  }: {
    name: string, // Type for name prop
    minimumTags?: number, // Type for minimumTags prop
    serverErrorMessage?: string, // Type for serverErrorMessage prop
    disabled?: boolean // Type for disabled prop
  }
) {
  const tagDelimiter = ","; // Delimiter used to separate tags

  // Function to validate the tags input
  function validateTags(tagsInput: string): string {
    // Split the input string into an array of tags, filtering out empty strings
    const tagsList = tagsInput.split(tagDelimiter).filter((tag: string) => tag !== "");

    // Check if the number of tags is less than the minimum required
    if (tagsList.length < minimumTags) {
      const pluralCharacter = (minimumTags === 1) ? "" : "s"; // Determine if plural is needed
      return `You must have at least ${minimumTags} tag${pluralCharacter}.`; // Return error message
    }

    return ""; // Return an empty string if validation passes
  }

  // Render the Input component for tags
  return (
    <Input
      label="Tags:" // Label for the input field
      name={name} // Name attribute for the input field
      placeholder="tag1,tag2,tag3" // Placeholder text for the input field
      validateInput={validateTags} // Validation function for the input
      serverErrorMessage={serverErrorMessage} // Server error message if provided
      disabled={disabled} // Disable input if specified
    />
  );
}