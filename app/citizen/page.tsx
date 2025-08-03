'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { issuesData, alertsData } from '@/lib/data';

export default function CitizenPortal() {
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    category: '',
    description: '',
    image: null as File | null
  });
  const [subscribedAreas, setSubscribedAreas] = useState<string[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [submittedIssues, setSubmittedIssues] = useState(issuesData);

  const areas = ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5'];
  const categories = ['Road Maintenance', 'Waste Management', 'Water Supply', 'Electricity', 'Traffic', 'Infrastructure', 'Parks & Recreation'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.description.length > 500) {
      alert('Description cannot exceed 500 characters');
      return;
    }

    const newIssue = {
      id: submittedIssues.length + 1,
      name: formData.name,
      area: formData.area,
      category: formData.category,
      description: formData.description,
      status: 'Pending',
      dateSubmitted: new Date().toISOString().split('T')[0],
      priority: 'Medium',
      department: formData.category === 'Road Maintenance' ? 'Public Works' : 
                   formData.category === 'Waste Management' ? 'Sanitation' : 
                   formData.category === 'Water Supply' ? 'Water Department' : 
                   formData.category === 'Electricity' ? 'Electricity' : 
                   formData.category === 'Traffic' ? 'Traffic Management' : 'General'
    };

    setSubmittedIssues([newIssue, ...submittedIssues]);
    setFormData({ name: '', area: '', category: '', description: '', image: null });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const toggleAreaSubscription = (area: string) => {
    if (subscribedAreas.includes(area)) {
      setSubscribedAreas(subscribedAreas.filter(a => a !== area));
    } else {
      setSubscribedAreas([...subscribedAreas, area]);
    }
  };

  const relevantAlerts = alertsData.filter(alert => 
    subscribedAreas.includes(alert.area) && alert.isActive
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Citizen Portal</h1>
          <p className="mt-2 text-gray-600">Report issues and stay informed about your area</p>
        </div>

        {showSuccessMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">Issue submitted successfully! We'll review it soon.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Issue Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Report an Issue</h2>
            
            <form id="issue-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                  Area/Sector *
                </label>
                <div className="relative">
                  <select
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
                  >
                    <option value="">Select Area</option>
                    {areas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                    <i className="ri-arrow-down-s-line text-gray-500"></i>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                    <i className="ri-arrow-down-s-line text-gray-500"></i>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description * (Max 500 characters)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  maxLength={500}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Describe the issue in detail..."
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/500 characters
                </div>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image (Optional)
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {formData.image && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected: {formData.image.name}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors whitespace-nowrap cursor-pointer"
              >
                Submit Issue
              </button>
            </form>
          </div>

          {/* Alert Subscriptions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscribe to Area Alerts</h2>
              
              <div className="space-y-2">
                {areas.map(area => (
                  <label key={area} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subscribedAreas.includes(area)}
                      onChange={() => toggleAreaSubscription(area)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                    />
                    <span className="text-sm text-gray-700">{area}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Relevant Alerts */}
            {relevantAlerts.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Area Alerts</h3>
                <div className="space-y-3">
                  {relevantAlerts.map(alert => (
                    <div key={alert.id} className="p-3 border-l-4 border-blue-500 bg-blue-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
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
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submitted Issues List */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Submitted Issues</h2>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid gap-4 p-6 sm:hidden">
                {submittedIssues.map(issue => (
                  <div key={issue.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{issue.category}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                        issue.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {issue.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{issue.area}</p>
                    <p className="text-sm text-gray-700 mb-2">{issue.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>By: {issue.name}</span>
                      <span>{issue.dateSubmitted}</span>
                    </div>
                  </div>
                ))}
              </div>

              <table className="hidden sm:table min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submittedIssues.map(issue => (
                    <tr key={issue.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="max-w-xs truncate" title={issue.description}>
                          {issue.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.area}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          issue.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {issue.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.dateSubmitted}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}