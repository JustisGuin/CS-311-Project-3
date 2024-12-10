"use client"; // Indicates that this component is a client component in a Next.js application
import Input from "@/app/comp/client/input"; // Custom input component
import TagInput from "@/app/comp/client/tagInput"; // Custom tag input component

// Main component for generating a recipe
export default function GenerateRecipeForm({ action, onNext }: { action: (data: FormData) => Promise<void>; onNext: () => void }) {
  
  // Function to validate the number of steps input
  function validateStepCount(input: string): string {
    if (!input) {
      return "Please enter the number of steps you want."; // Error message if input is empty
    }

    const count = parseInt(input); // Parse the input to an integer

    if (isNaN(count)) {
      return "The step count must be a number."; // Error message if input is not a number
    }

    if (count <= 0) {
      return "You cannot generate a recipe with no steps!"; // Error message if the count is less than or equal to zero
    }

    return ""; // Return an empty string if validation passes
  }

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.currentTarget); // Create FormData from the form
    await action(formData); // Call the action with the FormData
    onNext(); // Move to the next step after successful submission
  };

  // Render the form for generating a recipe
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <p className="text-center">Add a step:</p>
      <Input 
        label="Number of steps:" // Label for the input field
        name="steps" // Name attribute for the input field
        placeholder="3, 5, 7" // Placeholder text for the input field
        validateInput={validateStepCount} // Validation function for the input
      />
      <TagInput 
        name="tags" // Name attribute for the tag input
        minimumTags={2} // Minimum number of tags required
      />
      <button type="submit" className="mx-auto default-button"> // Submit button for generating the recipe
        Generate! // Text for the submit button
      </button>
    </form>
  );
}