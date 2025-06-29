import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Activity,
  Gamepad2,
  Calendar,
  FileText,
  Users,
  Brain,
  Shield,
  BarChart3,
  Stethoscope,
  Eye,
  TestTube,
  Video,
  BookOpen,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuthStore();

  const patientNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Health Metrics', href: '/health', icon: Activity },
    { name: 'Vision Games', href: '/games', icon: Gamepad2 },
    { name: 'Appointments', href: '/appointments', icon: Calendar },
    { name: 'Medical Records', href: '/records', icon: FileText },
    { name: 'AI Analysis', href: '/ai-analysis', icon: Brain },
  ];

  const doctorNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'Diagnostics', href: '/diagnostics', icon: Stethoscope },
    { name: 'AI Tools', href: '/ai-tools', icon: Brain },
    { name: 'Test Results', href: '/test-results', icon: TestTube },
    { name: 'Telemedicine', href: '/telemedicine', icon: Video },
    { name: 'Research', href: '/research', icon: BookOpen },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  const commonNavigation = [
    { name: 'Advanced Tools', href: '/advanced', icon: Eye },
    { name: 'Security', href: '/security', icon: Shield },
  ];

  const navigation = user?.role === 'doctor' ? doctorNavigation : patientNavigation;

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: open ? 0 : -320,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 lg:translate-x-0 lg:static lg:inset-0",
          "lg:block"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Navigation
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary-500 to-medical-500 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 transition-colors",
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                      )}
                    />
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                        initial={false}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Common navigation */}
            <div className="pt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Advanced Features
              </h3>
              <div className="mt-2 space-y-1">
                {commonNavigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-primary-500 to-medical-500 text-white shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "mr-3 h-5 w-5 transition-colors",
                          isActive
                            ? "text-white"
                            : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                        )}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-medical-500 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}