import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  Bell, 
  Settings, 
  LogOut, 
  User,
  Menu,
  X,
  Search,
  HelpCircle
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notifications = [
    {
      id: 1,
      title: 'New Test Results',
      message: 'OCT scan results are ready for review',
      time: '5 min ago',
      type: 'info',
      unread: true
    },
    {
      id: 2,
      title: 'Appointment Reminder',
      message: 'Patient consultation in 30 minutes',
      time: '25 min ago',
      type: 'warning',
      unread: true
    },
    {
      id: 3,
      title: 'System Update',
      message: 'NeuroVision AI has been updated to v2.1',
      time: '2 hours ago',
      type: 'success',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="medical-card sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md">
      <div className="px-medical-md sm:px-medical-lg lg:px-medical-xl">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center space-x-medical-md">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-medical-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden transition-all duration-200"
            >
              <motion.div
                animate={{ rotate: sidebarOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </button>
            
            <Link to="/" className="flex items-center ml-4 lg:ml-0 group">
              <div className="flex items-center">
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Eye className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors duration-200" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse" />
                  </motion.div>
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-medium bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    NeuroVision AI
                  </h1>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    Advanced Eye Health Platform
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-medical-xl">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search patients, records, or procedures..."
                className="medical-input pl-10 pr-4 py-2 w-full text-medical-sm"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {/* Search button for mobile */}
            <button className="md:hidden p-2 text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-medical-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200">
              <Search className="h-5 w-5" />
            </button>

            {/* Help */}
            <button className="p-2 text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-medical-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200">
              <HelpCircle className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-medical-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-error-500 text-white text-xs font-medium flex items-center justify-center"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 medical-card-elevated max-h-96 overflow-y-auto z-50"
                  >
                    <div className="p-medical-md border-b border-neutral-200 dark:border-neutral-700">
                      <h3 className="text-medical-lg font-medium text-neutral-900 dark:text-neutral-100">
                        Notifications
                      </h3>
                    </div>
                    <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-medical-md hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-200">
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.unread ? 'bg-primary-500' : 'bg-neutral-300'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-medical-sm font-medium text-neutral-900 dark:text-neutral-100">
                                {notification.title}
                              </p>
                              <p className="text-medical-xs text-neutral-600 dark:text-neutral-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-medical-xs text-neutral-500 dark:text-neutral-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-medical-md border-t border-neutral-200 dark:border-neutral-700">
                      <button className="w-full text-center text-medical-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <button className="p-2 text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-medical-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200">
              <Settings className="h-5 w-5" />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-medical-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center ring-2 ring-neutral-200 dark:ring-neutral-700">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className="hidden md:block text-left">
                  <p className="text-medical-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {user?.name}
                  </p>
                  <p className="text-medical-xs text-neutral-500 dark:text-neutral-400 capitalize">
                    {user?.role}
                  </p>
                </div>
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 medical-card-elevated z-50"
                  >
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-medical-md py-2 text-medical-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-medical-md py-2 text-medical-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </Link>
                      <div className="border-t border-neutral-100 dark:border-neutral-700 my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-medical-md py-2 text-medical-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}