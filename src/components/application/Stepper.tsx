import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = onStepClick && index <= currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                  {
                    "bg-primary border-primary text-primary-foreground": isCompleted,
                    "bg-primary/10 border-primary text-primary": isCurrent,
                    "bg-muted border-muted-foreground/30 text-muted-foreground": !isCompleted && !isCurrent,
                    "cursor-pointer hover:bg-primary/20": isClickable
                  }
                )}
                onClick={isClickable ? () => onStepClick(index) : undefined}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              
              <div className="ml-3 min-w-0 flex-1">
                <div
                  className={cn(
                    "text-sm font-medium transition-colors",
                    {
                      "text-primary": isCompleted || isCurrent,
                      "text-muted-foreground": !isCompleted && !isCurrent
                    }
                  )}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </div>
                )}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 transition-colors",
                    {
                      "bg-primary": index < currentStep,
                      "bg-muted": index >= currentStep
                    }
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <div className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
};