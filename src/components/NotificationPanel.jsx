import React from 'react';
import './NotificationPanel.css';

function NotificationPanel({ notifications }) {
  return (
    
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        
          {notifications.map((notification, index) => (
            <div key={index} className={`notification-item ${notification.urgency.toLowerCase()}`}>
              <p>{notification.text}</p>
              <p className="timestamp">{notification.timestamp}</p>
            </div>
          ))}
        
      ) : (
        <p>No new notifications.</p>
      )}
    
  );
}

export default NotificationPanel;
