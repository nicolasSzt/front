const API_URL = "http://localhost:3000/api/users/login";

export async function loginAuth(email, password) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.data.authorization_token) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.log(error)
  }
}

export function logout() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
