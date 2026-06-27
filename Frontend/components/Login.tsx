import { useState } from "react";
import { login, setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await login(username, password);
            if (result.access_token) {
                setAuthToken(result.access_token);
                navigate("/files");
            } else if (result.detail) {
                setError(typeof result.detail === "string" ? result.detail : JSON.stringify(result.detail));
            } else {
                setError("Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("An error occurred during login. Please check that the backend is running.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>AetherCloud Login</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p>
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
}
