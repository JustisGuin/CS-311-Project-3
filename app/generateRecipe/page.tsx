'use client';
import { useState } from "react";
import AddIngredientsForm from "../comp/client/addIngredient";
import AddStepForm from "../comp/client/addStep";
import GenerateRecipeForm from "../comp/client/generateRecipeForm";

// Main GenerateRecipe component
export default function GenerateRecipe({ action }: { action: (data: FormData) => Promise<void> }) {
    const [currentStep, setCurrentStep] = useState<"form" | "addStep" | "addIngredients">("form");

    const handleNextStep = () => {
        if (currentStep === "form") {
            setCurrentStep("addStep");
        } else if (currentStep === "addStep") {
            setCurrentStep("addIngredients");
        }
    };

    const handleBack = () => {
        if (currentStep === "addIngredients") {
            setCurrentStep("addStep");
        } else if (currentStep === "addStep") {
            setCurrentStep("form");
        }
    };

    return (
        <div className="generate-recipe-container">
            <h2 className="generate-recipe-title">Generate Your Recipe</h2>
            {/* Render the appropriate form based on the current step */}
            {currentStep === "form" && (
                <div className="form">
                    <GenerateRecipeForm action={action} onNext={handleNextStep} />
                </div>
            )}
            {currentStep === "addStep" && (
                <div className="form">
                    <AddStepForm action={action} onBack={handleBack} />
                </div>
            )}
            {currentStep === "addIngredients" && (
                <div className="form">
                    <AddIngredientsForm action={action} onBack={handleBack} />
                </div>
            )}
            <div className="flex space-x-4 mt-4">
                {currentStep !== "form" && (
                    <button
                        onClick={handleBack}
                        className="button button-back"
                    >
                        Back
                    </button>
                )}
                {currentStep !== "addIngredients" && (
                    <button
                        onClick={handleNextStep}
                        className="button button-next"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}