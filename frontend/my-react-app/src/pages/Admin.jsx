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
  const [customLink, setCustomLink] = useState('');
  const [linkSource, setLinkSource] = useState('instagram');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
  const ADMIN_SECRET = 'pac-admin-2026'; // This should ideally be in .env but for simplicity

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === ADMIN_SECRET) {
      setIsAuthenticated(true);
      fetchStats();
    } else {
      setError('Invalid Passcode');
    }
  };

  const fetchStats = async (isAuto = false) => {
    if (!isAuto) setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/stats`, {
        headers: {
          'x-admin-secret': ADMIN_SECRET
        }
      });
      setStats(response.data);
      setLastUpdated(new Date());
      if (!isAuto) setLoading(false);
    } catch (err) {
      if (!isAuto) {
        setError('Failed to fetch data');
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
        `"${user.location || 'Unknown'}"`,
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
        `"${v.location || 'Unknown'}"`,
        `"${v.pagePath || '/'}"`,
        `"${v.referrer || 'Direct'}"`,
        `"${v.createdAt ? new Date(v.createdAt).toLocaleString('en-IN') : 'N/A'}"`
      ]);
      fileName = `PAC_Visits_${new Date().toLocaleDateString()}.csv`;
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
      const s = u.status || 'Pending';
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    });

    visits.forEach(v => {
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
  };

  const getFilteredData = () => {
    if (!stats) return [];
    const term = searchTerm.toLowerCase();
    
    if (activeTab === 'enrollments') {
      const enrollments = stats.enrollments || [];
      return enrollments.filter(u => 
        (u.fullName || '').toLowerCase().includes(term) || 
        (u.mobileNumber || '').includes(term) ||
        (u.interested_Course || '').toLowerCase().includes(term)
      );
    }
    if (activeTab === 'visits') {
      const visits = stats.visits || [];
      return visits.filter(v => 
        (v.ip || '').includes(term) || 
        (v.city && v.city.toLowerCase().includes(term)) ||
        (v.pagePath && v.pagePath.toLowerCase().includes(term))
      );
    }
    if (activeTab === 'shares') {
      const shares = stats.shares || [];
      return shares.filter(s => 
        (s.platform || '').toLowerCase().includes(term) ||
        (s.visitorInfo?.ip && s.visitorInfo.ip.includes(term))
      );
    }
    if (activeTab === 'contacts') {
      const contacts = stats.contacts || [];
      return contacts.filter(c => 
        (c.name || '').toLowerCase().includes(term) ||
        (c.email || '').toLowerCase().includes(term) ||
        (c.subject || '').toLowerCase().includes(term)
      );
    }
    return [];
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Access</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Enter Admin Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 pt-24">
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
            <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto">
            {['enrollments', 'visits', 'shares', 'contacts'].map((tab) => (
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
            
            {(activeTab === 'enrollments' || activeTab === 'visits') && (
              <button 
                onClick={downloadCSV}
                className="w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 flex items-center justify-center gap-2 shadow-md shadow-green-100 transition-all active:scale-95"
              >
                📥 Download {activeTab === 'enrollments' ? 'Data' : 'Visits'} CSV
              </button>
            )}
          </div>
        </div>

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
                            📍 {user.location || 'Unknown'}
                          </span>
                          {user.distance && (
                            <span className="text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded font-bold">
                              📏 {user.distance} KM
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{user.mobileNumber || 'N/A'}</div>
                        <div className="flex gap-2 mt-1">
                          {user.mobileNumber && (
                            <>
                              <a 
                                href={`tel:${user.mobileNumber}`}
                                className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-[10px]"
                                title="Call"
                              >
                                📞 Call
                              </a>
                              <a 
                                href={`https://wa.me/91${user.mobileNumber}?text=नमस्ते ${user.fullName}, PAC Barwaha में एनरोल करने के लिए धन्यवाद!`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors text-[10px]"
                                title="WhatsApp"
                              >
                                💬 WhatsApp
                              </a>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <select 
                            value={user.status || 'Pending'}
                            onChange={(e) => updateStatus(user._id, e.target.value)}
                            className={`text-[10px] font-bold px-2 py-1 rounded border border-gray-200 outline-none cursor-pointer ${
                              user.status === 'Joined' ? 'bg-green-100 text-green-800 border-green-200' :
                              user.status === 'Interested' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                              user.status === 'Called' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                              user.status === 'Not Interested' ? 'bg-red-100 text-red-800 border-red-200' :
                              'bg-gray-100 text-gray-800'
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
                            className="text-[10px] text-red-500 hover:text-red-700 font-bold text-left px-2"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'visits' && (
              <>
                {/* Visits Summary */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 border-b">
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      📱 Device Distribution
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {Object.entries(getVisitStats().devices).map(([device, count]) => (
                        <div key={device} className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                          <span className="text-xs text-gray-500 block uppercase font-bold">{device}</span>
                          <span className="text-xl font-bold text-gray-800">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      🔗 Referral Sources
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(getVisitStats().referrers)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 3)
                        .map(([source, count]) => (
                          <div key={source} className="flex justify-between items-center bg-white px-3 py-1.5 rounded border border-gray-100 shadow-sm">
                            <span className="text-xs font-medium text-purple-600 truncate max-w-[150px]">{source}</span>
                            <span className="text-xs font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">{count} visits</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      🔥 Most Visited Pages
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(getVisitStats().pages)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 3)
                        .map(([page, count]) => (
                          <div key={page} className="flex justify-between items-center bg-white px-3 py-1.5 rounded border border-gray-100 shadow-sm">
                            <span className="text-xs font-medium text-blue-600 truncate max-w-[150px]">{page}</span>
                            <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{count} hits</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visitor Info</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location/Device</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referral Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page/Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date/Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredData().map((visit, idx) => {
                    let metadata = {};
                    try {
                      if (typeof visit.metadata === 'string') {
                        metadata = JSON.parse(visit.metadata || '{}');
                      } else if (typeof visit.metadata === 'object' && visit.metadata !== null) {
                        metadata = visit.metadata;
                      }
                    } catch(e) {
                      console.error("Error parsing metadata:", e);
                    }

                    return (
                      <tr key={visit._id || `visit-${idx}`} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900">
                            {metadata.name || metadata.id || 'Anonymous'}
                          </div>
                          {metadata.ref && (
                            <div className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded inline-block mt-1 mr-2">
                              Referrer: {metadata.ref}
                            </div>
                          )}
                          {(metadata.insta || metadata.instagram) && (
                            <div className="text-[10px] font-bold text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded inline-block mt-1">
                              📸 Insta: @{metadata.insta || metadata.instagram}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">{visit.ip || 'Unknown IP'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {visit.city || 'Unknown'}, {visit.region || 'Unknown'}
                          </div>
                          <div className="flex flex-wrap items-center gap-1 mt-1">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-bold border border-gray-200">
                              {visit.deviceType || 'Desktop'}
                            </span>
                            {visit.distance && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-50 text-orange-600 font-bold border border-orange-100">
                                📏 {visit.distance} KM
                              </span>
                            )}
                            {visit.location && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 font-bold border border-purple-100">
                                📍 {visit.location}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs font-medium text-gray-700 max-w-[150px] break-words">
                            {visit.referrer && visit.referrer !== 'Direct Visit' ? (
                              <span className="text-purple-600 italic">
                                {visit.referrer.length > 50 ? visit.referrer.substring(0, 50) + '...' : visit.referrer}
                              </span>
                            ) : (
                              <span className="text-gray-400">Direct Visit</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-blue-600 truncate max-w-[150px]">
                            {visit.pagePath || '/'}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">{visit.platform || 'Direct'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {visit.createdAt ? new Date(visit.createdAt).toLocaleString('en-IN') : 'N/A'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'shares' && (
            <>
              <div className="p-4 bg-purple-50 border-b border-purple-100 flex justify-between items-center">
                <h3 className="text-sm font-bold text-purple-800 flex items-center gap-2">
                  📢 Website Share Activity
                </h3>
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  Total Shares: {stats?.totalShares || 0}
                </span>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date/Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredData().map((share, idx) => (
                    <tr key={share._id || `share-${idx}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">{share.platform || 'Unknown'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{share.visitorInfo?.ip || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                        {share.visitorInfo?.userAgent || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {share.createdAt ? new Date(share.createdAt).toLocaleString('en-IN') : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'contacts' && (
            <>
              <div className="p-4 bg-yellow-50 border-b border-yellow-100 flex justify-between items-center">
                <h3 className="text-sm font-bold text-yellow-800 flex items-center gap-2">
                  📩 Contact Messages
                </h3>
                <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  Total Messages: {stats?.totalContacts || 0}
                </span>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredData().map((contact, idx) => (
                    <tr key={contact._id || `contact-${idx}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">{contact.name}</div>
                        <div className="text-xs text-gray-500">{contact.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-800 font-medium">{contact.subject}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-gray-600 max-w-xs whitespace-pre-wrap">{contact.message}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => deleteContact(contact._id)}
                          className="text-red-600 hover:text-red-900 text-xs font-bold"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.createdAt ? new Date(contact.createdAt).toLocaleString('en-IN') : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default Admin;
