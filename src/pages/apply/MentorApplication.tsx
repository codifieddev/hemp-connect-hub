// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Form } from '@/components/ui/form';
// import { Stepper } from '@/components/application/Stepper';
// import { AutosaveIndicator } from '@/components/application/AutosaveIndicator';
// import { ErrorSummary } from '@/components/application/ErrorSummary';
// import { useToast } from '@/hooks/use-toast';
// import Layout from '@/components/layout/Layout';
// import { Separator } from '@/components/ui/separator';
// import { MATRIX_CATEGORIES, EXPERTISE_AREAS, MEETING_PREFERENCES } from '@/data/applicationData';

// // Import step components
// import { MentorStep1 } from './steps/mentor/MentorStep1';
// import { MentorStep2 } from './steps/mentor/MentorStep2';
// import { MentorStep3 } from './steps/mentor/MentorStep3';
// import { MentorStep4 } from './steps/mentor/MentorStep4';
// import { MentorStep5 } from './steps/mentor/MentorStep5';
// import { MentorStep6 } from './steps/mentor/MentorStep6';
// import { MentorStep7 } from './steps/mentor/MentorStep7';
// import { MentorSummary } from './steps/mentor/MentorSummary';

// // Import validation schemas
// import { 
//   mentorStep1Schema,
//   mentorStep2Schema,
//   mentorStep3Schema,
//   mentorStep4Schema,
//   mentorStep5Schema,
//   mentorStep6Schema,
//   mentorStep7Schema
// } from '@/schemas/mentorSchema';

// const STEPS = [
//   { id: 'step1', title: 'Person & Business', description: 'Basic information' },
//   { id: 'step2', title: 'Background', description: 'Experience & leadership' },
//   { id: 'step3', title: 'Mentor Preferences', description: 'Expertise & availability' },
//   { id: 'step4', title: 'Strengths & Reflection', description: 'Assessment & experience' },
//   { id: 'step5', title: 'References', description: 'Business contacts' },
//   { id: 'step6', title: 'Uploads', description: 'Documents & bio' },
//   { id: 'step7', title: 'Signature', description: 'Legal authorization' },
//   { id: 'summary', title: 'Summary', description: 'Review & submit' }
// ];

// const VALIDATION_SCHEMAS = [
//   mentorStep1Schema,
//   mentorStep2Schema,
//   mentorStep3Schema,
//   mentorStep4Schema,
//   mentorStep5Schema,
//   mentorStep6Schema,
//   mentorStep7Schema,
//   z.object({}) // Summary step has no validation
// ];

// export const MentorApplication: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [autosaveStatus, setAutosaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
//   const [lastSaved, setLastSaved] = useState<Date | undefined>();
//   const [validationErrors, setValidationErrors] = useState<any[]>([]);
//   const { toast } = useToast();

//   // Autofill defaults (restores earlier behavior)
//   const defaultValues = {
//     person: { firstName: '', lastName: '', email: '', title: '' },
//     company: { name: '', industry: [], website: '' },
//     phones: { business: '', mobile: '' },
//     referral: { source: undefined },
//     address: { business: { street1: '', street2: '', city: '', state: '', postalCode: '', country: 'US' }, home: { street1: '', street2: '', city: '', state: '', postalCode: '', country: 'US' } },
//   } as any;

//   const form = useForm({
//     resolver: zodResolver(VALIDATION_SCHEMAS[currentStep]),
//     mode: 'onChange',
//     defaultValues
//   });

//   // Load saved data on mount
//   useEffect(() => {
//     const savedData = localStorage.getItem('mentor-application');
//     if (savedData) {
//       try {
//         const parsedData = JSON.parse(savedData);
//         form.reset(parsedData.formData);
//         setCurrentStep(parsedData.currentStep || 0);
//         setLastSaved(new Date(parsedData.lastSaved));
//       } catch (error) {
//         console.error('Failed to load saved application:', error);
//       }
//     }
//   }, [form]);

