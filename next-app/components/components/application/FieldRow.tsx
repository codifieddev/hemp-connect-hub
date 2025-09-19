import React from 'react';
import { cn } from '@/lib/utils';

interface FieldRowProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3;
}

export const FieldRow: React.FC<FieldRowProps> = ({
  children,
  className,
  columns = 1
}) => {
  return (
    <div
      className={cn(
        "grid gap-4",
        {
          "grid-cols-1": columns === 1,
          "grid-cols-1 md:grid-cols-2": columns === 2,
          "grid-cols-1 md:grid-cols-3": columns === 3
        },
        className
      )}
    >
      {children}
    </div>
  );
};