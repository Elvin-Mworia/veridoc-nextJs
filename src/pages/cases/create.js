"use client"
import StepOne from "@/components/StepOne";
import StepThree from "@/components/StepThree";
import StepTwo from "@/components/StepTwo";
import Layout from "@/components/layout";
import StepFive from "@/components/stepFive";
import StepFour from "@/components/stepFour";

// pages/multistepform.js
import { useState } from "react";

export default function MultiStepForm() {
  // State to track current form step
  const [currentStep, setCurrentStep] = useState(1);
  // State to store form data
  const [formData, setFormData] = useState({
    courtRank: null,
    courtStation: null,
    courtDivision: null,
    caseCategory: null,
    caseType: null,
    parties: [],
    files: [],
  });

  // Function to move to the next form step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Function to move to the previous form step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  // function to handle adding file data from StepFour
  const handleAddFile = (fileData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      files: [...prevFormData.files, fileData],
    }));
  };

  // Define the handleSubmit function if not already defined
  const handleSubmit = () => {
    // Handle final form submission logic here
    // E.g., send formData to an API
    
    console.log("Submitting form data:", formData);
    // Potentially redirect the user to a success page or display a success message
  };

  // Function to render the current step form
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <StepOne
              nextStep={nextStep}
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <StepTwo
              nextStep={nextStep}
              prevStep={prevStep}
              formData={formData}
              handleChange={handleChange}
              setFormData={setFormData}
            />
            {/* <button onClick={prevStep}>Back</button> */}
            {/* <button onClick={nextStep}>Next</button> */}
          </div>
        );
      case 3:
        return (
          <div>
            <StepThree
              nextStep={nextStep}
              prevStep={prevStep}
              formData={formData}
              handleChange={handleChange}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <StepFour
              nextStep={nextStep}
              prevStep={prevStep}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        );
      case 5:
        return (
          <div>
            <StepFive
              prevStep={prevStep}
              formData={formData}
              handleSubmit={handleSubmit}
            />
          </div>
        );
      default:
        return <div>Form Completed</div>;
    }
  };

  return <div>{renderStep()}</div>;
}

MultiStepForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
