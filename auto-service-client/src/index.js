import React from "react";
import "./index.css";
import ReactDOM from 'react-dom';
import App from "./App";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();

// import { createRoot } from "react-dom/client";
// import { BrowserRouter as Router } from "react-router-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(
//   <Router>
//     <App />
//   </Router>
// );