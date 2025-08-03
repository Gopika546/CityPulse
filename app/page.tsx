'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import CityMap from '@/components/CityMap';
import { issuesData, alertsData, projectsData } from '@/lib/data';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalIssues = issuesData.length;
  const pendingIssues = issuesData.filter(issue => issue.status === 'Pending').length;
  const inProgressIssues = issuesData.filter(issue => issue.status === 'In Progress').length;
  const resolvedIssues = issuesData.filter(issue => issue.status === 'Resolved').length;
  const activeAlerts = alertsData.filter(alert => alert.isActive).length;
  const ongoingProjects = projectsData.filter(project => project.status === 'Ongoing').length;

  const budgetData = [
    { name: 'Transportation', value: 50000000, color: '#3B82F6' },
    { name: 'Traffic Management', value: 15000000, color: '#EF4444' },
    { name: 'Water Department', value: 8000000, color: '#10B981' },
    { name: 'Electricity', value: 3500000, color: '#F59E0B' },
    { name: 'Parks & Recreation', value: 2500000, color: '#8B5CF6' }
  ];

  const issuesByDepartment = [
    { name: 'Sanitation', count: 1 },
    { name: 'Electricity', count: 1 },
    { name: 'Public Works', count: 1 },
    { name: 'Traffic Management', count: 1 },
    { name: 'Water Department', count: 1 }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">City Dashboard</h1>
          <p className="mt-2 text-gray-600">Real-time overview of city operations and services</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <StatCard
            title="Total Issues"
            value={totalIssues}
            icon="ri-file-list-3-line"
            color="blue"
          />
          <StatCard
            title="Pending"
            value={pendingIssues}
            icon="ri-time-line"
            color="yellow"
          />
          <StatCard
            title="In Progress"
            value={inProgressIssues}
            icon="ri-settings-line"
            color="blue"
          />
          <StatCard
            title="Resolved"
            value={resolvedIssues}
            icon="ri-checkbox-circle-line"
            color="green"
          />
          <StatCard
            title="Active Alerts"
            value={activeAlerts}
            icon="ri-alarm-warning-line"
            color="red"
          />
          <StatCard
            title="Ongoing Projects"
            value={ongoingProjects}
            icon="ri-building-line"
            color="purple"
          />
        </div>

        {/* Charts and Map Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Budget Distribution Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Budget Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* City Map */}
          <CityMap />
        </div>

        {/* Issues by Department Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues by Department</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={issuesByDepartment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Issues */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Issues</h3>
            <div className="space-y-4">
              {issuesData.slice(0, 5).map(issue => (
                <div key={issue.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    issue.status === 'Pending' ? 'bg-yellow-500' :
                    issue.status === 'In Progress' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{issue.category} - {issue.area}</p>
                    <p className="text-sm text-gray-600 truncate">{issue.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{issue.dateSubmitted}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                    issue.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {issue.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Alerts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h3>
            <div className="space-y-4">
              {alertsData.filter(alert => alert.isActive).slice(0, 5).map(alert => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full ${
                    alert.severity === 'High' ? 'bg-red-100 text-red-600' :
                    alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <i className="ri-alert-line text-sm"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="text-xs text-gray-500">{alert.area}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        alert.severity === 'High' ? 'bg-red-100 text-red-800' :
                        alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}