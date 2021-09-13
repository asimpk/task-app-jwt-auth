import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./hooks/useAuth";
import { TaskProvider } from "./hooks/useTask";
import Layout from "./components/Layout";
import Routes from "./components/Routes";
import "bootstrap/dist/css/bootstrap.min.css";




function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Layout>
            <Routes />
          </Layout>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
