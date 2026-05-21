import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import { ADMIN_LOGIN_URL, clearAdminSession, parseApiResponse } from "./api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      setIsAuthenticated(true);
    }
    setBootstrapped(true);
  }, []);

  async function handleLogin({ email, password }) {
    const response = await fetch(ADMIN_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await parseApiResponse(response);
    const user = data?.user ?? data?.data?.user ?? data?.data ?? data;
    const token = data?.token ?? data?.data?.token;

    if (!user || user.role !== "admin") {
      throw new Error("Access denied. Admin only.");
    }

    if (!token) {
      throw new Error("Login failed: token missing.");
    }

    localStorage.setItem("adminToken", token);
    setIsAuthenticated(true);
  }

  function handleLogout() {
    setIsAuthenticated(false);
    clearAdminSession();
  }

  if (!bootstrapped) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <AdminDashboard
              onLogout={handleLogout}
              onAuthError={handleLogout}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