//   // Autosave functionality
//   useEffect(() => {
//     const subscription = form.watch((data) => {
//       setAutosaveStatus('saving');
      
//       const saveData = {
//         formData: data,
//         currentStep,
//         lastSaved: new Date().toISOString()
//       };

//       try {
//         localStorage.setItem('mentor-application', JSON.stringify(saveData));
//         setTimeout(() => {
//           setAutosaveStatus('saved');
//           setLastSaved(new Date());
//         }, 1000);
//       } catch (error) {
//         setAutosaveStatus('error');
//         console.error('Failed to save application:', error);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [form, currentStep]);

//   const validateCurrentStep = async () => {
//     const isValid = await form.trigger();
//     if (!isValid) {
//       const errors = Object.entries(form.formState.errors).map(([field, error]) => ({
//         field,
//         message: error?.message || 'Invalid field',
//         step: currentStep
//       }));
//       setValidationErrors(errors);
//       return false;
//     }
//     setValidationErrors([]);
//     return true;
//   };

//   const handleNext = async () => {
//     const isValid = await validateCurrentStep();
//     if (isValid && currentStep < STEPS.length - 1) {
//       setCurrentStep(currentStep + 1);
//       form.clearErrors();
//     } else if (!isValid) {
//       toast({
//         title: "Validation Error",
//         description: "Please fix the errors before proceeding.",
//         variant: "destructive"
//       });
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//       form.clearErrors();
//     }
//   };

//   const handleStepClick = (stepIndex: number) => {
//     if (stepIndex <= currentStep) {
//       setCurrentStep(stepIndex);
//       form.clearErrors();
//     }
//   };

//   const handleSaveAndFinishLater = () => {
//     toast({
//       title: "Application Saved",
//       description: "You can return to complete your application later using the link in your email.",
//     });
//     // In a real app, this would send an email with a magic link
//   };

//   const handleSubmit = () => {
//     toast({
//       title: "Application Submitted",
//       description: "Thank you! Your mentor application has been submitted successfully.",
//     });
//     // Clear saved data
//     localStorage.removeItem('mentor-application');
//     // In a real app, this would submit to the backend
//   };

//   const renderCurrentStep = () => {
//     const stepProps = {
//       form,
//       onNext: handleNext,
//       onPrevious: handlePrevious,
//       isFirstStep: currentStep === 0,
//       isLastStep: currentStep === STEPS.length - 1
//     };

//     switch (currentStep) {
//       case 0: return <MentorStep1 {...stepProps} />;
//       case 1: return <MentorStep2 {...stepProps} />;
//       case 2: return <MentorStep3 {...stepProps} />;
//       case 3: return <MentorStep4 {...stepProps} />;
//       case 4: return <MentorStep5 {...stepProps} />;
//       case 5: return <MentorStep6 {...stepProps} />;
//       case 6: return <MentorStep7 {...stepProps} />;
//       case 7: return <MentorSummary form={form} onSubmit={handleSubmit} onPrevious={handlePrevious} />;
//       default: return null;
//     }
//   };

// <<<<<<< feat/ui-mentee-blurb-and-supabase-auth-scaffold
//   // ---------- Autofill helpers ----------
//   const lorem = (n: number) =>
//     ("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ".repeat(10)).slice(0, n);

