
import React, { useState, useEffect, useRef } from 'react';
import { fetchCustomerData, getRecommendations, updateCustomerData, exportCustomerData, importCustomerData } from '../utils/data';
import CustomerDetails from './CustomerDetails';
import CustomerList from './CustomerList';
import { logAction } from '../utils/audit';
import { hasPermission } from '../utils/auth';
import { logActivity } from '../utils/activity';
import './CustomerDashboard.css';

function CustomerDashboard({ theme, setNotifications, showDataVisualization, user, customers, setCustomers, selectedCustomer, setSelectedCustomer, recommendations, setRecommendations }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCustomerData(currentPage, pageSize);
        setCustomers(data.customers);
        setTotalPages(Math.ceil(data.total / pageSize));
        logAction(user, 'load_customer_data', 'Customer data loaded successfully.');
        logActivity(user, 'load_customer_data', 'Customer data loaded.');
      } catch (err) {
        setError('Failed to load customer data.');
        logAction(user, 'load_customer_data', `Failed to load customer data: ${err.message}`);
        logActivity(user, 'load_customer_data', `Failed to load customer data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setCustomers, user, currentPage, pageSize]);

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    document.getElementById('root').classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    const recs = getRecommendations(customer);
    setRecommendations(recs);
    logAction(user, 'select_customer', `Customer ${customer.name} selected.`);
    logActivity(user, 'select_customer', `Customer ${customer.name} selected.`);
  };

  const handleExportData = () => {
    exportCustomerData(customers);
    logAction(user, 'export_customer_data', 'Customer data exported.');
    logActivity(user, 'export_customer_data', 'Customer data exported.');
  };

  const handleImportData = async () => {
    if (fileInputRef.current && fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      try {
        await importCustomerData(file, setCustomers);
        logAction(user, 'import_customer_data', 'Customer data imported successfully.');
        logActivity(user, 'import_customer_data', 'Customer data imported successfully.');
      } catch (err) {
        setError(`Failed to import customer