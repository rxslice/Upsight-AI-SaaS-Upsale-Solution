import React from 'react';
import { getAuditLog } from '../utils/audit';
import './AuditLog.css';

function AuditLog() {
  const auditLog = getAuditLog();

  return (
    
      <h2>Audit Log</h2>
      {auditLog.length > 0 ? (
        
          
            
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
            
            
              {auditLog.map((log, index) => (
                <tr key={index}>
                  <td>{log.timestamp}</td>
                  <td>{log.user}</td>
                  <td>{log.action}</td>
                  <td>{log.details}</td>
                </tr>
              ))}
            
          
        
      ) : (
        <p>No audit log entries yet.</p>
      )}
    
  );
}

export default AuditLog;
