import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Mail, Lock, AlertCircle, Loader2, Shield, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [error, setError] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 dark:bg-secondary-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-primary-100 dark:bg-primary-900/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto h-20 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-medical-xl flex items-center justify-center mb-medical-lg shadow-elevation-3"
          >
            <Eye className="h-10 w-10 text-white" />
          </motion.div>
          <h2 className="text-medical-3xl font-medium text-neutral-900 dark:text-neutral-100">
            Welcome to NeuroVision AI
          </h2>
          <p className="mt-2 text-medical-base text-neutral-600 dark:text-neutral-400">
            Advanced Eye Health Platform
          </p>
          <div className="flex items-center justify-center space-x-2 mt-medical-sm">
            <Shield className="h-4 w-4 text-success-500" />
            <span className="text-medical-sm text-success-600 dark:text-success-400 font-medium">
              HIPAA Compliant & Secure
            </span>
          </div>
        </div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="medical-card bg-gradient-to-r from-info-50 to-primary-50 dark:from-info-900/20 dark:to-primary-900/20 border border-info-200 dark:border-info-800"
        >
          <div className="p-medical-lg">
            <div className="flex items-center space-x-2 mb-medical-sm">
              <Sparkles className="h-4 w-4 text-info-600 dark:text-info-400" />
              <h3 className="text-medical-sm font-medium text-info-900 dark:text-info-100">
                Demo Credentials
              </h3>
            </div>
            <div className="text-medical-xs text-info-800 dark:text-info-200 space-y-1">
              <div className="flex items-center justify-between">
                <strong>Patient Portal:</strong>
                <code className="bg-white/50 dark:bg-black/20 px-2 py-1 rounded">patient@neurovision.ai</code>
              </div>
              <div className="flex items-center justify-between">
                <strong>Doctor Portal:</strong>
                <code className="bg-white/50 dark:bg-black/20 px-2 py-1 rounded">doctor@neurovision.ai</code>
              </div>
              <div className="text-center pt-1">
                <span className="font-medium">Password:</span> <code className="bg-white/50 dark:bg-black/20 px-2 py-1 rounded">demo123</code>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 space-y-medical-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="medical-alert-error"
            >
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-medical-sm">
                {error}
              </span>
            </motion.div>
          )}

          <div className="space-y-medical-md">
            <div>
              <label htmlFor="email" className="medical-label">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  autoComplete="email"
                  className="medical-input pl-10"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-medical-sm text-error-600 dark:text-error-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="medical-label">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type="password"
                  autoComplete="current-password"
                  className="medical-input pl-10"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-medical-sm text-error-600 dark:text-error-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-neutral-600 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-medical-sm text-neutral-900 dark:text-neutral-300">
                Remember me
              </label>
            </div>

            <div className="text-medical-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-medical-primary text-medical-base py-medical-md"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign in to NeuroVision AI'
              )}
            </button>
          </div>

          <div className="text-center">
            <span className="text-medical-sm text-neutral-600 dark:text-neutral-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
              >
                Sign up for free
              </Link>
            </span>
          </div>
        </motion.form>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 text-medical-xs text-neutral-500 dark:text-neutral-400">
            <Shield className="h-3 w-3" />
            <span>Protected by enterprise-grade security</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}