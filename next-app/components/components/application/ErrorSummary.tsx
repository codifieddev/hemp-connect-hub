import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ValidationError {
  field: string;
  message: string;
  step?: number;
}

interface ErrorSummaryProps {
  errors: ValidationError[];
  onFieldClick?: (field: string, step?: number) => void;
  className?: string;
}

export const ErrorSummary: React.FC<ErrorSummaryProps> = ({
  errors,
  onFieldClick,
  className
}) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Please fix the following errors:</AlertTitle>
      <AlertDescription>
        <ul className="mt-2 space-y-1">
          {errors.map((error, index) => (
            <li key={index} className="flex items-center justify-between">
              <span className="text-sm">{error.message}</span>
              {onFieldClick && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFieldClick(error.field, error.step)}
                  className="text-xs h-auto p-1"
                >
                  Fix
                </Button>
              )}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
};