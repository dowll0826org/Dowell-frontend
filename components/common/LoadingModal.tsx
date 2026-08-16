import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
  title?: string;
  subtitle?: string;
  progress?: number;
}

export default function LoadingModal({ isOpen, message, title, subtitle, progress }: LoadingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform transition-all">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rounded-full blur-xl animate-pulse"></div>
          <Loader2 className="relative w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin" />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white text-center">
          {title || message || 'Processing...'}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
          {subtitle || 'Please wait while we complete your request.'}
        </p>
        {progress !== undefined && (
          <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