//   const mentorStepPatch = (step: number) => {
//     switch (step) {
//       case 0:
//         return {
//           person: { firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', title: 'President' },
//           company: { name: 'MentorCo', industry: ['Technology'], website: 'https://mentor.co' },
//           phones: { business: '8161112222', mobile: '8163334444' },
//           address: { business: { street1: '500 Market St', street2: '', city: 'Kansas City', state: 'MO', postalCode: '64106', country: 'US' } },
//           referral: { source: 'Friend' },
//         };
//       case 1:
//         return {
//           background: { yearsInLeadershipOrOwnership: 12 },
//           team: { fullTime: 50, partTime: 10, contractors: 5, total: 65 },
//           company: { type: 'LLC', typeOther: '', experienceNotes: '20 years in the industry' },
//         };
//       case 2:
//         return {
//           preferences: { expertiseAreas: ['Finance', 'Marketing'], availabilityHoursPerMonth: 10, meetingPreference: 'Virtual', capacityMentees: 2, geography: 'US', notes: 'Happy to help' },
//         };
//       case 3:
//         return {
//           strengths: { matrix: { leadership: 'Strong', strategy: 'Excellent' } },
//           narratives: { biggestSuccess: lorem(180), mistakes: [
//             { whatHappened: lorem(80), lesson: lorem(80) },
//             { whatHappened: lorem(80), lesson: lorem(80) },
//             { whatHappened: lorem(80), lesson: lorem(80) },
//           ], helpAreasAsLeader: lorem(160), whyHEMP: lorem(170) },
//         };
//       case 4:
//         return {
//           references: { business: [
//             { name: 'Ref One', company: 'Co A', phone: '8165550001', email: 'ref1@example.com' },
//             { name: 'Ref Two', company: 'Co B', phone: '8165550002', email: 'ref2@example.com' },
//             { name: 'Ref Three', company: 'Co C', phone: '8165550003', email: 'ref3@example.com' },
//           ] },
//         };
//       case 5:
//         return { uploads: { bio: ['bio.pdf'], headshot: ['head.jpg'], additionalDocs: ['addl.pdf'] } };
//       case 6:
//         return { signature: { typedName: 'John Smith', consent: true, drawn: '', method: 'typed', timestamp: new Date().toISOString(), ip: '127.0.0.1' } };
//       default:
//         return {};
//     }
//   };

//   const mentorAllData = () => {
//     let data: any = {};
//     for (let i = 0; i <= 6; i++) data = { ...data, ...mentorStepPatch(i) };
//     return { ...form.getValues(), ...data };
//   };

//   const autofillThisStep = () => form.reset({ ...form.getValues(), ...mentorStepPatch(currentStep) });
//   const autofillAndNext = async () => { autofillThisStep(); await handleNext(); };
//   const autofillAllSteps = () => form.reset(mentorAllData());

// =======
//   const handleAutofillStep = (stepIndex: number) => {
//     const dummyFileItem = (name: string, type: string) => ({
//       id: Math.random().toString(36).slice(2),
//       file: new File(["Test content"], name, { type }),
//       progress: 100,
//       status: 'completed' as const,
//       url: ''
//     });

