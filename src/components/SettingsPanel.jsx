import React, { useState, useEffect } from 'react';
import { getUserSettings, updateUserSettings } from '../utils/auth';
import './SettingsPanel.css';

function SettingsPanel({ userId, onSettingsChange }) {
  const [settings, setSettings] = useState({ theme: 'light', notifications: true });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const userSettings = await getUserSettings(userId);
        setSettings(userSettings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, [userId]);

  const handleThemeChange = async (e) => {
    const newTheme = e.target.value;
    try {
      const updatedSettings = await updateUserSettings(userId, { ...settings, theme: newTheme });
      setSettings(updatedSettings);
      onSettingsChange(updatedSettings);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNotificationChange = async (e) => {
    const newNotifications = e.target.checked;
    try {
      const updatedSettings = await updateUserSettings(userId, { ...settings, notifications: newNotifications });
      setSettings(updatedSettings);
      onSettingsChange(updatedSettings);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    
      <h2>Settings</h2>
      {loading && <p>Loading settings...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        
          
            <label>Theme:</label>
            <select value={settings.theme} onChange={handleThemeChange}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          
          
            <label>Notifications:</label>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={handleNotificationChange}
            />
          
        
      )}
    
  );
}

export default SettingsPanel;
