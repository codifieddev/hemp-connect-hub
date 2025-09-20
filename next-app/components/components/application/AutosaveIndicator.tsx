import React from 'react';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutosaveIndicatorProps {
  status: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved?: Date;
  className?: string;
}

export const AutosaveIndicator: React.FC<AutosaveIndicatorProps> = ({
  status,
  lastSaved,
  className
}) => {
  const getIcon = () => {
    switch (status) {
      case 'saving':
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
      case 'saved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getMessage = () => {
    switch (status) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return lastSaved ? `Saved ${formatTimeAgo(lastSaved)}` : 'Saved';
      case 'error':
        return 'Save failed';
      default:
        return '';
    }
  };

  if (status === 'idle') {
    return null;
  }

  return (
    <div className={cn("flex items-center space-x-2 text-sm", className)}>
      {getIcon()}
      <span className="text-muted-foreground">{getMessage()}</span>
    </div>
  );
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  
  if (seconds < 60) {
    return 'just now';
  }
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  
  return date.toLocaleDateString();
}