import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormSection } from '@/components/application/FormSection';
import { MatrixSelector } from '@/components/application/MatrixSelector';
import { RepeatableList } from '@/components/application/RepeatableList';
import { FieldRow } from '@/components/application/FieldRow';
import { MATRIX_CATEGORIES, MATRIX_OPTIONS } from '@/data/applicationData';
import { Mistake } from '@/types/application';

interface MentorStep4Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const MentorStep4: React.FC<MentorStep4Props> = ({ form }) => {
  const mistakes = form.watch('narratives.mistakes') || [];

  const addMistake = () => {
    if (mistakes.length < 3) {
      const newMistake: Mistake = { whatHappened: '', lesson: '' };
      form.setValue('narratives.mistakes', [...mistakes, newMistake]);
    }
  };

  const removeMistake = (index: number) => {
    if (mistakes.length > 0) {
      form.setValue('narratives.mistakes', mistakes.filter((_: any, i: number) => i !== index));
    }
  };

  const renderMistake = (mistake: Mistake, index: number) => (
    <div className="space-y-4">
      <h4 className="font-medium">Mistake #{index + 1}</h4>
      <FieldRow columns={1}>
        <FormField
          control={form.control}
          name={`narratives.mistakes.${index}.whatHappened`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>What happened? <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the mistake or challenge you faced..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <div className="text-xs text-muted-foreground">
                {field.value?.length || 0}/500 characters (minimum 50)
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`narratives.mistakes.${index}.lesson`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>What did you learn? <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the lesson learned and how it changed your approach..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <div className="text-xs text-muted-foreground">
                {field.value?.length || 0}/500 characters (minimum 50)
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldRow>
    </div>
  );

  const handleMatrixChange = (categoryId: string, value: string) => {
    const currentMatrix = form.getValues('strengths.matrix') || {};
    form.setValue('strengths.matrix', {
      ...currentMatrix,
      [categoryId]: value
    });
  };

  return (
    <div className="space-y-8">
      <FormSection 
        title="Strengths Assessment" 
        description="Rate your expertise in key business areas"
      >
        <MatrixSelector
          categories={MATRIX_CATEGORIES}
          options={MATRIX_OPTIONS}
          values={form.watch('strengths.matrix') || {}}
          onChange={handleMatrixChange}
          title="Business Areas Assessment"
          description="Rate each area: S = Strength, C = Competent, N = Need Help, N/A = Not Applicable"
          required
        />
      </FormSection>

      <FormSection title="Greatest Success" description="Share your biggest business achievement">
        <FormField
          control={form.control}
          name="narratives.biggestSuccess"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Describe your greatest business success <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Share a specific example of a significant achievement, breakthrough, or success in your business career..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <div className="text-xs text-muted-foreground">
                {field.value?.length || 0}/1000 characters (minimum 100)
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      <FormSection 
        title="Learning from Mistakes" 
        description="Share 3 significant mistakes and what you learned"
      >
        <RepeatableList
          items={mistakes}
          onAdd={addMistake}
          onRemove={removeMistake}
          renderItem={renderMistake}
          addLabel="Add Mistake"
          minItems={3}
          maxItems={3}
        />
        
        <div className="text-sm text-muted-foreground">
          Please provide exactly 3 mistakes. This helps mentees understand that failure is part of the learning process.
        </div>
      </FormSection>

      <FormSection title="Leadership Insights" description="Your approach to helping others">
        <FormField
          control={form.control}
          name="narratives.helpAreasAsLeader"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How do you help others as a leader? <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your leadership style, how you develop others, and the areas where you excel at helping people grow..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <div className="text-xs text-muted-foreground">
                {field.value?.length || 0}/1000 characters (minimum 100)
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      <FormSection title="Why HEMP?" description="Your motivation for mentoring">
        <FormField
          control={form.control}
          name="narratives.whyHEMP"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why do you want to be a HEMP mentor? <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Explain your motivation for becoming a mentor, what you hope to contribute, and how you plan to help mentees succeed..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <div className="text-xs text-muted-foreground">
                {field.value?.length || 0}/800 characters (minimum 150)
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>
    </div>
  );
};