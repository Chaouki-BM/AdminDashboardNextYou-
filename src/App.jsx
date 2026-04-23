import { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import LoginPage from "./LoginPage";
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

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} onAuthError={handleLogout} />;
}

export default App;
