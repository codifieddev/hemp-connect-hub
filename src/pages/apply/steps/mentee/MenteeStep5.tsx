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

interface MenteeStep5Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const MenteeStep5: React.FC<MenteeStep5Props> = ({ form }) => {
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
        title="Strengths & Needs Assessment" 
        description="Rate your current capabilities in key business areas"
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

      <FormSection title="Success Story" description="Tell us about your biggest business success">
        <FormField
          control={form.control}
          name="narratives.biggestSuccess"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Describe your biggest business success <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Share a specific example of a significant achievement, breakthrough, or success in your business journey..."
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

      <FormSection title="Areas for Growth" description="Where do you need the most help?">
        <FormField
          control={form.control}
          name="narratives.helpAreas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What areas do you most need help with? <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the specific challenges, obstacles, or areas where you need guidance and support..."
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

        <FieldRow columns={2}>
          <FormField
            control={form.control}
            name="narratives.extraStrength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Strength (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any other area where you excel..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  {field.value?.length || 0}/500 characters
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="narratives.extraHelp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Help Needed (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any other area where you need support..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  {field.value?.length || 0}/500 characters
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldRow>
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
          Please provide exactly 3 mistakes. This helps us understand your learning journey and growth mindset.
        </div>
      </FormSection>

      <FormSection title="Why HEMP?" description="Tell us about your motivation">
        <FormField
          control={form.control}
          name="narratives.whyHEMP"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why do you want to join HEMP? <span className="text-destructive">*</span></FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Explain your motivation for joining HEMP, what you hope to achieve, and how you plan to contribute to the community..."
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