//     switch (stepIndex) {
//       case 0: {
//         form.setValue('person', {
//           firstName: 'Mary',
//           lastName: 'Mentor',
//           email: 'mary.mentor@example.com',
//           title: 'Executive Advisor'
//         });
//         form.setValue('company', {
//           name: 'MentorCo',
//           industry: ['Professional Services'],
//           website: 'https://mentor.co'
//         });
//         form.setValue('phones', { business: '9135550000', mobile: '9135551111' });
//         form.setValue('address', {
//           business: { street1: '500 Market St', street2: '', city: 'Overland Park', state: 'KS', postalCode: '66210', country: 'USA' }
//         });
//         form.setValue('referral', { source: 'Alumni' });
//         break;
//       }
//       case 1: {
//         form.setValue('background', { yearsInLeadershipOrOwnership: 15 });
//         form.setValue('team', { fullTime: 20, partTime: 5, contractors: 3, total: 28 });
//         form.setValue('company', { ...(form.getValues('company') || {}), type: 'LLC', typeOther: '', experienceNotes: 'Autofilled.' });
//         break;
//       }
//       case 2: {
//         form.setValue('preferences', {
//           expertiseAreas: EXPERTISE_AREAS.slice(0, 3),
//           availabilityHoursPerMonth: 6,
//           meetingPreference: MEETING_PREFERENCES[2],
//           capacityMentees: 2,
//           geography: 'KC Metro',
//           notes: 'Open to remote sessions.'
//         });
//         break;
//       }
//       case 3: {
//         const matrix: Record<string, string> = {};
//         MATRIX_CATEGORIES.forEach((c) => { matrix[c.id] = 'S'; });
//         form.setValue('strengths', { matrix });
//         form.setValue('narratives', {
//           biggestSuccess: 'Helped scale a startup to national presence with strong revenue growth. '.repeat(5),
//           mistakes: [
//             { whatHappened: 'Delegated too little early on leading to bottlenecks.'.repeat(2), lesson: 'Empowered team leads and established clear processes.'.repeat(2) },
//             { whatHappened: 'Expanded to a new market without sufficient research.'.repeat(2), lesson: 'Now validate with pilots and customer discovery.'.repeat(2) },
//             { whatHappened: 'Hired for skill without culture fit.'.repeat(2), lesson: 'We created values-based hiring criteria.'.repeat(2) }
//           ],
//           helpAreasAsLeader: 'Seeking to improve mentorship frameworks for early-stage founders. '.repeat(4),
//           whyHEMP: 'Committed to giving back and supporting the next generation of entrepreneurs. '.repeat(4)
//         });
//         break;
//       }
//       case 4: {
//         form.setValue('references', {
//           business: [
//             { name: 'Alan Ref', company: 'Alpha Inc', phone: '9135552000', email: 'alan@alpha.com' },
//             { name: 'Betty Ref', company: 'Beta LLC', phone: '9135553000', email: 'betty@beta.com' },
//             { name: 'Carl Ref', company: 'Gamma Co', phone: '9135554000', email: 'carl@gamma.com' }
//           ]
//         });
//         break;
//       }
//       case 5: {
//         form.setValue('uploads', {
//           bio: [dummyFileItem('bio.pdf', 'application/pdf')],
//           headshot: [dummyFileItem('mentor-headshot.jpg', 'image/jpeg')],
//           additionalDocs: [dummyFileItem('portfolio.pdf', 'application/pdf')]
//         });
//         break;
//       }
//       case 6: {
//         form.setValue('signature', {
//           typedName: 'Mary Mentor',
//           consent: true,
//           drawn: '',
//           method: 'typed',
//           timestamp: new Date().toISOString(),
//           ip: '127.0.0.1'
//         });
//         break;
//       }
//       default:
//         break;
//     }
//   };

//   const autofillAllSteps = () => {
//     for (let i = 0; i < STEPS.length - 1; i++) handleAutofillStep(i);
//     setCurrentStep(STEPS.length - 1);
//   };

// >>>>>>> main
//   return (
//     <Layout>
//       <div className="container mx-auto py-8 max-w-6xl px-4">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-center mb-2">HEMP Mentor Application</h1>
//           <p className="text-muted-foreground text-center">
//             Complete your application to join the HEMP mentor program
//           </p>
//         </div>

//         <Card className="mb-6 blurb">
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <CardTitle className="text-xl">Application Progress</CardTitle>
// <<<<<<< feat/ui-mentee-blurb-and-supabase-auth-scaffold
//               <div className="flex items-center gap-2">
//                 <Button type="button" variant="secondary" onClick={autofillThisStep}>Autofill This Step</Button>
//                 <Button type="button" variant="secondary" onClick={autofillAndNext}>Autofill & Next</Button>
//                 <Button type="button" variant="secondary" onClick={autofillAllSteps}>Autofill All Steps</Button>
//                 <AutosaveIndicator status={autosaveStatus} lastSaved={lastSaved} />
// =======
//               <AutosaveIndicator status={autosaveStatus} lastSaved={lastSaved} />
//               <div className="flex items-center gap-2">
//                 <Button type="button" variant="secondary" onClick={() => handleAutofillStep(currentStep)}>
//                   Autofill This Step
//                 </Button>
//                 <Button type="button" variant="secondary" onClick={() => { handleAutofillStep(currentStep); if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1); }}>
//                   Autofill & Next
//                 </Button>
//                 <Button type="button" variant="outline" onClick={autofillAllSteps}>
//                   Autofill All Steps
//                 </Button>
// >>>>>>> main
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <Stepper
//               steps={STEPS}
//               currentStep={currentStep}
//               onStepClick={handleStepClick}
//             />
//           </CardContent>
//         </Card>

