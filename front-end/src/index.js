import ReactDOM from "react-dom";
import React from 'react';
import App from './App'
import { AuthProvider } from "./screens/Login/AuthContext";
ReactDOM.render(
    <React.StrictMode>
      <AuthProvider>
      <App />
      </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );

