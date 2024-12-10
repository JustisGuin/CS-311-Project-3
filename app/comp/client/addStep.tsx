"use client"; // Indicates that this component is a client component in a Next.js application
import { useState } from "react";
import Input from "@/app/comp/client/input"; // Custom input component
import TagInput from "@/app/comp/client/tagInput"; // Custom tag input component

// Main component for adding a step in a recipe
export default function AddStepForm({ action, onBack }: { action: (data: FormData) => Promise<void>; onBack: () => void }) {
  // State to control the visibility of the step input form
  const [revealed, setRevealed] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.currentTarget); // Create FormData from the form
    await action(formData); // Call the action with the FormData
    onBack(); // Move back to the previous step after successful submission
  };

  // If the form is not revealed, show a prompt to add a step
  if (!revealed) {
    return (
      <div className="flex flex-col">
        <p className="text-center">
          Hmm. Perhaps you're more interested in the delicate art of changing how those
          ingredients are prepared.
        </p>
        <button onClick={() => { setRevealed(true); }} className="default-button mx-auto">
          Add a step!
        </button>
      </div>
    );
  }

  // Class for form buttons
  const formButtonClass = "mx-8 default-button";

  // Render the form for adding a step
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <p className="text-center">Add a step:</p>
      <Input 
        label="Step text:" // Label for the input field
        name="text" // Name attribute for the input field
        placeholder="Mix [dry] and [wet]..." // Placeholder text for the input field
      />
      <TagInput 
        name="tags" // Name attribute for the tag input
        minimumTags={1} // Minimum number of tags required
      />
      <div className="flex justify-center">
        <button onClick={onBack} type="button" className={formButtonClass}>
          Back // Button to go back to the previous step
        </button>
        <button type="submit" className={formButtonClass}>
          Add // Button to submit the form and add the step
        </button>
      </div>
    </form>
  );
}