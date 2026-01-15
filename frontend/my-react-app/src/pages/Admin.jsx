import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('enrollments');
  const [searchTerm, setSearchTerm] = useState('');
  const [showLinkGen, setShowLinkGen] = useState(false);
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    fileUrl: '',
    category: 'Board Exam',
    isPublished: true,
    file: null
  });
  const [uploading, setUploading] = useState(false);
  const [customLink, setCustomLink] = useState('');
  const [linkSource, setLinkSource] = useState('instagram');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
  const ADMIN_SECRET = 'pac-admin-2026';

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Admin login attempt...');
    console.log('Using API URL:', API_BASE_URL);
    if (passcode === ADMIN_SECRET) {
      console.log('Login successful');
      setLoading(true); // Set loading immediately
      setIsAuthenticated(true);
      fetchStats();
    } else {
      console.warn('Login failed: Invalid passcode');
      setError('Invalid Passcode');
    }
  };

  const fetchStats = async (isAuto = false) => {
    if (!isAuto) {
      console.log('Fetching admin stats from:', `${API_BASE_URL}/api/admin/stats`);
      setLoading(true);
      setError(''); // Clear error when fetching manually
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/stats`, {
        headers: {
          'x-admin-secret': ADMIN_SECRET
        },
        timeout: 10000 // 10 second timeout
      });
      console.log('Stats response received:', response.data ? 'Success' : 'Empty');
      setStats(response.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching admin stats:', err);
      if (!isAuto) {
        let errorMsg = 'Failed to connect to the server.';
        if (err.response) {
          // The server responded with a status code that falls out of the range of 2xx
          errorMsg = `Server Error (${err.response.status}): ${err.response.data?.message || err.response.data?.error || 'Unknown server error'}`;
        } else if (err.request) {
          // The request was made but no response was received
          errorMsg = `Network Error: No response from server at ${API_BASE_URL}. Please ensure the backend is running and accessible.`;
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMsg = `Request Error: ${err.message}`;
        }
        setError(errorMsg);
      }
    } finally {
      if (!isAuto) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let interval;
    if (isAuthenticated && autoRefresh) {
      interval = setInterval(() => {
        fetchStats(true);
      }, 30000); // Refresh every 30 seconds
    }
    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh]);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/admin/enrollment/${id}/status`, { status }, {
        headers: { 'x-admin-secret': ADMIN_SECRET }
      });
      fetchStats();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const deleteEnrollment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enrollment?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/enrollment/${id}`, {
        headers: { 'x-admin-secret': ADMIN_SECRET }
      });
      fetchStats();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/contact/${id}`, {
        headers: { 'x-admin-secret': ADMIN_SECRET }
      });
      fetchStats();
    } catch (err) {
      alert('Failed to delete message');
    }
  };

  const handleCreateMaterial = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let finalFileUrl = newMaterial.fileUrl;

      // If a file is selected, upload it first
      if (newMaterial.file) {
        const formData = new FormData();
        formData.append('file', newMaterial.file);
        
        const uploadRes = await axios.post(`${API_BASE_URL}/api/admin/upload`, formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'x-admin-secret': ADMIN_SECRET 
          }
        });
        
        if (uploadRes.data.success) {
          finalFileUrl = uploadRes.data.fileUrl;
        } else {
          throw new Error('File upload failed');
        }
      }

      if (!finalFileUrl) {
        alert('Please provide a file or a link');
        setUploading(false);
        return;
      }

      await axios.post(`${API_BASE_URL}/api/admin/materials`, {
        ...newMaterial,
        fileUrl: finalFileUrl
      }, {
        headers: { 'x-admin-secret': ADMIN_SECRET }
      });

      setShowMaterialForm(false);
      setNewMaterial({
        title: '',
        description: '',
        fileUrl: '',
        category: 'Board Exam',
        isPublished: true,
        file: null
      });
      fetchStats();
    } catch (err) {
      console.error('Create material error:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to create material';
      alert(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const toggleMaterialPublish = async (id, currentStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/admin/materials/${id}`, { isPublished: !currentStatus }, {
        headers: { 'x-admin-secret': ADMIN_SECRET }
      });
      fetchStats();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const deleteMaterial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this material?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/materials/${id}`, {
        headers: { 'x-admin-secret': ADMIN_SECRET }
      });
      fetchStats();
    } catch (err) {
      alert('Failed to delete material');
    }
  };

  const generateLink = () => {
    const base = window.location.origin + '/enroll';
    const link = `${base}?ref=${linkSource}`;
    setCustomLink(link);
  };

  const downloadCSV = () => {
    let headers = [];
    let rows = [];
    let fileName = '';

    if (activeTab === 'enrollments') {
      const data = stats?.enrollments || [];
      if (data.length === 0) return;
      headers = ['Name', 'Class', 'Course', 'Mobile', 'Status', 'Distance', 'Location', 'Date'];
      rows = data.map(user => [
        `"${user.fullName || ''}"`,
        `"${user.currentClass || ''}"`,
        `"${user.interested_Course || ''}"`,
        `"${user.mobileNumber || ''}"`,
        `"${user.status || 'Pending'}"`,
        `"${user.distance ? user.distance + ' KM' : 'N/A'}"`,
        `"${typeof user.location === 'object' ? (user.location.address || 'Unknown') : (user.location || 'Unknown')}"`,
        `"${user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : 'N/A'}"`
      ]);
      fileName = `PAC_Enrollments_${new Date().toLocaleDateString()}.csv`;
    } else if (activeTab === 'visits') {
      const data = stats?.visits || [];
      if (data.length === 0) return;
      headers = ['IP', 'City', 'Region', 'Device', 'Distance', 'Location', 'Page', 'Referrer', 'Date'];
      rows = data.map(v => [
        `"${v.ip || ''}"`,
        `"${v.city || ''}"`,
        `"${v.region || ''}"`,
        `"${v.deviceType || 'Desktop'}"`,
        `"${v.distance ? v.distance + ' KM' : 'N/A'}"`,
        `"${typeof v.location === 'object' ? (v.location.address || 'Unknown') : (v.location || 'Unknown')}"`,
        `"${v.pagePath || '/'}"`,
        `"${v.referrer || 'Direct'}"`,
        `"${v.createdAt ? new Date(v.createdAt).toLocaleString('en-IN') : 'N/A'}"`
      ]);
      fileName = `PAC_Visits_${new Date().toLocaleDateString()}.csv`;
    } else if (activeTab === 'shares') {
      const data = stats?.shares || [];
      if (data.length === 0) return;
      headers = ['Shared By', 'Mobile', 'Platform', 'IP', 'Date'];
      rows = data.map(s => [
        `"${s.userId?.fullName || 'Anonymous'}"`,
        `"${s.userId?.mobileNumber || 'N/A'}"`,
        `"${s.platform || 'Unknown'}"`,
        `"${s.visitorInfo?.ip || 'Unknown'}"`,
        `"${s.createdAt ? new Date(s.createdAt).toLocaleString('en-IN') : 'N/A'}"`
      ]);
      fileName = `PAC_Shares_${new Date().toLocaleDateString()}.csv`;
    } else {
      return;
    }
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  };

  const getVisitStats = () => {
    try {
      const visits = stats?.visits || [];
      const enrollments = stats?.enrollments || [];
      const devices = {};
      const pages = {};
      const referrers = {};
      const statusCounts = {
        Pending: 0,
        Called: 0,
        Interested: 0,
        Joined: 0,
        'Not Interested': 0
      };

      enrollments.forEach(u => {
        if (!u) return;
        const s = u.status || 'Pending';
        statusCounts[s] = (statusCounts[s] || 0) + 1;
      });

      visits.forEach(v => {
        if (!v) return;
        devices[v.deviceType || 'Desktop'] = (devices[v.deviceType || 'Desktop'] || 0) + 1;
        pages[v.pagePath || '/'] = (pages[v.pagePath || '/'] || 0) + 1;
        
        let ref = v.referrer || 'Direct Visit';
        if (ref.includes('localhost')) ref = 'Direct/Local';
        else if (ref.includes('google')) ref = 'Google Search';
        else if (ref.includes('facebook')) ref = 'Facebook';
        else if (ref.includes('instagram')) ref = 'Instagram';
        else if (ref.includes('wa.me') || ref.includes('whatsapp')) ref = 'WhatsApp';
        
        referrers[ref] = (referrers[ref] || 0) + 1;
      });
      return { devices, pages, referrers, statusCounts };
    } catch (err) {
      console.error('Error calculating visit stats:', err);
      return { 
        devices: {}, 
        pages: {}, 
        referrers: {}, 
        statusCounts: { Pending: 0, Called: 0, Interested: 0, Joined: 0, 'Not Interested': 0 } 
      };
    }
  };

  const getFilteredData = () => {
    try {
      if (!stats) return [];
      const term = searchTerm.toLowerCase();
      
      if (activeTab === 'enrollments') {
        const enrollments = stats.enrollments || [];
        return enrollments.filter(u => 
          u && (
            (u.fullName || '').toLowerCase().includes(term) || 
            (u.mobileNumber || '').includes(term) ||
            (u.interested_Course || '').toLowerCase().includes(term) ||
            (typeof u.location === 'object' ? (u.location.address || '') : (u.location || '')).toLowerCase().includes(term)
          )
        );
      }
      if (activeTab === 'visits') {
        const visits = stats.visits || [];
        return visits.filter(v => 
          v && (
            (v.ip || '').includes(term) || 
            (v.city && v.city.toLowerCase().includes(term)) ||
            (v.pagePath && v.pagePath.toLowerCase().includes(term))
          )
        );
      }
      if (activeTab === 'shares') {
        const shares = stats.shares || [];
        return shares.filter(s => 
          s && (
            (s.platform || '').toLowerCase().includes(term) ||
            (s.visitorInfo?.ip && s.visitorInfo.ip.includes(term)) ||
            (s.userId?.fullName && s.userId.fullName.toLowerCase().includes(term)) ||
            (s.userId?.mobileNumber && s.userId.mobileNumber.includes(term))
          )
        );
      }
      if (activeTab === 'contacts') {
        const contacts = stats.contacts || [];
        return contacts.filter(c => 
          c && (
            (c.name || '').toLowerCase().includes(term) ||
            (c.email || '').toLowerCase().includes(term) ||
            (c.subject || '').toLowerCase().includes(term)
          )
        );
      }
      if (activeTab === 'materials') {
        const materials = stats.materials || [];
        return materials.filter(m => 
          m && (
            (m.title || '').toLowerCase().includes(term) ||
            (m.category || '').toLowerCase().includes(term)
          )
        );
      }
      return [];
    } catch (err) {
      console.error('Error filtering data:', err);
      return [];
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative z-10">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-green-600 p-4 rounded-2xl shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2 mt-4">Admin Portal</h2>
          <p className="text-center text-gray-500 text-sm mb-8">Please enter your security passcode</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 ml-1">Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError('');
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-gray-900"
                placeholder="••••••••"
                required
                autoFocus
              />
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-700 transition duration-300 shadow-lg shadow-green-100 active:scale-[0.98]"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading && !stats) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Loading Dashboard Data...</p>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-red-100 text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-gray-50 p-3 rounded-lg text-left mb-6 overflow-hidden">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Diagnostic Info</p>
            <p className="text-xs text-gray-500 break-all"><strong>URL:</strong> {API_BASE_URL}/api/admin/stats</p>
            <p className="text-xs text-gray-500"><strong>Status:</strong> {stats ? 'Data loaded' : 'No data'}</p>
          </div>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => fetchStats()} 
              className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-100"
            >
              Retry Connection
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)} 
              className="w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 pt-24">
      {!stats ? (
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-500">Preparing dashboard layout...</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className={`flex h-2 w-2 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
              <p className="text-xs text-gray-500 font-medium">
                {autoRefresh ? 'Auto-refreshing every 30s' : 'Auto-refresh off'} • Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
              <button 
                onClick={() => setAutoRefresh(!autoRefresh)}
                className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-0.5 rounded transition"
              >
                {autoRefresh ? 'Pause' : 'Resume'}
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowLinkGen(!showLinkGen)}
              className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              {showLinkGen ? 'Close Link Gen' : '🔗 Link Generator'}
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="mt-4 md:mt-0 text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {showLinkGen && (
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mb-8 animate-in fade-in slide-in-from-top-4">
            <h3 className="text-lg font-bold text-blue-800 mb-4">Trackable Link Generator</h3>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-700 mb-1">Select Source</label>
                <select 
                  value={linkSource}
                  onChange={(e) => setLinkSource(e.target.value)}
                  className="w-full p-2 border border-blue-300 rounded-lg bg-white"
                >
                  <option value="instagram_post">Instagram Post</option>
                  <option value="instagram_story">Instagram Story</option>
                  <option value="whatsapp_status">WhatsApp Status</option>
                  <option value="facebook_ad">Facebook Ad</option>
                  <option value="google_search">Google Search</option>
                </select>
              </div>
              <button 
                onClick={generateLink}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Generate Link
              </button>
            </div>
            {customLink && (
              <div className="mt-4 p-3 bg-white border border-blue-200 rounded-lg flex justify-between items-center">
                <code className="text-sm text-blue-600 break-all">{customLink}</code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(customLink);
                    alert('Link Copied!');
                  }}
                  className="ml-4 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                >
                  Copy
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
            <p className="text-gray-500 text-[10px] uppercase font-bold">Total Enrollments</p>
            <h3 className="text-2xl font-bold">{stats?.totalEnrollments || 0}</h3>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
            <p className="text-gray-500 text-[10px] uppercase font-bold">Joined Students</p>
            <h3 className="text-2xl font-bold text-green-600">{getVisitStats().statusCounts.Joined || 0}</h3>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-orange-500">
            <p className="text-gray-500 text-[10px] uppercase font-bold">Pending Follow-up</p>
            <h3 className="text-2xl font-bold text-orange-600">
              {(getVisitStats().statusCounts.Pending || 0) + (getVisitStats().statusCounts.Called || 0)}
            </h3>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-purple-500">
            <p className="text-gray-500 text-[10px] uppercase font-bold">Total Shares</p>
            <h3 className="text-2xl font-bold text-purple-600">{stats?.totalShares || 0}</h3>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500">
            <p className="text-gray-500 text-[10px] uppercase font-bold">Contact Messages</p>
            <h3 className="text-2xl font-bold text-yellow-600">{stats?.totalContacts || 0}</h3>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-pink-500">
            <p className="text-gray-500 text-[10px] uppercase font-bold">Conversion Rate</p>
            <h3 className="text-2xl font-bold">
              {stats?.totalEnrollments > 0 
                ? Math.round((getVisitStats().statusCounts.Joined / stats.totalEnrollments) * 100) 
                : 0}%
            </h3>
          </div>
        </div>

        {/* Status Distribution Visual */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
          <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            📊 Enrollment Pipeline Status
          </h4>
          <div className="flex flex-col gap-4">
            {Object.entries(getVisitStats().statusCounts).map(([status, count]) => {
              const percentage = stats?.totalEnrollments > 0 ? (count / stats.totalEnrollments) * 100 : 0;
              const color = status === 'Joined' ? 'bg-green-500' :
                           status === 'Interested' ? 'bg-blue-500' :
                           status === 'Called' ? 'bg-yellow-500' :
                           status === 'Not Interested' ? 'bg-red-500' : 'bg-gray-400';
              
              return (
                <div key={status} className="w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-gray-600">{status}</span>
                    <span className="text-gray-500">{count} students ({Math.round(percentage)}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className={`${color} h-2 rounded-full transition-all duration-1000`} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search and Tabs Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="relative w-full md:w-64">
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            <input 
              type="text"
              placeholder="Search data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            {activeTab === 'materials' && (
              <button 
                onClick={() => setShowMaterialForm(!showMaterialForm)}
                className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center justify-center gap-2 shadow-md shadow-blue-100 transition-all active:scale-95"
              >
                {showMaterialForm ? '✕ Close Form' : '➕ Add New Note/PDF'}
              </button>
            )}

            <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
            {['enrollments', 'visits', 'shares', 'contacts', 'materials'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSearchTerm(''); }}
                className={`py-1.5 px-4 rounded-md text-sm font-medium capitalize transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-white text-green-600 shadow-sm' 
                    : 'text-gray-500 hover:text-green-600'
                }`}
              >
                {tab === 'contacts' ? `Contacts (${stats?.totalContacts || 0})` : tab}
              </button>
            ))}
          </div>
            
            {(activeTab === 'enrollments' || activeTab === 'visits' || activeTab === 'shares') && (
              <button 
                onClick={downloadCSV}
                className="w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 flex items-center justify-center gap-2 shadow-md shadow-green-100 transition-all active:scale-95"
              >
                📥 Download {activeTab === 'enrollments' ? 'Data' : activeTab === 'visits' ? 'Visits' : 'Shares'} CSV
              </button>
            )}
          </div>
        </div>
        
        {/* Material Creation Form */}
        {activeTab === 'materials' && showMaterialForm && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Upload New Note / PDF</h3>
            <form onSubmit={handleCreateMaterial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 12th Agriculture Imp Questions"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  value={newMaterial.category}
                  onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value})}
                >
                  <option value="Board Exam">Board Exam Preparation</option>
                  <option value="Notes">General Notes</option>
                  <option value="PDF">PDF Material</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                <textarea 
                  placeholder="Brief details about the material..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 h-20"
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Upload File (PDF or Image)</label>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <input 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    onChange={(e) => setNewMaterial({...newMaterial, file: e.target.files[0]})}
                  />
                  <div className="text-gray-400 text-xs font-bold px-4">OR</div>
                  <input 
                    type="url" 
                    placeholder="Paste your PDF link here (optional if file uploaded)"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    value={newMaterial.fileUrl}
                    onChange={(e) => setNewMaterial({...newMaterial, fileUrl: e.target.value})}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Note: Uploading a file will automatically generate a link. Max size: 10MB.</p>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="isPublished"
                  checked={newMaterial.isPublished}
                  onChange={(e) => setNewMaterial({...newMaterial, isPublished: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">Publish Immediately</label>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button 
                  type="submit"
                  disabled={uploading}
                  className={`bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 flex items-center gap-2 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    'Save & Upload'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden overflow-x-auto">
            {activeTab === 'enrollments' && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredData().map((user, idx) => (
                    <tr key={user._id || `user-${idx}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">{user.fullName || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{user.email || 'N/A'}</div>
                        {(user.instagramId) && (
                          <div className="text-[10px] font-bold text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded inline-block mt-1">
                            📸 @{user.instagramId}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.interested_Course || 'N/A'}</div>
                        <div className="text-xs text-gray-500">Class: {user.currentClass || 'N/A'}</div>
                        <div className="mt-1 flex items-center gap-1">
                          <span className="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded font-bold">
                            📍 {typeof user.location === 'object' ? (user.location.address || 'Unknown') : (user.location || 'Unknown')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{user.mobileNumber || 'N/A'}</div>
                        <div className="flex gap-2 mt-1">
                          <a href={`tel:${user.mobileNumber}`} className="text-blue-600 hover:text-blue-800 text-xs font-bold underline">Call</a>
                          <a href={`https://wa.me/91${user.mobileNumber}`} target="_blank" rel="noreferrer" className="text-green-600 hover:text-green-800 text-xs font-bold underline">WhatsApp</a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select 
                          value={user.status || 'Pending'}
                          onChange={(e) => updateStatus(user._id, e.target.value)}
                          className={`text-xs font-bold py-1 px-2 rounded-lg border-none focus:ring-2 focus:ring-green-500 ${
                            user.status === 'Joined' ? 'bg-green-100 text-green-700' :
                            user.status === 'Interested' ? 'bg-blue-100 text-blue-700' :
                            user.status === 'Called' ? 'bg-yellow-100 text-yellow-700' :
                            user.status === 'Not Interested' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Called">Called</option>
                          <option value="Interested">Interested</option>
                          <option value="Joined">Joined</option>
                          <option value="Not Interested">Not Interested</option>
                        </select>
                        <button 
                          onClick={() => deleteEnrollment(user._id)}
                          className="ml-2 text-red-400 hover:text-red-600 transition"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'visits' && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visitor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredData().map((v, idx) => (
                    <tr key={v._id || `visit-${idx}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{v.ip || 'Unknown'}</div>
                        <div className="text-[10px] text-gray-500">{v.deviceType || 'Desktop'} • {v.referrer || 'Direct'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {v.city || 'Unknown'}, {v.region || ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          v.distance < 50 ? 'bg-green-100 text-green-700' : 
                          v.distance < 200 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {v.distance ? `${v.distance} KM` : 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {v.pagePath || '/'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                        {v.createdAt ? new Date(v.createdAt).toLocaleString('en-IN') : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'shares' && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shared By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visitor IP</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredData().map((s, idx) => (
                    <tr key={s._id || `share-${idx}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          {s.userId?.fullName || 'Anonymous Visitor'}
                        </div>
                        {s.userId?.mobileNumber && (
                          <div className="text-xs text-green-600 font-medium">
                            📞 {s.userId.mobileNumber}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-bold">
                          {s.platform || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {s.visitorInfo?.ip || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                        {s.createdAt ? new Date(s.createdAt).toLocaleString('en-IN') : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'contacts' && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject/Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredData().map((c, idx) => (
                    <tr key={c._id || `contact-${idx}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">{c.name || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{c.email || 'N/A'}</div>
                        <div className="text-xs text-gray-500 font-medium">{c.phone || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs font-bold text-green-700 mb-1">{c.subject || 'No Subject'}</div>
                        <div className="text-sm text-gray-600 line-clamp-2 max-w-md">{c.message || 'No Message'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                        {c.createdAt ? new Date(c.createdAt).toLocaleString('en-IN') : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => deleteContact(c._id)}
                          className="text-red-400 hover:text-red-600 transition"
                          title="Delete Message"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'materials' && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Note Info</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Downloads</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredData().map((m, idx) => (
                    <tr key={m._id || `material-${idx}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">{m.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-1 max-w-xs">{m.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                          {m.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => toggleMaterialPublish(m._id, m.isPublished)}
                          className={`text-xs font-bold px-2 py-1 rounded-lg ${
                            m.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {m.isPublished ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-bold">
                        ⬇️ {m.downloadCount || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-3">
                        <a 
                          href={m.fileUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          👁️
                        </a>
                        <button 
                          onClick={() => deleteMaterial(m._id)}
                          className="text-red-400 hover:text-red-600 transition"
                          title="Delete Material"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {getFilteredData().length === 0 && (
              <div className="p-20 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-400">No records found</h3>
                <p className="text-gray-500">Try adjusting your search or switching tabs</p>
              </div>
            )}
          </div>
        )}
      </div>
    )}
  </div>
);
  };

export default Admin;
