import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

// Interface for a single step
interface Step {
  id: string;
  title: string;
  description?: string;
}

// Props for the Stepper component
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
  const progressWidth = currentStep > 0 ? (currentStep / (steps.length - 1)) * 100 : 0;
  // Calculate a minimum width based on the number of steps to ensure they don't get squished.
  const minWidthForContainer = steps.length * 110; // Approx 110px per step

  return (
    <div className={cn("w-full", className)}>
      {/* This outer div will provide the horizontal scrollbar when needed */}
      <div className="w-full overflow-x-auto pb-4">
        
        {/* === KEY CHANGE IS HERE === */}
        {/* This inner div is now a flex container that is explicitly told NOT to wrap. */}
        <div 
          className="relative flex items-start justify-between flex-nowrap"
          style={{ minWidth: `${minWidthForContainer}px` }}
        >
          {/* Background Line */}
          <div className="absolute left-0 top-5 w-full h-0.5 bg-muted-foreground/20" />
          
          {/* Progress Line */}
          <div 
            className="absolute left-0 top-5 h-0.5 bg-primary transition-all duration-300"
            style={{ width: `${progressWidth}%` }}
          />

          {/* Step Items */}
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isClickable = onStepClick && index <= currentStep;

            return (
              <div key={step.id} className="z-10 flex flex-col items-center w-28 flex-shrink-0 px-2">
                
                {/* Step Circle */}
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                    {
                      "bg-primary border-primary": isCompleted || isCurrent,
                      "bg-background border-muted-foreground/20": !isCompleted && !isCurrent,
                      "cursor-pointer hover:bg-primary/10": isClickable && !isCompleted && !isCurrent
                    }
                  )}
                  onClick={isClickable ? () => onStepClick(index) : undefined}
                >
                  <span className={cn(
                    "text-sm font-semibold",
                    {
                      "text-primary-foreground": isCompleted || isCurrent,
                      "text-muted-foreground": !isCompleted && !isCurrent
                    }
                  )}>
                    {index + 1}
                  </span>
                </div>
                
                {/* Step Title & Description */}
                <div className="mt-3 text-center">
                  <div
                    className={cn(
                      "text-sm font-medium transition-colors",
                      {
                        "text-primary": isCurrent,
                        "text-foreground": isCompleted,
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
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Current Step Text (This part is outside the scroll area, so it's always visible) */}
      <div className="mt-4 flex justify-center">
        <div className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
        </div>
      </div>
    </div>
  );
};