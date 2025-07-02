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
  X,
  GraduationCap,
  Calculator,
  Scan,
  Headphones,
  Layers,
  MessageSquare,
  Zap,
  Globe,
  ChevronRight,
  Sparkles
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
    { name: 'Dashboard', href: '/dashboard', icon: Home, description: 'Overview & Health Summary' },
    { name: 'Health Metrics', href: '/health', icon: Activity, description: 'Vital Signs & Trends' },
    { name: 'Vision Games', href: '/games', icon: Gamepad2, description: 'Interactive Eye Training' },
    { name: 'VR Therapy', href: '/vr-therapy', icon: Headphones, description: 'Immersive Rehabilitation' },
    { name: 'Appointments', href: '/appointments', icon: Calendar, description: 'Schedule & Consultations' },
    { name: 'Medical Records', href: '/records', icon: FileText, description: 'Health History & Reports' },
    { name: 'AI Analysis', href: '/ai-analysis', icon: Brain, description: 'Intelligent Health Insights' },
    { name: 'Digital Twin', href: '/digital-twin', icon: Layers, description: 'Personalized Health Model' },
  ];

  const doctorNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, description: 'Clinical Overview' },
    { name: 'Patients', href: '/patients', icon: Users, description: 'Patient Management' },
    { name: 'Diagnostics', href: '/diagnostics', icon: Calculator, description: 'Clinical Calculations' },
    { name: 'AI Tools', href: '/ai-tools', icon: Scan, description: 'AI-Powered Analysis' },
    { name: 'Surgical Analytics', href: '/analytics', icon: BarChart3, description: 'Performance Metrics' },
    { name: 'Test Results', href: '/test-results', icon: TestTube, description: 'Laboratory & Imaging' },
    { name: 'Telemedicine', href: '/telemedicine', icon: Video, description: 'Remote Consultations' },
    { name: 'Digital Twin', href: '/digital-twin', icon: Layers, description: 'Patient Modeling' },
    { name: 'Research', href: '/research', icon: BookOpen, description: 'Clinical Research' },
  ];

  const aiAdvancedNavigation = [
    { 
      name: 'EyeGPT Assistant', 
      href: '/eyegpt', 
      icon: MessageSquare, 
      description: 'AI Clinical Co-pilot',
      badge: 'NEW',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'AR Surgical Overlay', 
      href: '/surgical-overlay', 
      icon: Zap, 
      description: 'Augmented Reality Surgery',
      badge: 'BETA',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'VR Vision Therapy', 
      href: '/vr-therapy', 
      icon: Headphones, 
      description: 'Immersive Rehabilitation',
      badge: 'PRO',
      gradient: 'from-green-500 to-emerald-500'
    },
  ];

  const commonNavigation = [
    { name: 'Vision Charts', href: '/advanced', icon: Eye, description: 'WHO-Compliant Charts' },
    { name: 'Case Studies', href: '/education', icon: GraduationCap, description: 'Medical Education' },
    { name: 'ABDM Compliance', href: '/compliance', icon: Globe, description: 'India Digital Health' },
    { name: 'Security', href: '/security', icon: Shield, description: 'Data Protection' },
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
              className="medical-backdrop"
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
          "fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700 lg:translate-x-0 lg:static lg:inset-0",
          "lg:block shadow-elevation-3 lg:shadow-none"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile header */}
          <div className="flex items-center justify-between p-medical-md lg:hidden border-b border-neutral-200 dark:border-neutral-700">
            <span className="text-medical-lg font-medium text-neutral-900 dark:text-neutral-100">
              Navigation
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-medical-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-medical-md pb-medical-md space-y-medical-sm overflow-y-auto">
            {/* Main Navigation */}
            <div className="space-y-1 pt-medical-md">
              <h3 className="px-medical-sm text-medical-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-medical-sm">
                Main
              </h3>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "medical-nav-item group relative overflow-hidden",
                      isActive && "active bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 text-primary-700 dark:text-primary-300"
                    )}
                  >
                    <div className="flex items-center space-x-medical-sm relative z-10">
                      <item.icon
                        className={cn(
                          "h-5 w-5 transition-colors duration-200",
                          isActive
                            ? "text-primary-600 dark:text-primary-400"
                            : "text-neutral-400 group-hover:text-primary-500 dark:group-hover:text-primary-400"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-medical-sm font-medium truncate">
                          {item.name}
                        </div>
                        <div className="text-medical-xs text-neutral-500 dark:text-neutral-400 truncate">
                          {item.description}
                        </div>
                      </div>
                      {isActive && (
                        <ChevronRight className="h-4 w-4 text-primary-500" />
                      )}
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-r-full"
                        initial={false}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* AI & Advanced Features */}
            <div className="pt-medical-lg">
              <h3 className="px-medical-sm text-medical-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-medical-sm flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                AI & Advanced
              </h3>
              <div className="space-y-1">
                {aiAdvancedNavigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group relative overflow-hidden rounded-medical-lg p-medical-sm transition-all duration-200",
                        isActive
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-elevation-2`
                          : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                      )}
                    >
                      <div className="flex items-center space-x-medical-sm relative z-10">
                        <div className={cn(
                          "p-2 rounded-medical-md transition-all duration-200",
                          isActive 
                            ? "bg-white/20" 
                            : "bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700"
                        )}>
                          <item.icon
                            className={cn(
                              "h-4 w-4 transition-colors duration-200",
                              isActive
                                ? "text-white"
                                : "text-neutral-600 dark:text-neutral-400"
                            )}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className={cn(
                              "text-medical-sm font-medium truncate",
                              isActive ? "text-white" : "text-neutral-900 dark:text-neutral-100"
                            )}>
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className={cn(
                                "px-1.5 py-0.5 text-medical-xs font-medium rounded-full",
                                isActive 
                                  ? "bg-white/20 text-white" 
                                  : "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                              )}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className={cn(
                            "text-medical-xs truncate",
                            isActive ? "text-white/80" : "text-neutral-500 dark:text-neutral-400"
                          )}>
                            {item.description}
                          </div>
                        </div>
                      </div>
                      {!isActive && (
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-200 rounded-medical-lg`} />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Tools & Compliance */}
            <div className="pt-medical-lg">
              <h3 className="px-medical-sm text-medical-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-medical-sm">
                Tools & Compliance
              </h3>
              <div className="space-y-1">
                {commonNavigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "medical-nav-item group",
                        isActive && "active"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 transition-colors duration-200",
                          isActive
                            ? "text-primary-600 dark:text-primary-400"
                            : "text-neutral-400 group-hover:text-primary-500 dark:group-hover:text-primary-400"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-medical-sm font-medium truncate">
                          {item.name}
                        </div>
                        <div className="text-medical-xs text-neutral-500 dark:text-neutral-400 truncate">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* User info */}
          <div className="p-medical-md border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
            <div className="flex items-center space-x-medical-sm">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-700"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center ring-2 ring-neutral-200 dark:ring-neutral-700">
                  <span className="text-medical-sm font-medium text-white">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-medical-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                  {user?.name}
                </p>
                <p className="text-medical-xs text-neutral-500 dark:text-neutral-400 capitalize truncate">
                  {user?.role} • Online
                </p>
              </div>
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}