//         {validationErrors.length > 0 && (
//           <ErrorSummary
//             errors={validationErrors}
//             className="mb-6"
//           />
//         )}

//         <Form {...form}>
//           <form>
//             <Card>
//               <CardHeader>
//                 <CardTitle>{STEPS[currentStep].title}</CardTitle>
//                 <p className="text-muted-foreground">{STEPS[currentStep].description}</p>
//                 <Separator />
//               </CardHeader>
//               <CardContent>
//                 {renderCurrentStep()}
//               </CardContent>
//             </Card>

//             <div className="mt-6 flex justify-between">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={handleSaveAndFinishLater}
//               >
//                 Save & Finish Later
//               </Button>
              
//               <div className="space-x-2">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={handlePrevious}
//                   disabled={currentStep === 0}
//                 >
//                   Previous
//                 </Button>
                
//                 {currentStep < STEPS.length - 1 ? (
//                   <Button type="button" onClick={handleNext}>
//                     Next
//                   </Button>
//                 ) : (
//                   <Button 
//                     type="button" 
//                     onClick={handleSubmit}
//                     className="bg-primary"
//                   >
//                     Submit Application
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </Layout>
//   );
// };


import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Stepper } from '@/components/application/Stepper';
import { AutosaveIndicator } from '@/components/application/AutosaveIndicator';
import { ErrorSummary } from '@/components/application/ErrorSummary';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';
import { MATRIX_CATEGORIES, EXPERTISE_AREAS, MEETING_PREFERENCES } from '@/data/applicationData';

// Import step components
import { MentorStep1 } from './steps/mentor/MentorStep1';
import { MentorStep2 } from './steps/mentor/MentorStep2';
import { MentorStep3 } from './steps/mentor/MentorStep3';
import { MentorStep4 } from './steps/mentor/MentorStep4';
import { MentorStep5 } from './steps/mentor/MentorStep5';
import { MentorStep6 } from './steps/mentor/MentorStep6';
import { MentorStep7 } from './steps/mentor/MentorStep7';
import { MentorSummary } from './steps/mentor/MentorSummary';

// Import validation schemas
import { 
  mentorStep1Schema,
  mentorStep2Schema,
  mentorStep3Schema,
  mentorStep4Schema,
  mentorStep5Schema,
  mentorStep6Schema,
  mentorStep7Schema
} from '@/schemas/mentorSchema';

const STEPS = [
  { id: 'step1', title: 'Person & Business', description: 'Basic information' },
  { id: 'step2', title: 'Background', description: 'Experience & leadership' },
  { id: 'step3', title: 'Mentor Preferences', description: 'Expertise & availability' },
  { id: 'step4', title: 'Strengths & Reflection', description: 'Assessment & experience' },
  { id: 'step5', title: 'References', description: 'Business contacts' },
  { id: 'step6', title: 'Uploads', description: 'Documents & bio' },
  { id: 'step7', title: 'Signature', description: 'Legal authorization' },
  { id: 'summary', title: 'Summary', description: 'Review & submit' }
];

const VALIDATION_SCHEMAS = [
  mentorStep1Schema,
  mentorStep2Schema,
  mentorStep3Schema,
  mentorStep4Schema,
  mentorStep5Schema,
  mentorStep6Schema,
  mentorStep7Schema,
  z.object({}) // Summary step has no validation
];

