import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DoctorListingPage from "./DoctorListingPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorListingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
