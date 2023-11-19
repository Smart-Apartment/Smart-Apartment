import ReactDOM from "react-dom";
import React from 'react';
import App from './App'
import { AuthProvider } from "./screens/Login/AuthContext";
ReactDOM.render(
      <AuthProvider>
      <App />
      </AuthProvider>,
    document.getElementById("root")
  );

