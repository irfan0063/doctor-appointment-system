import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("clinic_access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return `Cannot reach the clinic API at ${api.defaults.baseURL}. Start the backend and try again.`;
    }
    const data = error.response?.data as { message?: string | string[] } | undefined;
    if (Array.isArray(data?.message)) return data.message.join(", ");
    return data?.message || error.message || "Request failed";
  }
  return error instanceof Error ? error.message : "Something went wrong";
}

export async function login(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  const token = data?.accessToken || data?.access_token || data?.token;
  if (!token) throw new Error("Login response did not contain an accessToken.");
  localStorage.setItem("clinic_access_token", token);
  if (data?.user) localStorage.setItem("clinic_user", JSON.stringify(data.user));
  return data;
}

export function logout() {
  localStorage.removeItem("clinic_access_token");
  localStorage.removeItem("clinic_user");
  window.location.href = "/login";
}

export function unwrapList(data: any): any[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}
