import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import PrivateRoute from "./route/PrivateRoute";
import useAuthStore from "./stores/authStore";

function App() {
  const { token, user, getUser } = useAuthStore();

  useEffect(() => {
    if (token && !user) {
      getUser();
    }
  }, [token, user]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
