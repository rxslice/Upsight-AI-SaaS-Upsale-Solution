import React from 'react';
import { getActivityLog } from '../utils/activity';
import './ActivityLog.css';

function ActivityLog() {
  const activityLog = getActivityLog();

  return (
    
      <h2>Activity Log</h2>
      {activityLog.length > 0 ? (
        
          
            
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
            
            
              {activityLog.map((log, index) => (
                <tr key={index}>
                  <td>{log.timestamp}</td>
                  <td>{log.user}</td>
                  <td>{log.action}</td>
                  <td>{log.details}</td>
                </tr>
              ))}
            
          
        
      ) : (
        <p>No activity log entries yet.</p>
      )}
    
  );
}

export default ActivityLog;
