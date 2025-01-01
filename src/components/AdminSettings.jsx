import React, { useState } from 'react';
import './AdminSettings.css';

function AdminSettings() {
  const [globalSettings, setGlobalSettings] = useState({
    dataRetention: 30,
    notificationFrequency: 'daily',
  });

  const handleRetentionChange = (e) => {
    setGlobalSettings({ ...globalSettings, dataRetention: parseInt(e.target.value, 10) });
  };

  const handleFrequencyChange = (e) => {
    setGlobalSettings({ ...globalSettings, notificationFrequency: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Global settings updated:', globalSettings);
    alert('Global settings updated!');
  };

  return (
    
      <h2>Admin Settings</h2>
      <form onSubmit={handleSubmit}>
        
          <label>Data Retention (days):</label>
          <input
            type="number"
            value={globalSettings.dataRetention}
            onChange={handleRetentionChange}
            min="1"
          />
        
        
          <label>Notification Frequency:</label>
          <select value={globalSettings.notificationFrequency} onChange={handleFrequencyChange}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        
        <button type="submit">Save Settings</button>
      </form>
    
  );
}

export default AdminSettings;
