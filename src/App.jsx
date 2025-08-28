import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import { RenderForm } from "./pages/renderForm/renderForm";
import { AutofocusDemo } from "./pages/renderForm/autofocusDemo";


function App() {

  return (
    <div className="App">

        <Router>
          <Routes>
            <Route path="*" element={<RenderForm/>} />
          </Routes>
        </Router>

    </div>
  );
}

export default App;
