'use client';

import { useState } from 'react';
import Link from 'next/link';
import { alertsData } from '@/lib/data';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const activeAlerts = alertsData.filter(alert => alert.isActive).slice(0, 3);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-building-line text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-gray-900">CityPulse</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">
              Dashboard
            </Link>
            <Link href="/citizen" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">
              Citizen Portal
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">
              Projects
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">
              Admin
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 relative cursor-pointer"
              >
                <i className="ri-notification-3-line text-xl"></i>
                {activeAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {activeAlerts.length}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Alerts</h3>
                    <div className="space-y-3">
                      {activeAlerts.map(alert => (
                        <div key={alert.id} className="p-3 bg-gray-50 rounded-lg">
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
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <i className="ri-user-line text-xl"></i>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <i className="ri-information-line mr-2"></i>About
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <i className="ri-settings-line mr-2"></i>Settings
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <i className="ri-question-line mr-2"></i>Help
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <nav className="space-y-1">
              <Link
                href="/"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/citizen"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Citizen Portal
              </Link>
              <Link
                href="/projects"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/admin"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}