export const MentorApplication: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [autosaveStatus, setAutosaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const { toast } = useToast();

  // Autofill defaults (restores earlier behavior)
  const defaultValues = {
    person: { firstName: '', lastName: '', email: '', title: '' },
    company: { name: '', industry: [], website: '' },
    phones: { business: '', mobile: '' },
    referral: { source: undefined },
    address: { business: { street1: '', street2: '', city: '', state: '', postalCode: '', country: 'US' }, home: { street1: '', street2: '', city: '', state: '', postalCode: '', country: 'US' } },
  } as any;

  const form = useForm({
    resolver: zodResolver(VALIDATION_SCHEMAS[currentStep]),
    mode: 'onChange',
    defaultValues
  });

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('mentor-application');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData.formData);
        setCurrentStep(parsedData.currentStep || 0);
        setLastSaved(new Date(parsedData.lastSaved));
      } catch (error) {
        console.error('Failed to load saved application:', error);
      }
    }
  }, [form]);

  // Autosave functionality
  useEffect(() => {
    const subscription = form.watch((data) => {
      setAutosaveStatus('saving');
      
      const saveData = {
        formData: data,
        currentStep,
        lastSaved: new Date().toISOString()
      };

      try {
        localStorage.setItem('mentor-application', JSON.stringify(saveData));
        setTimeout(() => {
          setAutosaveStatus('saved');
          setLastSaved(new Date());
        }, 1000);
      } catch (error) {
        setAutosaveStatus('error');
        console.error('Failed to save application:', error);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, currentStep]);

  const validateCurrentStep = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      const errors = Object.entries(form.formState.errors).map(([field, error]) => ({
        field,
        message: error?.message || 'Invalid field',
        step: currentStep
      }));
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors([]);
    return true;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      form.clearErrors();
    } else if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before proceeding.",
        variant: "destructive"
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      form.clearErrors();
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
      form.clearErrors();
    }
  };

  const handleSaveAndFinishLater = () => {
    toast({
      title: "Application Saved",
      description: "You can return to complete your application later using the link in your email.",
    });
    // In a real app, this would send an email with a magic link
  };

  const handleSubmit = async () => {
    try {
      const { saveApplication } = await import('@/lib/saveApplication');
      await saveApplication('mentor', form.getValues());
      toast({
        title: 'Application Submitted',
        description: 'Thank you! Your mentor application has been submitted successfully.',
      });
      localStorage.removeItem('mentor-application');
    } catch (e: any) {
      console.error(e);
      toast({ title: 'Save failed', description: e?.message || 'Unable to save application', variant: 'destructive' });
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      form,
      onNext: handleNext,
      onPrevious: handlePrevious,
      isFirstStep: currentStep === 0,
      isLastStep: currentStep === STEPS.length - 1
    };

    switch (currentStep) {
      case 0: return <MentorStep1 {...stepProps} />;
      case 1: return <MentorStep2 {...stepProps} />;
      case 2: return <MentorStep3 {...stepProps} />;
      case 3: return <MentorStep4 {...stepProps} />;
      case 4: return <MentorStep5 {...stepProps} />;
      case 5: return <MentorStep6 {...stepProps} />;
      case 6: return <MentorStep7 {...stepProps} />;
      case 7: return <MentorSummary form={form} onSubmit={handleSubmit} onPrevious={handlePrevious} />;
      default: return null;
    }
  };

  // ---------- Autofill helpers ----------
  const lorem = (n: number) =>
    ("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ".repeat(10)).slice(0, n);

  const mentorStepPatch = (step: number) => {
    switch (step) {
      case 0:
        return {
          person: { firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', title: 'President' },
          company: { name: 'MentorCo', industry: ['Technology'], website: 'https://mentor.co' },
          phones: { business: '8161112222', mobile: '8163334444' },
          address: { business: { street1: '500 Market St', street2: '', city: 'Kansas City', state: 'MO', postalCode: '64106', country: 'US' } },
          referral: { source: 'Friend' },
        };
      case 1:
        return {
          background: { yearsInLeadershipOrOwnership: 12 },
          team: { fullTime: 50, partTime: 10, contractors: 5, total: 65 },
          company: { type: 'LLC', typeOther: '', experienceNotes: '20 years in the industry' },
        };
      case 2:
        return {
          preferences: { expertiseAreas: ['Finance', 'Marketing'], availabilityHoursPerMonth: 10, meetingPreference: 'Virtual', capacityMentees: 2, geography: 'US', notes: 'Happy to help' },
        };
      case 3:
        return {
          strengths: { matrix: { leadership: 'Strong', strategy: 'Excellent' } },
          narratives: { biggestSuccess: lorem(180), mistakes: [
            { whatHappened: lorem(80), lesson: lorem(80) },
            { whatHappened: lorem(80), lesson: lorem(80) },
            { whatHappened: lorem(80), lesson: lorem(80) },
          ], helpAreasAsLeader: lorem(160), whyHEMP: lorem(170) },
        };
      case 4:
        return {
          references: { business: [
            { name: 'Ref One', company: 'Co A', phone: '8165550001', email: 'ref1@example.com' },
            { name: 'Ref Two', company: 'Co B', phone: '8165550002', email: 'ref2@example.com' },
            { name: 'Ref Three', company: 'Co C', phone: '8165550003', email: 'ref3@example.com' },
          ] },
        };
      case 5:
        return { uploads: { bio: ['bio.pdf'], headshot: ['head.jpg'], additionalDocs: ['addl.pdf'] } };
      case 6:
        return { signature: { typedName: 'John Smith', consent: true, drawn: '', method: 'typed', timestamp: new Date().toISOString(), ip: '127.0.0.1' } };
      default:
        return {};
    }
  };

  const mentorAllData = () => {
    let data: any = {};
    for (let i = 0; i <= 6; i++) data = { ...data, ...mentorStepPatch(i) };
    return { ...form.getValues(), ...data };
  };

  const autofillThisStep = () => form.reset({ ...form.getValues(), ...mentorStepPatch(currentStep) });
  const autofillAndNext = async () => { autofillThisStep(); await handleNext(); };
  const autofillAllSteps = () => form.reset(mentorAllData());

  return (
    <Layout>
      <div className="container mx-auto py-8 max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">HEMP Mentor Application</h1>
          <p className="text-muted-foreground text-center">
            Complete your application to join the HEMP mentor program
          </p>
        </div>

        <Card className="mb-6 blurb">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Application Progress</CardTitle>
              <div className="flex items-center gap-2">
                <Button type="button" variant="secondary" onClick={autofillThisStep}>Autofill This Step</Button>
                <Button type="button" variant="secondary" onClick={autofillAndNext}>Autofill & Next</Button>
                <Button type="button" variant="secondary" onClick={autofillAllSteps}>Autofill All Steps</Button>
                <AutosaveIndicator status={autosaveStatus} lastSaved={lastSaved} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Stepper
              steps={STEPS}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          </CardContent>
        </Card>

        {validationErrors.length > 0 && (
          <ErrorSummary
            errors={validationErrors}
            className="mb-6"
          />
        )}

        <Form {...form}>
          <form>
            <Card>
              <CardHeader>
                <CardTitle>{STEPS[currentStep].title}</CardTitle>
                <p className="text-muted-foreground">{STEPS[currentStep].description}</p>
                <Separator />
              </CardHeader>
              <CardContent>
                {renderCurrentStep()}
              </CardContent>
            </Card>

            <div className="mt-6 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveAndFinishLater}
              >
                Save & Finish Later
              </Button>
              
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                
                {currentStep < STEPS.length - 1 ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    onClick={handleSubmit}
                    className="bg-primary"
                  >
                    Submit Application
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};