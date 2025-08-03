
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { issuesData, projectsData, alertsData } from '@/lib/data';

export default function AdminDashboard() {
  const [issues, setIssues] = useState(issuesData);
  const [projects, setProjects] = useState(projectsData);
  const [alerts, setAlerts] = useState(alertsData);
  const [activeTab, setActiveTab] = useState('issues');
  const [showNewAlert, setShowNewAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: '',
    description: '',
    area: '',
    type: 'maintenance',
    severity: 'Medium'
  });

  const updateIssueStatus = (issueId: number, newStatus: string) => {
    setIssues(issues.map(issue => 
      issue.id === issueId ? { ...issue, status: newStatus } : issue
    ));
  };

  const updateProjectProgress = (projectId: number, newProgress: number, newStatus?: string) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            progress: newProgress,
            ...(newStatus && { status: newStatus })
          } 
        : project
    ));
  };

  const addNewAlert = () => {
    if (!newAlert.title || !newAlert.description || !newAlert.area) return;

    const alert = {
      id: alerts.length + 1,
      ...newAlert,
      dateCreated: new Date().toISOString().split('T')[0],
      timeCreated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isActive: true
    };

    setAlerts([alert, ...alerts]);
    setNewAlert({ title: '', description: '', area: '', type: 'maintenance', severity: 'Medium' });
    setShowNewAlert(false);
  };

  const toggleAlertStatus = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const areas = ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5'];
  const alertTypes = ['maintenance', 'traffic', 'emergency', 'infrastructure', 'event'];
  const severityLevels = ['Low', 'Medium', 'High'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Manage city operations and updates</p>
        </div>

        {/* Tab Navigation - Responsive */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-2 sm:space-x-8 px-4 sm:px-6 overflow-x-auto">
              {[
                { id: 'issues', name: 'Issues', fullName: 'Issue Management', icon: 'ri-file-list-3-line' },
                { id: 'projects', name: 'Projects', fullName: 'Project Updates', icon: 'ri-building-line' },
                { id: 'alerts', name: 'Alerts', fullName: 'Alert Management', icon: 'ri-alarm-warning-line' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap cursor-pointer min-w-0 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} mr-1 sm:mr-2 text-sm sm:text-base`}></i>
                  <span className="hidden sm:inline">{tab.fullName}</span>
                  <span className="sm:hidden">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Issues Management */}
          {activeTab === 'issues' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Issue Management</h2>
              
              <div className="overflow-x-auto">
                <div className="grid gap-4 sm:hidden">
                  {issues.map(issue => (
                    <div key={issue.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{issue.category}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          issue.priority === 'High' ? 'bg-red-100 text-red-800' :
                          issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {issue.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{issue.area} - {issue.name}</p>
                      <p className="text-sm text-gray-700 mb-3">{issue.description}</p>
                      <div className="flex flex-col gap-2">
                        <span className={`self-start inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          issue.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {issue.status}
                        </span>
                        <div className="flex gap-2">
                          {issue.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => updateIssueStatus(issue.id, 'In Progress')}
                                className="flex-1 bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => updateIssueStatus(issue.id, 'Rejected')}
                                className="flex-1 bg-red-600 text-white py-1 px-3 rounded text-sm hover:bg-red-700 cursor-pointer whitespace-nowrap"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {issue.status === 'In Progress' && (
                            <button
                              onClick={() => updateIssueStatus(issue.id, 'Resolved')}
                              className="flex-1 bg-green-600 text-white py-1 px-3 rounded text-sm hover:bg-green-700 cursor-pointer whitespace-nowrap"
                            >
                              Mark Resolved
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <table className="hidden sm:table min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {issues.map(issue => (
                      <tr key={issue.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="font-medium">{issue.category}</div>
                          <div className="text-gray-600 max-w-xs truncate" title={issue.description}>
                            {issue.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.area}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            issue.priority === 'High' ? 'bg-red-100 text-red-800' :
                            issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {issue.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            issue.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            issue.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {issue.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            {issue.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => updateIssueStatus(issue.id, 'In Progress')}
                                  className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => updateIssueStatus(issue.id, 'Rejected')}
                                  className="text-red-600 hover:text-red-900 cursor-pointer whitespace-nowrap"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {issue.status === 'In Progress' && (
                              <button
                                onClick={() => updateIssueStatus(issue.id, 'Resolved')}
                                className="text-green-600 hover:text-green-900 cursor-pointer whitespace-nowrap"
                              >
                                Resolve
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Projects Management - Enhanced Responsiveness */}
          {activeTab === 'projects' && (
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Project Updates</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {projects.map(project => (
                  <div key={project.id} className="bg-gray-50 rounded-lg p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-2 sm:space-y-0">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 pr-2">{project.name}</h3>
                      <span className={`self-start inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                        project.status === 'Planned' ? 'bg-gray-100 text-gray-800' :
                        project.status === 'Planning' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                    {/* Progress Update - Mobile Optimized */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-700 font-medium">Progress</span>
                        <span className="font-bold text-gray-900 bg-white px-2 py-1 rounded text-base">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      
                      {/* Mobile-Friendly Progress Controls */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Adjust Progress
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={project.progress}
                            onChange={(e) => updateProjectProgress(project.id, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${project.progress}%, #E5E7EB ${project.progress}%, #E5E7EB 100%)`
                            }}
                          />
                        </div>
                        <div className="flex items-center space-x-3">
                          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Set Value:
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={project.progress}
                              onChange={(e) => updateProjectProgress(project.id, parseInt(e.target.value) || 0)}
                              className="w-20 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-medium"
                            />
                            <span className="text-sm text-gray-500">%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status Update - Mobile Optimized */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Status
                      </label>
                      <div className="relative">
                        <select
                          value={project.status}
                          onChange={(e) => updateProjectProgress(project.id, project.progress, e.target.value)}
                          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white font-medium"
                        >
                          <option value="Planned"> Planned</option>
                          <option value="Planning"> Planning</option>
                          <option value="Ongoing"> Ongoing</option>
                          <option value="Completed"> Completed</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
                          <i className="ri-arrow-down-s-line text-gray-400 text-lg"></i>
                        </div>
                      </div>
                    </div>

                    {/* Project Details - Mobile Stacked Layout */}
                    <div className="bg-white rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex flex-col">
                          <span className="text-gray-500 font-medium">Department</span>
                          <span className="text-gray-900 font-semibold">{project.department}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-500 font-medium">Area</span>
                          <span className="text-gray-900 font-semibold">{project.area}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-500 font-medium">Budget</span>
                          <span className="text-gray-900 font-semibold">₹{project.budget || '2.5M'}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-500 font-medium">Priority</span>
                          <span className={`self-start inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            project.priority === 'High' ? 'bg-red-100 text-red-800' :
                            project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {project.priority || 'Medium'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alerts Management - Enhanced Responsiveness */}
          {activeTab === 'alerts' && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Alert Management</h2>
                <button
                  onClick={() => setShowNewAlert(true)}
                  className="bg-blue-600 text-white py-3 px-4 sm:py-2 sm:px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer whitespace-nowrap text-sm font-medium w-full sm:w-auto"
                >
                  <i className="ri-add-line mr-2"></i>
                  Add New Alert
                </button>
              </div>

              {/* New Alert Form - Mobile Optimized */}
              {showNewAlert && (
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Alert</h3>
                  <div className="space-y-4">
                    {/* Title Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alert Title *
                      </label>
                      <input
                        type="text"
                        value={newAlert.title}
                        onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Enter alert title"
                      />
                    </div>

                    {/* Area and Type - Stacked on Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Area *
                        </label>
                        <div className="relative">
                          <select
                            value={newAlert.area}
                            onChange={(e) => setNewAlert({ ...newAlert, area: e.target.value })}
                            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white"
                          >
                            <option value="">Select Area</option>
                            {areas.map(area => (
                              <option key={area} value={area}>{area}</option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
                            <i className="ri-arrow-down-s-line text-gray-400 text-lg"></i>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alert Type
                        </label>
                        <div className="relative">
                          <select
                            value={newAlert.type}
                            onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
                            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white capitalize"
                          >
                            {alertTypes.map(type => (
                              <option key={type} value={type} className="capitalize">{type}</option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center pointer-events-none">
                            <i className="ri-arrow-down-s-line text-gray-400 text-lg"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Severity Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Severity Level
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {severityLevels.map(severity => (
                          <button
                            key={severity}
                            type="button"
                            onClick={() => setNewAlert({ ...newAlert, severity })}
                            className={`py-3 px-4 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap transition-colors ${
                              newAlert.severity === severity
                                ? severity === 'High' ? 'bg-red-500 text-white' :
                                  severity === 'Medium' ? 'bg-yellow-500 text-white' :
                                  'bg-green-500 text-white'
                                : severity === 'High' ? 'bg-red-50 text-red-700 hover:bg-red-100' :
                                  severity === 'Medium' ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' :
                                  'bg-green-50 text-green-700 hover:bg-green-100'
                            }`}
                          >
                            {severity}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={newAlert.description}
                        onChange={(e) => {
                          if (e.target.value.length <= 500) {
                            setNewAlert({ ...newAlert, description: e.target.value });
                          }
                        }}
                        rows={4}
                        maxLength={500}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                        placeholder="Enter alert description (max 500 characters)"
                      />
                      <div className="text-right text-xs text-gray-500 mt-1">
                        {newAlert.description.length}/500 characters
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                      <button
                        onClick={addNewAlert}
                        disabled={!newAlert.title || !newAlert.description || !newAlert.area}
                        className="flex-1 sm:flex-none bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap font-medium transition-colors"
                      >
                        <i className="ri-check-line mr-2"></i>
                        Create Alert
                      </button>
                      <button
                        onClick={() => {
                          setShowNewAlert(false);
                          setNewAlert({ title: '', description: '', area: '', type: 'maintenance', severity: 'Medium' });
                        }}
                        className="flex-1 sm:flex-none bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 cursor-pointer whitespace-nowrap font-medium transition-colors"
                      >
                        <i className="ri-close-line mr-2"></i>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Alerts List - Mobile Optimized */}
              <div className="space-y-4">
                {alerts.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                    <i className="ri-alarm-warning-line text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-500">No alerts created yet</p>
                  </div>
                ) : (
                  alerts.map(alert => (
                    <div key={alert.id} className={`rounded-lg p-4 sm:p-6 border transition-colors ${
                      alert.isActive 
                        ? 'bg-white border-gray-200 shadow-sm' 
                        : 'bg-gray-50 border-gray-300'
                    }`}>
                      {/* Alert Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                        <div className="flex-1 mb-3 sm:mb-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mr-2">
                              {alert.title}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              alert.severity === 'High' ? 'bg-red-100 text-red-800' :
                              alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {alert.severity}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              alert.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              <div className={`w-2 h-2 rounded-full mr-1.5 ${
                                alert.isActive ? 'bg-green-500' : 'bg-gray-400'
                              }`}></div>
                              {alert.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => toggleAlertStatus(alert.id)}
                            className={`py-2 px-4 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap transition-colors min-w-[100px] ${
                              alert.isActive 
                                ? 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-200' 
                                : 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-200'
                            }`}
                          >
                            <i className={`mr-2 ${alert.isActive ? 'ri-pause-circle-line' : 'ri-play-circle-line'}`}></i>
                            {alert.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </div>

                      {/* Alert Description */}
                      <p className="text-gray-700 mb-4 leading-relaxed">{alert.description}</p>

                      {/* Alert Metadata */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center">
                            <i className="ri-map-pin-line text-gray-400 mr-2 flex-shrink-0"></i>
                            <div className="min-w-0">
                              <div className="text-gray-500 text-xs">Area</div>
                              <div className="font-medium text-gray-900 truncate">{alert.area}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-price-tag-3-line text-gray-400 mr-2 flex-shrink-0"></i>
                            <div className="min-w-0">
                              <div className="text-gray-500 text-xs">Type</div>
                              <div className="font-medium text-gray-900 truncate capitalize">{alert.type}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-calendar-line text-gray-400 mr-2 flex-shrink-0"></i>
                            <div className="min-w-0">
                              <div className="text-gray-500 text-xs">Created</div>
                              <div className="font-medium text-gray-900">{alert.dateCreated}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-time-line text-gray-400 mr-2 flex-shrink-0"></i>
                            <div className="min-w-0">
                              <div className="text-gray-500 text-xs">Time</div>
                              <div className="font-medium text-gray-900">{alert.timeCreated}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Custom CSS for better mobile experience */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        @media (max-width: 640px) {
          .slider::-webkit-slider-thumb {
            height: 24px;
            width: 24px;
          }
          
          .slider::-moz-range-thumb {
            height: 24px;
            width: 24px;
          }
        }
      `}</style>
    </div>
  );
}
