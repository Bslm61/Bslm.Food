import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app";
import './index.css'
import { StoreContextProvider } from "./context/StoreContext.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
  <StoreContextProvider>
    <App  />
  </StoreContextProvider>,
  </BrowserRouter>,
);
 