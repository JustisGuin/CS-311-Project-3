"use client"; // Indicates that this component is a client component in a Next.js application
import { useState, useRef, useEffect, startTransition } from "react";
import useActionState from "@/app/comp/client/useActionState"; // Custom hook for managing form action state
import Input from "@/app/comp/client/input"; // Custom input component
import TagInput from "@/app/comp/client/tagInput"; // Custom tag input component

// Main component for adding ingredients
export default function AddIngredientsForm({ action, onBack }: { action: (data: FormData) => Promise<void>; onBack: () => void }) {
  // State to hold server errors, form action, and pending state
  const [serverErrors, formAction, pending] = useActionState(action, {
    // Placeholder methods for FormData manipulation (to be implemented)
    append: function (name: string, value: string | Blob): void {
      throw new Error("Function not implemented.");
    },
    delete: function (name: string): void {
      throw new Error("Function not implemented.");
    },
    get: function (name: string): FormDataEntryValue | null {
      throw new Error("Function not implemented.");
    },
    getAll: function (name: string): FormDataEntryValue[] {
      throw new Error("Function not implemented.");
    },
    has: function (name: string): boolean {
      throw new Error("Function not implemented.");
    },
    set: function (name: string, value: string | Blob): void {
      throw new Error("Function not implemented.");
    },
    forEach: function (callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void {
      throw new Error("Function not implemented.");
    },
    entries: function (): FormDataIterator<[string, FormDataEntryValue]> {
      throw new Error("Function not implemented.");
    },
    keys: function (): FormDataIterator<string> {
      throw new Error("Function not implemented.");
    },
    values: function (): FormDataIterator<FormDataEntryValue> {
      throw new Error("Function not implemented.");
    },
    [Symbol.iterator]: function (): FormDataIterator<[string, FormDataEntryValue]> {
      throw new Error("Function not implemented.");
    }
  });

  // State to control the visibility of the ingredient input form
  const [revealed, setRevealed] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null); // Reference to the form element

  // Effect to reset the form if there are no server errors
  useEffect(() => {
    if (!formRef.current) {
      return; // Exit if the form reference is not set
    }
    const hasErrors = Object.keys(serverErrors).some((key) => serverErrors[key]); // Check for any server errors
    if (!hasErrors) {
      formRef.current.reset(); // Reset the form if there are no errors
    }
  }, [serverErrors]);

  // If the form is not revealed, show a prompt to add an ingredient
  if (!revealed) {
    return (
      <div className="flex flex-col">
        <p className="text-center">
          Not enough ingredients for you? Want to spice up your recipes?
        </p>
        <button onClick={() => { setRevealed(true); }} className="default-button mx-auto">
          Add an ingredient!
        </button>
      </div>
    );
  }

  // Handle form submission
  const onSubmitted = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    const data = new FormData(formRef.current!); // Create FormData from the form
    startTransition(() => {
      formAction(data); // Call the form action with the FormData
    });
  };

  // Class for form buttons
  const formButtonClass = "mx-8 default-button";

  // Render the form for adding ingredients
  return (
    <form className="flex flex-col" ref={formRef} onSubmit={onSubmitted}>
      <p className="text-center">Add an ingredient:</p>
      <Input
        label="Name:"
        name="name"
        placeholder="Name"
        validationSteps={["not-empty"]} // Validation steps for the input
        serverErrorMessage={pending ? "" : serverErrors["name"]} // Display server error message if applicable
        disabled={pending} // Disable input if pending
      />
      <TagInput
        name="tags"
        minimumTags={1} // Minimum number of tags required
        serverErrorMessage={pending ? "" : serverErrors["tags"]} // Display server error message if applicable
        disabled={pending} // Disable input if pending
      />
      <div className="flex justify-center">
        <button onClick={onBack} type="button" className={formButtonClass} disabled={pending}>
          Back 
          
        </button>
        <button type="submit" className={formButtonClass} disabled={pending}>
          Add // Button to submit the form and add the ingredient
        </button>
      </div>
    </form>
  );
}