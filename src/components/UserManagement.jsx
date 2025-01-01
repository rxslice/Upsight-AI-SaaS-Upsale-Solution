import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserRole, updateUserPermissions } from '../utils/auth';
import './UserManagement.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(prevUsers => prevUsers.map(user => user.id === userId ? { ...user, role: newRole } : user));
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePermissionChange = async (userId, permission, checked) => {
    try {
      const user = users.find(u => u.id === userId);
      const newPermissions = checked
        ? [...(user.permissions || []), permission]
        : (user.permissions || []).filter(p => p !== permission);
      await updateUserPermissions(userId, newPermissions);
      setUsers(prevUsers => prevUsers.map(user => user.id === userId ? { ...user, permissions: newPermissions } : user));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    
      <h2>User Management</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        
          
            
              <th>Username</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Actions</th>
            
            
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    
                      
                        <label>
                          <input
                            type="checkbox"
                            checked={user.permissions?.includes('view_data')}
                            onChange={(e) => handlePermissionChange(user.id, 'view_data', e.target.checked)}
                          />
                          View Data
                        </label>
                      
                      
                        <label>
                          <input
                            type="checkbox"
                            checked={user.permissions?.includes('edit_data')}
                            onChange={(e) => handlePermissionChange(user.id, 'edit_data', e.target.checked)}
                          />
                          Edit Data
                        </label>
                      
                      
                        <label>
                          <input
                            type="checkbox"
                            checked={user.permissions?.includes('manage_users')}
                            onChange={(e) => handlePermissionChange(user.id, 'manage_users', e.target.checked)}
                          />
                          Manage Users
                        </label>
                      
                      
                        <label>
                          <input
                            type="checkbox"
                            checked={user.permissions?.includes('view_activity')}
                            onChange={(e) => handlePermissionChange(user.id, 'view_activity', e.target.checked)}
                          />
                          View Activity
                        </label>
                      
                      
                        <label>
                          <input
                            type="checkbox"
                            checked={user.permissions?.includes('view_audit')}
                            onChange={(e) => handlePermissionChange(user.id, 'view_audit', e.target.checked)}
                          />
                          View Audit
                        </label>
                      
                    
                  </td>
                  <td></td>
                </tr>
              ))}
            
          
        
      )}
    
  );
}

export default UserManagement;
