import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Navbar } from "./components/navbar/navbar";

import { RenderForm } from "./pages/renderForm/renderForm";

//import {DemoQuestionEditor} from "./components/pages/formBuilder/question/demoQuestionEditor"; 

import { FormContextProvider } from "./context/form-context";

function App() {

  return (
    <div className="App">
      <FormContextProvider>
        <Router>
          <Routes>
            <Route path="*" element={<RenderForm/>} />
          </Routes>
        </Router>
      </FormContextProvider>
    </div>
  );
}

export default App;
