import React, { useState, useEffect } from 'react';
import { getUserSettings, updateUserSettings } from '../utils/auth';
import './UserProfile.css';

function UserProfile({ userId }) {
  const [settings, setSettings] = useState({ theme: 'light', notifications: true });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newTheme, setNewTheme] = useState('light');
  const [newNotifications, setNewNotifications] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const userSettings = await getUserSettings(userId);
        setSettings(userSettings);
        setNewTheme(userSettings.theme);
        setNewNotifications(userSettings.notifications);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, [userId]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setNewTheme(settings.theme);
    setNewNotifications(settings.notifications);
    setEditMode(false);
  };

  const handleSaveClick = async () => {
    try {
      const updatedSettings = await updateUserSettings(userId, { theme: newTheme, notifications: newNotifications });
      setSettings(updatedSettings);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleThemeChange = (e) => {
    setNewTheme(e.target.value);
  };

  const handleNotificationChange = (e) => {
    setNewNotifications(e.target.checked);
  };

  return (
    
      <h2>User Profile</h2>
      {loading && <p>Loading profile...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        
          {!editMode ? (
            
              <p><strong>Theme:</strong> {settings.theme}</p>
              <p><strong>Notifications:</strong> {settings.notifications ? 'Enabled' : 'Disabled'}</p>
              <button onClick={handleEditClick}>Edit Profile</button>
            
          ) : (
            
              
                <label>Theme:</label>
                <select value={newTheme} onChange={handleThemeChange}>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              
              
                <label>Notifications:</label>
                <input
                  type="checkbox"
                  checked={newNotifications}
                  onChange={handleNotificationChange}
                />
              
              
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              
            
          )}
        
      )}
    
  );
}

export default UserProfile;
