// Ensure the backend has CLIENT_URL matching this app's origin in .env
// and that CORS is configured to allow Authorization headers

const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const API_URL = rawApiUrl.replace(/\/$/, "");
export const API_BASE = `${API_URL}/api/admin`;
export const ADMIN_LOGIN_URL = `${API_BASE}/login`;
export const EXERCISES_URL = `${API_URL}/api/exercises`;

export const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

export function clearAdminSession() {
  localStorage.removeItem("adminToken");
}

export async function parseApiResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const error = new Error(data?.message || "Request failed");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
