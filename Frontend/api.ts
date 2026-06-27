// API URL configuration - can be overridden via environment variable
const getApiUrl = () => {
    // Check for environment variable
    if (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    
    // In GitHub Codespaces, use localhost for backend
    if (window.location.hostname.includes("app.github.dev")) {
        return "http://localhost:8000";
    }
    
    // Default to localhost for local development
    return "http://localhost:8000";
};

const API = getApiUrl();

let authToken: string | null = localStorage.getItem("authToken");

export function setAuthToken(token: string) {
    authToken = token;
    localStorage.setItem("authToken", token);
}

export function getAuthToken() {
    return authToken;
}

export function clearAuthToken() {
    authToken = null;
    localStorage.removeItem("authToken");
}

function getHeaders() {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
    }
    return headers;
}

// Auth
export async function register(username: string, email: string, password: string) {
    try {
        const response = await fetch(`${API}register`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        if (response.ok && data.access_token) {
            setAuthToken(data.access_token);
            return data;
        }
        return data;
    } catch (error) {
        console.error("Register fetch error:", error);
        throw error;
    }
}

export async function login(username: string, password: string) {
    try {
        const response = await fetch(`${API}login`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok && data.access_token) {
            setAuthToken(data.access_token);
            return data;
        }
        return data;
    } catch (error) {
        console.error("Login fetch error:", error);
        throw error;
    }
}

// Files
export async function uploadFile(file: File) {
    const data = new FormData();
    data.append("file", file);

    const response = await fetch(`${API}upload`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        body: data,
    });

    return response.json();
}

export async function listFiles() {
    const response = await fetch(`${API}files`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });

    return response.json();
}

export async function downloadFile(filename: string) {
    const response = await fetch(`${API}download/${filename}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Download failed");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

export async function deleteFile(filename: string) {
    const response = await fetch(`${API}files/${filename}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });

    return response.json();
}

// Settings
export async function getSettings() {
    const response = await fetch(`${API}settings`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });

    return response.json();
}

export async function updateSettings(settings: Record<string, unknown>) {
    const response = await fetch(`${API}settings`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
    });

    return response.json();
}