import { useState, useEffect } from "react";
import { getSettings, updateSettings } from "../api";
import "../styles/Settings.css";

interface SettingsData {
    theme: string;
    notifications_enabled: boolean;
    auto_delete_files_days: number;
}

export default function Settings() {
    const [settings, setSettings] = useState<SettingsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadSettings();
    }, []);

    async function loadSettings() {
        setLoading(true);
        setError("");
        try {
            const result = await getSettings();
            setSettings(result);
        } catch (err) {
            setError("Failed to load settings");
        } finally {
            setLoading(false);
        }
    }

    async function handleSaveSettings() {
        if (!settings) return;

        setError("");
        setSuccess("");

        try {
            await updateSettings({
                theme: settings.theme,
                notifications_enabled: settings.notifications_enabled,
                auto_delete_files_days: settings.auto_delete_files_days,
            });
            setSuccess("Settings saved successfully!");
        } catch (err) {
            setError("Failed to save settings");
        }
    }

    if (loading) {
        return <div className="settings-container">Loading settings...</div>;
    }

    if (!settings) {
        return <div className="settings-container">Error loading settings</div>;
    }

    return (
        <div className="settings-container">
            <div className="settings-card">
                <h1>Settings</h1>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="settings-group">
                    <label htmlFor="theme">Theme</label>
                    <select
                        id="theme"
                        value={settings.theme}
                        onChange={(e) =>
                            setSettings({ ...settings, theme: e.target.value })
                        }
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                    </select>
                </div>

                <div className="settings-group">
                    <label htmlFor="notifications">
                        <input
                            id="notifications"
                            type="checkbox"
                            checked={settings.notifications_enabled}
                            onChange={(e) =>
                                setSettings({
                                    ...settings,
                                    notifications_enabled: e.target.checked,
                                })
                            }
                        />
                        Enable Notifications
                    </label>
                </div>

                <div className="settings-group">
                    <label htmlFor="autodelete">Auto-delete files after (days)</label>
                    <input
                        id="autodelete"
                        type="number"
                        min="0"
                        value={settings.auto_delete_files_days}
                        onChange={(e) =>
                            setSettings({
                                ...settings,
                                auto_delete_files_days: parseInt(e.target.value),
                            })
                        }
                    />
                    <small>0 means disabled</small>
                </div>

                <button className="btn-save" onClick={handleSaveSettings}>
                    Save Settings
                </button>
            </div>
        </div>
    );
}
