import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import FileExplorer from "./components/FileExplorer";
import Settings from "./components/Settings";
import { getAuthToken, clearAuthToken } from "./api";
import "./styles/App.css";

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const token = getAuthToken();
    return token ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
    const [token, setToken] = useState<string | null>(getAuthToken());

    useEffect(() => {
        const interval = setInterval(() => {
            setToken(getAuthToken());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <BrowserRouter>
            <div className="app">
                {token && (
                    <nav className="navbar">
                        <div className="nav-brand">AetherCloud</div>
                        <div className="nav-links">
                            <a href="/files">Files</a>
                            <a href="/settings">Settings</a>
                            <button
                                className="logout-btn"
                                onClick={() => {
                                    clearAuthToken();
                                    setToken(null);
                                    window.location.href = "/login";
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </nav>
                )}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/files"
                        element={
                            <PrivateRoute>
                                <FileExplorer />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute>
                                <Settings />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/files" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;