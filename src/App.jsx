import React, { useState, useEffect } from 'react';
import CustomerDashboard from './components/CustomerDashboard';
import Login from './components/Login';
import SettingsPanel from './components/SettingsPanel';
import NotificationPanel from './components/NotificationPanel';
import UserManagement from './components/UserManagement';
import DataVisualization from './components/DataVisualization';
import AuditLog from './components/AuditLog';
import AdminSettings from './components/AdminSettings';
import ActivityLog from './components/ActivityLog';
import HelpSupport from './components/HelpSupport';
import UserProfile from './components/UserProfile';
import Reporting from './components/Reporting';
import FeedbackModal from './components/FeedbackModal';
import FeedbackList from './components/FeedbackList';
import ABTestingDashboard from './components/ABTestingDashboard';
import Onboarding from './components/Onboarding';
import { hasPermission } from './utils/auth';
import { logActivity } from './utils/activity';
import { setupWebSocket } from './utils/data';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({ theme: 'light', notifications: true });
  const [notifications, setNotifications] = useState([]);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showDataVisualization, setShowDataVisualization] = useState(false);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [showAdminSettings, setShowAdminSettings] = useState(false);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showReporting, setShowReporting] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showFeedbackList, setShowFeedbackList] = useState(false);
  const [showABTestingDashboard, setShowABTestingDashboard] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (user) {
      logActivity(user, 'page_view', 'Application loaded.');
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setupWebSocket(setCustomers, setSelectedCustomer, setRecommendations, setNotifications);
    }
  }, [user]);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setSettings(loggedInUser.settings);
    setShowUserManagement(hasPermission(loggedInUser, 'manage_users'));
    logActivity(loggedInUser, 'login', 'User logged in.');
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    logActivity(user, 'settings_change', 'User settings changed.');
  };

  const handleToggleUserManagement = () => {
    setShowUserManagement(!showUserManagement);
    setShowDataVisualization(false);
    setShowAuditLog(false);
    setShowAdminSettings(false);
    setShowActivityLog(false);
    setShowHelpSupport(false);
    setShowUserProfile(false);
    setShowReporting(false);
    setShowFeedbackModal(false);
    setShowFeedbackList(false);
    setShowABTestingDashboard(false);
    setShowOnboarding(false);
    logActivity(user, 'toggle_user_management', showUserManagement ? 'User management hidden.' : 'User management shown.');
  };

  const handleToggleDataVisualization = () => {
    setShowDataVisualization(!showDataVisualization);
    setShowUserManagement(false);
    setShowAuditLog(false);
    setShowAdminSettings(false);
    setShowActivityLog(false);
    setShowHelpSupport(false);
    setShowUserProfile(false);
    setShowReporting(false);
    setShowFeedbackModal(false);
    setShowFeedbackList(false);
    setShowABTestingDashboard(false);
    setShowOnboarding(false);
    logActivity(user, 'toggle_data_visualization', showDataVisualization ? 'Data visualization hidden.' : 'Data visualization shown.');
  };

  const handleToggleAuditLog = () => {
    setShowAuditLog(!showAuditLog);
    setShowUserManagement(false);
    setShowDataVisualization(false);
    setShowAdminSettings(false);
    setShowActivityLog(false);
    setShowHelpSupport(false);
    setShowUserProfile(false);
    setShowReporting(false);
    setShowFeedbackModal(false);
    setShowFeedbackList(false);
    setShowABTestingDashboard(false);
    setShowOnboarding(false);
    logActivity(user, 'toggle_audit_log', showAuditLog ? 'Audit log hidden.' : 'Audit log shown.');
  };

  const handleToggleAdminSettings = () => {
    setShowAdminSettings(!showAdminSettings);
    setShowUserManagement(false);
    setShowDataVisualization(false);
    setShowAuditLog(false);
    setShowActivityLog(false);
    setShowHelpSupport(false);
    setShowUserProfile(false);
    setShowReporting(false);
    setShowFeedbackModal(false);
    setShowFeedbackList(false);
    setShowABTestingDashboard(false);
    setShowOnboarding(false);
    logActivity(user, 'toggle_admin_settings', showAdminSettings ? 'Admin settings hidden.' : 'Admin settings shown.');
  };

  const handleToggleActivityLog = () => {
    setShowActivityLog(!showActivityLog);
    setShowUserManagement(false);
    setShowDataVisualization(false);
    setShowAuditLog(false);
    setShowAdminSettings(false);
    setShowHelpSupport(false);
    setShowUserProfile(false);
    setShowReporting(false);
    setShowFeedbackModal(false);
    setShowFeedbackList(false);
    setShowABTestingDashboard(false);
    setShowOnboarding(false);
    logActivity(user, 'toggle_activity_log', showActivityLog ? 'Activity log hidden.' : 'Activity log shown.');
  };

  const handleToggleHelpSupport = () => {
    setShowHelpSupport(!showHelpSupport);
    setShowUserManagement(false);
    setShowDataVisualization(false);
    setShowAuditLog(false);
    setShowAdminSettings(false);
    setShowActivityLog(false);
    setShowUserProfile(false);
    setShowReporting(false);
    setShowFeedbackModal(false);
    setShowFeedbackList(false);
    setShowABTestingDashboard(false);
    setShowOnboarding(false);
    logActivity(user, 'toggle_help_support', showHelpSupport ? 'Help and support hidden.' : 'Help and support shown.');
  };

  const handleToggleUserProfile = () => {
    setShowUserProfile(!showUserProfile);
    setShowUserManagement(false);
    setShowDataVisualization(false);
    setShowAuditLog(false);
    setShowAdminSettings(false);
    setShowActivityLog(false);
    setShowHelpSupport(false);
    setShowReporting(false);
    setShowFeedbackModal(false);
    setShowFeedbackList(false);
    setShowABTestingDashboard(false);
    setShowOnboarding(false);
    logActivity(user, 'toggle_user_profile', showUserProfile ? 'User profile hidden.' : 'User profile shown.');
  };

  const handleToggleReporting = () => {
    setShowReporting(!showReporting);
    setShowUserManagement(false);
    setShowDataVisualization(false);
    setShowAuditLog(false);
    setShowAdminSettings(false);
    setShowActivityLog(false);
    setShowHelpSupport(false);
    setShowUserProfile(false);
    setShowFeedbackModal(false);
    setShowFeedbackList(false);
    setShowABTestingDashboard(false);
    setShowOnboarding(false);
    logActivity(user, 'toggle_reporting', showReporting ? 'Reporting hidden.' : 'Reporting shown.');
  };

  const handleToggleABTestingDashboard = () => {
    setShowABTestingDashboard(!showABTestingDashboard);
    setShowUserManagement(false);
    setShowDataVisualization(false);
    setShowAuditLog(false);
    setShowAdminSettings(false);
    setShowActivityLog(false);
    setShowHelpSupport(false);
    setShowUserProfile(false);
    setShowReporting(false);
    setShowFeedbackModal(false);
    setShowFeedbackList(false);
    setShowOnboarding(false);
    logActivity(user, 'toggle_ab_testing', showABTestingDashboard ? 'A/B Testing hidden.' : 'A/B Testing shown.');
  };

  const handleToggleFeedbackModal = () => {
    setShowFeedbackModal(true);
  };

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
  };

  const handleToggleFeedbackList = () => {
    setShowFeedbackList(!showFeedbackList);
    setShowUserManagement(false);
    setShowDataVisualization(false);
    setShowAuditLog(false);
    setShowAdminSettings(false);
    setShowActivityLog(false);
    setShowHelpSupport(false);
    setShowUserProfile(false);
    setShowReporting(false);
    setShowFeedbackModal(false);
    setShowABTestingDashboard(false);
    setShowOnboarding(false);
    logActivity(user, 'toggle_feedback_list', showFeedbackList ? 'Feedback list hidden.' : 'Feedback list shown.');
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    
      
        <h1>Upsight AI</h1>
        {user ? (
          
            <SettingsPanel userId={user.id} onSettingsChange={handleSettingsChange} />
            {settings.notifications && <NotificationPanel notifications={notifications} />}
            
              {hasPermission(user, 'manage_users') && (
                <button onClick={handleToggleUserManagement}>
                  {showUserManagement ? 'Hide User Management' : 'Show User Management'}
                </button>
              )}
              {hasPermission(user, 'view_data') && (
                <button onClick={handleToggleDataVisualization}>
                  {showDataVisualization ? 'Hide Data Visualization' : 'Show Data Visualization'}
                </button>
              )}
              {hasPermission(user, 'view_audit') && (
                <button onClick={handleToggleAuditLog}>
                  {showAuditLog ? 'Hide Audit Log' : 'Show Audit Log'}
                </button>
              )}
              {hasPermission(user, 'manage_users') && (
                <button onClick={handleToggleAdminSettings}>
                  {showAdminSettings ? 'Hide Admin Settings' : 'Show Admin Settings'}
                </button>
              )}
              {hasPermission(user, 'view_activity') && (
                <button onClick={handleToggleActivityLog}>
                  {showActivityLog ? 'Hide Activity Log' : 'Show Activity Log'}
                </button>
              )}
                <button onClick={handleToggleHelpSupport}>
                  {showHelpSupport ? 'Hide Help & Support' : 'Show Help & Support'}
                </button>
                <button onClick={handleToggleUserProfile}>
                  {showUserProfile ? 'Hide User Profile' : 'Show User Profile'}
                </button>
                <button onClick={handleToggleReporting}>
                  {showReporting ? 'Hide Reporting' : 'Show Reporting'}
                </button>
                <button onClick={handleToggleABTestingDashboard}>
                  {showABTestingDashboard ? 'Hide A/B Testing' : 'Show A/B Testing'}
                </button>
                <button onClick={handleToggleFeedbackModal}>
                  Submit Feedback
                </button>
                {hasPermission(user, 'view_activity') && (
                  <button onClick={handleToggleFeedbackList}>
                    {showFeedbackList ? 'Hide Feedback List' : 'Show Feedback List'}
                  </button>
                )}
            
            {showUserManagement && <UserManagement />}
            {showDataVisualization && <DataVisualization />}
            {showAuditLog && <AuditLog />}
            {showAdminSettings && <AdminSettings />}
            {showActivityLog && <ActivityLog />}
            {showHelpSupport && <HelpSupport />}
            {showUserProfile && <UserProfile userId={user.id} />}
            {showReporting && <Reporting />}
            {showFeedbackList && <FeedbackList />}
            {showFeedbackModal && <FeedbackModal onClose={handleCloseFeedbackModal} user={user} />}
            {showABTestingDashboard && <ABTestingDashboard />}
            {showOnboarding && <Onboarding onClose={handleCloseOnboarding} />}
            <CustomerDashboard
              theme={settings.theme}
              setNotifications={setNotifications}
              showDataVisualization={showDataVisualization}
              user={user}
              customers={customers}
              setCustomers={setCustomers}
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
              recommendations={recommendations}
              setRecommendations={setRecommendations}
            />
          
        ) : (
          <Login onLogin={handleLogin} />
        )}
      
    
  );
}

export default App;
