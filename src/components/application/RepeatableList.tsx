import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RepeatableListProps<T> {
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  addLabel?: string;
  minItems?: number;
  maxItems?: number;
  className?: string;
}

export function RepeatableList<T>({
  items,
  onAdd,
  onRemove,
  renderItem,
  addLabel = "Add Item",
  minItems = 0,
  maxItems = 10,
  className
}: RepeatableListProps<T>) {
  const canAdd = items.length < maxItems;
  const canRemove = items.length > minItems;

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <Card key={index} className="relative">
          <CardContent className="pt-6">
            {renderItem(item, index)}
            {canRemove && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-destructive hover:text-destructive"
                onClick={() => onRemove(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
      
      {canAdd && (
        <Button
          type="button"
          variant="outline"
          onClick={onAdd}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          {addLabel}
        </Button>
      )}
    </div>
  );
}