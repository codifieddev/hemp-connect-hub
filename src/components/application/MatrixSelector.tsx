import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface MatrixOption {
  value: string;
  label: string;
  description?: string;
}

interface MatrixCategory {
  id: string;
  label: string;
  description?: string;
}

interface MatrixSelectorProps {
  categories: MatrixCategory[];
  options: MatrixOption[];
  values: Record<string, string>;
  onChange: (categoryId: string, value: string) => void;
  title?: string;
  description?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export const MatrixSelector: React.FC<MatrixSelectorProps> = ({
  categories,
  options,
  values,
  onChange,
  title,
  description,
  required,
  error,
  className
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      {title && (
        <div>
          <h4 className="text-sm font-medium text-foreground">
            {title} {required && <span className="text-destructive">*</span>}
          </h4>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}

      <Card>
        <CardHeader className="pb-4">
          <div className="grid grid-cols-5 gap-4 text-center">
            <div className="text-sm font-medium text-left">Category</div>
            {options.map(option => (
              <div key={option.value} className="font-medium text-sm">
                <div>{option.label}</div>
                {option.description && (
                  <div className="text-xs text-muted-foreground font-normal">
                    {option.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map(category => (
            <div key={category.id} className="grid grid-cols-5 gap-4 items-center">
              {/* Category Label (Column 1) */}
              <div className="text-sm font-medium">
                <div>{category.label}</div>
                {category.description && (
                  <div className="text-xs text-muted-foreground font-normal">
                    {category.description}
                  </div>
                )}
              </div>
              
              {/* Radio Buttons (Columns 2-5) */}
              {/* === KEY CHANGE IS HERE === */}
              {/* Added 'col-span-4' to make the RadioGroup span the remaining 4 columns */}
              <RadioGroup
                value={values[category.id] || ''}
                onValueChange={(value) => onChange(category.id, value)}
                className="col-span-4 grid grid-cols-4 gap-4"
              >
                {options.map(option => (
                  <div key={option.value} className="flex items-center justify-center">
                    <RadioGroupItem
                      value={option.value}
                      id={`${category.id}-${option.value}`}
                      className="mx-auto"
                    />
                    <Label
                      htmlFor={`${category.id}-${option.value}`}
                      className="sr-only"
                    >
                      {category.label} - {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </CardContent>
      </Card>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};
