import React, { useRef, useState } from "react";
import { QuestionEditor } from "./questionEditor"; // Adjust path as needed

export const DemoQuestionEditor = () => {
  const widgetRef = useRef({ open: () => alert("Widget opened!") });
  const inputRef = useRef();
  
  // Minimal state mimicking what your parent/app would control
  const [question, setQuestion] = useState("");
  const [required, setRequired] = useState(false);
  const [textboxInput, setTextboxInput] = useState("");
  const [activeOptionType, setActiveOptionType] = useState("textbox");
  const [radioboxes, setRadioboxes] = useState([false]);
  const [radioLabels, setRadioLabels] = useState(["Option 1"]);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [checkboxes, setCheckboxes] = useState([false]);
  const [checkboxLabels, setCheckboxLabels] = useState(["Option 1"]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Dummy handlers for UI only
  const handleQuestionChange = (e) => setQuestion(e.target.value);
  const handleAddTextbox = () => setActiveOptionType("textbox");
  const handleAddInput = (type) => setActiveOptionType(type);
  const handleTextboxInputChange = (e) => setTextboxInput(e.target.value);
  const handleRadioChange = (idx) => setSelectedRadio(idx);
  const handleLabelChange = (type, idx, val) => {
    if (type === "radiobox") {
      setRadioLabels((arr) =>
        arr.map((item, i) => (i === idx ? val : item))
      );
    } else {
      setCheckboxLabels((arr) =>
        arr.map((item, i) => (i === idx ? val : item))
      );
    }
  };
  const handleAddRadioOption = () => setRadioLabels((arr) => [...arr, `Option ${arr.length + 1}`]);
  const handleRemoveInput = (type) => {
    if (type === "radiobox" && radioLabels.length > 1) setRadioLabels((arr) => arr.slice(0, -1));
    if (type === "checkbox" && checkboxLabels.length > 1) setCheckboxLabels((arr) => arr.slice(0, -1));
  };
  const handleCheckboxChange = (idx) =>
    setCheckboxes((arr) => arr.map((el, i) => (i === idx ? !el : el)));
  const handleAddCheckboxOption = () => setCheckboxLabels((arr) => [...arr, `Option ${arr.length + 1}`]);
  const handleSaveQuestion = () => setSuccessMessage("Question saved!");
  const handleGetPrompt = () => alert("Get prompt triggered!");

  return (
    <QuestionEditor
      imageUrl={imageUrl}
      widgetRef={widgetRef}
      inputRef={inputRef}
      question={question}
      handleQuestionChange={handleQuestionChange}
      required={required}
      setRequired={setRequired}
      handleAddTextbox={handleAddTextbox}
      handleAddInput={handleAddInput}
      activeOptionType={activeOptionType}
      textboxInput={textboxInput}
      handleTextboxInputChange={handleTextboxInputChange}
      radioboxes={radioboxes}
      selectedRadio={selectedRadio}
      handleRadioChange={handleRadioChange}
      radioLabels={radioLabels}
      handleLabelChange={handleLabelChange}
      handleAddRadioOption={handleAddRadioOption}
      handleRemoveInput={handleRemoveInput}
      checkboxes={checkboxes}
      handleCheckboxChange={handleCheckboxChange}
      checkboxLabels={checkboxLabels}
      handleAddCheckboxOption={handleAddCheckboxOption}
      handleSaveQuestion={handleSaveQuestion}
      successMessage={successMessage}
      errorMessage={errorMessage}
      handleGetPrompt={handleGetPrompt}
    />
  );
};