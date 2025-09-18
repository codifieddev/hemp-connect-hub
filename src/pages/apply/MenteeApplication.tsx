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
// import { MATRIX_CATEGORIES, getCurrentYears } from '@/data/applicationData';

// // Import step components
// import { MenteeStep1 } from './steps/mentee/MenteeStep1';
// import { MenteeStep2 } from './steps/mentee/MenteeStep2';
// import { MenteeStep3 } from './steps/mentee/MenteeStep3';
// import { MenteeStep4 } from './steps/mentee/MenteeStep4';
// import { MenteeStep5 } from './steps/mentee/MenteeStep5';
// import { MenteeStep6 } from './steps/mentee/MenteeStep6';
// import { MenteeStep7 } from './steps/mentee/MenteeStep7';
// import { MenteeStep8 } from './steps/mentee/MenteeStep8';
// import { MenteeSummary } from './steps/mentee/MenteeSummary';

// // Import validation schemas
// import { 
//   menteeStep1Schema,
//   menteeStep2Schema,
//   menteeStep3Schema,
//   menteeStep4Schema,
//   menteeStep5Schema,
//   menteeStep6Schema,
//   menteeStep7Schema,
//   menteeStep8Schema
// } from '@/schemas/menteeSchema';

// const STEPS = [
//   { id: 'step1', title: 'Applicant & Business', description: 'Basic information' },
//   { id: 'step2', title: 'Company Basics', description: 'Ownership & governance' },
//   { id: 'step3', title: 'Team', description: 'Staffing levels' },
//   { id: 'step4', title: 'Financial Snapshot', description: 'Three-year overview' },
//   { id: 'step5', title: 'Strengths & Needs', description: 'Assessment & narratives' },
//   { id: 'step6', title: 'References', description: 'Professional contacts' },
//   { id: 'step7', title: 'Uploads', description: 'Required documents' },
//   { id: 'step8', title: 'Signature', description: 'Legal authorization' },
//   { id: 'summary', title: 'Summary', description: 'Review & submit' }
// ];

// const VALIDATION_SCHEMAS = [
//   menteeStep1Schema,
//   menteeStep2Schema,
//   menteeStep3Schema,
//   menteeStep4Schema,
//   menteeStep5Schema,
//   menteeStep6Schema,
//   menteeStep7Schema,
//   menteeStep8Schema,
//   z.object({}) // Summary step has no validation
// ];

// export const MenteeApplication: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [autosaveStatus, setAutosaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
//   const [lastSaved, setLastSaved] = useState<Date | undefined>();
//   const [validationErrors, setValidationErrors] = useState<any[]>([]);
//   const { toast } = useToast();

//   // Autofill defaults (restores earlier behavior)
//   const defaultValues = {
//     applicant: { firstName: '', lastName: '', email: '', title: '' },
//     company: { name: '', type: undefined, typeOther: '', industry: [], website: '', phoneBusiness: '' },
//     referral: { source: undefined },
//     address: { business: { street1: '', street2: '', city: '', state: '', postalCode: '', country: 'US' } },
//   } as any;

//   const form = useForm({
//     resolver: zodResolver(VALIDATION_SCHEMAS[currentStep]),
//     mode: 'onChange',
//     defaultValues
//   });

//   // Load saved data on mount
//   useEffect(() => {
//     const savedData = localStorage.getItem('mentee-application');
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
//         localStorage.setItem('mentee-application', JSON.stringify(saveData));
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
//       // Update resolver for next step
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
//       description: "Thank you! Your mentee application has been submitted successfully.",
//     });
//     // Clear saved data
//     localStorage.removeItem('mentee-application');
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
//       case 0: return <MenteeStep1 {...stepProps} />;
//       case 1: return <MenteeStep2 {...stepProps} />;
//       case 2: return <MenteeStep3 {...stepProps} />;
//       case 3: return <MenteeStep4 {...stepProps} />;
//       case 4: return <MenteeStep5 {...stepProps} />;
//       case 5: return <MenteeStep6 {...stepProps} />;
//       case 6: return <MenteeStep7 {...stepProps} />;
//       case 7: return <MenteeStep8 {...stepProps} />;
//       case 8: return <MenteeSummary form={form} onSubmit={handleSubmit} onPrevious={handlePrevious} />;
//       default: return null;
//     }
//   };

// <<<<<<< feat/ui-mentee-blurb-and-supabase-auth-scaffold
//   // ---------- Autofill helpers ----------
//   const lorem = (n: number) =>
//     ("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ".repeat(10)).slice(0, n);

//   const menteeStepPatch = (step: number) => {
//     switch (step) {
//       case 0:
//         return {
//           applicant: { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', title: 'Founder' },
//           company: { name: 'Acme Co', type: 'LLC', typeOther: '', industry: ['Technology'], website: 'https://acme.co', phoneBusiness: '8161234567' },
//           applicant_phoneMobile: '8165551212',
//           referral: { source: 'Web search' },
//           address: { business: { street1: '123 Main St', street2: 'Suite 100', city: 'Kansas City', state: 'MO', postalCode: '64111', country: 'US' } },
//         };
//       case 1:
//         return {
//           company: {
//             yearsInBusiness: 2,
//             fiscalYearEnd: 'December',
//             founderIsApplicant: true,
//             ultimateDecisionMaker: true,
//             ownership: [{ name: 'Jane Doe', title: 'CEO', equityPercent: 100 }],
//           },
//           governance: { hasBoardOfDirectors: false, hasAdvisoryBoard: true, directorsCount: 3 },
//         };
//       case 2:
//         return { team: { fullTime: 3, partTime: 1, contractors: 2, total: 6 } };
//       case 3:
//         return {
//           finance: {
//             years: {
//               '2023': { fullTimeEmployees: 2, annualRevenue: 150000, revenueGrowthPercent: 20, profitGrowthPercent: 10, equityPercent: 100 },
//               '2024': { fullTimeEmployees: 3, annualRevenue: 250000, revenueGrowthPercent: 30, profitGrowthPercent: 15, equityPercent: 100 },
//               '2025': { fullTimeEmployees: 4, annualRevenue: 400000, revenueGrowthPercent: 60, profitGrowthPercent: 25, equityPercent: 100 },
//             },
//             wasProfitableLastYear: true,
//             currentlyProfitable: true,
//             largestCustomerSharePercent: 25,
//             takesAnnualSalary: true,
//             contextNotes: 'N/A',
//           },
//         };
//       case 4:
//         return {
//           strengths: { matrix: { leadership: 'Strong', finance: 'Moderate', sales: 'Strong' } },
//           narratives: {
//             biggestSuccess: lorem(160),
//             helpAreas: lorem(160),
//             mistakes: [
//               { whatHappened: lorem(80), lesson: lorem(80) },
//               { whatHappened: lorem(80), lesson: lorem(80) },
//               { whatHappened: lorem(80), lesson: lorem(80) },
//             ],
//             whyHEMP: lorem(170),
//           },
//         };
//       case 5:
//         return {
//           references: {
//             accountant: { name: 'A Person', firm: 'CPA LLC', phone: '8161112222', email: 'acct@example.com' },
//             attorney: { name: 'B Person', firm: 'Law LLC', phone: '8163334444', email: 'atty@example.com' },
//             bank: { name: 'C Person', bankName: 'Bank Inc', phone: '8165556666', email: 'bank@example.com' },
//             business: [
//               { name: 'Biz Ref 1', company: 'Co 1', phone: '8167778888', email: 'biz1@example.com' },
//               { name: 'Biz Ref 2', company: 'Co 2', phone: '8169990000', email: 'biz2@example.com' },
//             ],
//             customer: [
//               { name: 'Cust Ref 1', company: 'Cust Co 1', phone: '8161010101', email: 'cust1@example.com' },
//               { name: 'Cust Ref 2', company: 'Cust Co 2', phone: '8162020202', email: 'cust2@example.com' },
//             ],
//             supplier: [
//               { name: 'Supp Ref 1', company: 'Supp Co 1', phone: '8163030303', email: 'supp1@example.com' },
//               { name: 'Supp Ref 2', company: 'Supp Co 2', phone: '8164040404', email: 'supp2@example.com' },
//             ],
//           },
//         };
//       case 6:
//         return { uploads: { coverLetter: ['cover.pdf'], orgChart: ['org.pdf'], personalBioOrResume: ['bio.pdf'], businessDescription: ['desc.pdf'], releaseGeneral: ['gen.pdf'], releaseInfoAuthorization: ['auth.pdf'], releaseApplicationInfo: ['app.pdf'], headshot: ['head.jpg'] } };
//       case 7:
//         return { signature: { typedName: 'Jane Doe', consent: true, drawn: '', method: 'typed', timestamp: new Date().toISOString(), ip: '127.0.0.1' } };
//       default:
//         return {};
//     }
//   };

//   const menteeAllData = () => {
//     let data: any = {};
//     for (let i = 0; i <= 7; i++) data = { ...data, ...menteeStepPatch(i) };
//     return { ...form.getValues(), ...data };
//   };

//   const autofillThisStep = () => form.reset({ ...form.getValues(), ...menteeStepPatch(currentStep) });
//   const autofillAndNext = async () => { autofillThisStep(); await handleNext(); };
//   const autofillAllSteps = () => form.reset(menteeAllData());

// =======
//   const handleAutofillStep = (stepIndex: number) => {
//     // Utility to create a dummy uploaded file item compatible with FileUploader
//     const dummyFileItem = (name: string, type: string) => ({
//       id: Math.random().toString(36).slice(2),
//       file: new File(["Test content"], name, { type }),
//       progress: 100,
//       status: 'completed' as const,
//       url: ''
//     });

//     switch (stepIndex) {
//       case 0: {
//         form.setValue('applicant', {
//           firstName: 'John',
//           lastName: 'Doe',
//           email: 'john.doe@example.com',
//           title: 'Founder'
//         });
//         form.setValue('company', {
//           ...(form.getValues('company') || {}),
//           name: 'Acme Widgets',
//           type: 'LLC',
//           industry: ['Information Technology'],
//           website: 'https://example.com',
//           phoneBusiness: '8161234567'
//         });
//         form.setValue('applicant_phoneMobile', '8169876543');
//         form.setValue('referral', { source: 'Web Search' });
//         form.setValue('address', {
//           business: {
//             street1: '123 Main St',
//             street2: '',
//             city: 'Kansas City',
//             state: 'MO',
//             postalCode: '64101',
//             country: 'USA'
//           }
//         });
//         break;
//       }
//       case 1: {
//         form.setValue('company', {
//           ...(form.getValues('company') || {}),
//           yearsInBusiness: 5,
//           fiscalYearEnd: 'december',
//           founderIsApplicant: true,
//           ultimateDecisionMaker: true,
//           ownership: [
//             { name: 'John Doe', title: 'Founder', equityPercent: 80 },
//             { name: 'Jane Smith', title: 'Co-founder', equityPercent: 20 }
//           ]
//         });
//         form.setValue('governance', {
//           hasBoardOfDirectors: true,
//           hasAdvisoryBoard: false,
//           directorsCount: 3
//         });
//         break;
//       }
//       case 2: {
//         form.setValue('team', {
//           fullTime: 5,
//           partTime: 2,
//           contractors: 1,
//           total: 8
//         });
//         break;
//       }
//       case 3: {
//         const years = getCurrentYears();
//         const yearsData: any = {};
//         [years.last2, years.last1, years.currentEst].forEach((y) => {
//           yearsData[y] = {
//             fullTimeEmployees: 3,
//             annualRevenue: 250000 + (y === years.currentEst ? 50000 : 0),
//             revenueGrowthPercent: 20,
//             profitGrowthPercent: 15,
//             equityPercent: 75
//           };
//         });
//         form.setValue('finance', {
//           years: yearsData,
//           wasProfitableLastYear: true,
//           currentlyProfitable: true,
//           largestCustomerSharePercent: 30,
//           takesAnnualSalary: true,
//           contextNotes: 'Autofilled financial snapshot for testing.'
//         });
//         break;
//       }
//       case 4: {
//         const matrix: Record<string, string> = {};
//         MATRIX_CATEGORIES.forEach((c) => { matrix[c.id] = 'S'; });
//         form.setValue('strengths', { matrix });
//         const longText =
//           'This is an autofilled narrative used for testing the form validation. '.repeat(8);
//         const longText2 =
//           'We are seeking mentorship to accelerate growth and improve operations. '.repeat(8);
//         form.setValue('narratives', {
//           biggestSuccess: longText,
//           helpAreas: longText2,
//           extraStrength: 'Team collaboration and innovation.',
//           extraHelp: 'Scaling sales processes.',
//           mistakes: [
//             { whatHappened: 'Made a hiring decision too quickly without due diligence.'.repeat(2), lesson: 'Implemented structured interviews and reference checks.'.repeat(2) },
//             { whatHappened: 'Underestimated project scope leading to delays.'.repeat(2), lesson: 'Now perform detailed planning and risk assessment.'.repeat(2) },
//             { whatHappened: 'Launched without enough user testing.'.repeat(2), lesson: 'We added a beta program and feedback loops.'.repeat(2) }
//           ],
//           whyHEMP: 'HEMP will provide invaluable guidance, accountability, and network access to help us scale responsibly and sustainably. '.repeat(4)
//         });
//         break;
//       }
//       case 5: {
//         form.setValue('references', {
//           accountant: { name: 'Alice Accountant', firm: 'AA CPA', phone: '8165551000', email: 'alice@cpa.com' },
//           attorney: { name: 'Bob Attorney', firm: 'BA Law', phone: '8165552000', email: 'bob@law.com' },
//           bank: { name: 'Carol Banker', bankName: 'KC Bank', phone: '8165553000', email: 'carol@kcbank.com' },
//           business: [
//             { name: 'Dave Biz', company: 'BizCo', phone: '8165554000', email: 'dave@biz.co' },
//             { name: 'Eve Biz', company: 'Enterprises', phone: '8165555000', email: 'eve@enterprises.com' }
//           ],
//           customer: [
//             { name: 'Frank Customer', company: 'CustCorp', phone: '8165556000', email: 'frank@cust.com' },
//             { name: 'Grace Customer', company: 'Grace LLC', phone: '8165557000', email: 'grace@grace.com' }
//           ],
//           supplier: [
//             { name: 'Heidi Supplier', company: 'SupplyCo', phone: '8165558000', email: 'heidi@supply.co' },
//             { name: 'Ivan Supplier', company: 'Widgets Ltd', phone: '8165559000', email: 'ivan@widgets.com' }
//           ]
//         });
//         break;
//       }
//       case 6: {
//         form.setValue('uploads', {
//           coverLetter: [dummyFileItem('cover-letter.pdf', 'application/pdf')],
//           orgChart: [dummyFileItem('org-chart.pdf', 'application/pdf')],
//           personalBioOrResume: [dummyFileItem('resume.pdf', 'application/pdf')],
//           businessDescription: [dummyFileItem('business-description.pdf', 'application/pdf')],
//           releaseGeneral: [dummyFileItem('general-release.pdf', 'application/pdf')],
//           releaseInfoAuthorization: [dummyFileItem('info-authorization.pdf', 'application/pdf')],
//           releaseApplicationInfo: [dummyFileItem('application-release.pdf', 'application/pdf')],
//           headshot: [dummyFileItem('headshot.jpg', 'image/jpeg')]
//         });
//         break;
//       }
//       case 7: {
//         form.setValue('signature', {
//           typedName: 'John Doe',
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
//           <h1 className="text-3xl font-bold text-center mb-2">HEMP Mentee Application</h1>
//           <p className="text-muted-foreground text-center">
//             Complete your application to join the HEMP mentee program
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
import { MATRIX_CATEGORIES, getCurrentYears } from '@/data/applicationData';

// Import step components
import { MenteeStep1 } from './steps/mentee/MenteeStep1';
import { MenteeStep2 } from './steps/mentee/MenteeStep2';
import { MenteeStep3 } from './steps/mentee/MenteeStep3';
import { MenteeStep4 } from './steps/mentee/MenteeStep4';
import { MenteeStep5 } from './steps/mentee/MenteeStep5';
import { MenteeStep6 } from './steps/mentee/MenteeStep6';
import { MenteeStep7 } from './steps/mentee/MenteeStep7';
import { MenteeStep8 } from './steps/mentee/MenteeStep8';
import { MenteeSummary } from './steps/mentee/MenteeSummary';

// Import validation schemas
import { 
  menteeStep1Schema,
  menteeStep2Schema,
  menteeStep3Schema,
  menteeStep4Schema,
  menteeStep5Schema,
  menteeStep6Schema,
  menteeStep7Schema,
  menteeStep8Schema
} from '@/schemas/menteeSchema';

const STEPS = [
  { id: 'step1', title: 'Applicant & Business', description: 'Basic information' },
  { id: 'step2', title: 'Company Basics', description: 'Ownership & governance' },
  { id: 'step3', title: 'Team', description: 'Staffing levels' },
  { id: 'step4', title: 'Financial Snapshot', description: 'Three-year overview' },
  { id: 'step5', title: 'Strengths & Needs', description: 'Assessment & narratives' },
  { id: 'step6', title: 'References', description: 'Professional contacts' },
  { id: 'step7', title: 'Uploads', description: 'Required documents' },
  { id: 'step8', title: 'Signature', description: 'Legal authorization' },
  { id: 'summary', title: 'Summary', description: 'Review & submit' }
];

const VALIDATION_SCHEMAS = [
  menteeStep1Schema,
  menteeStep2Schema,
  menteeStep3Schema,
  menteeStep4Schema,
  menteeStep5Schema,
  menteeStep6Schema,
  menteeStep7Schema,
  menteeStep8Schema,
  z.object({}) // Summary step has no validation
];

export const MenteeApplication: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [autosaveStatus, setAutosaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const { toast } = useToast();

  // Autofill defaults (restores earlier behavior)
  const defaultValues = {
    applicant: { firstName: '', lastName: '', email: '', title: '' },
    company: { name: '', type: undefined, typeOther: '', industry: [], website: '', phoneBusiness: '' },
    referral: { source: undefined },
    address: { business: { street1: '', street2: '', city: '', state: '', postalCode: '', country: 'US' } },
  } as any;

  const form = useForm({
    resolver: zodResolver(VALIDATION_SCHEMAS[currentStep]),
    mode: 'onChange',
    defaultValues
  });

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('mentee-application');
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
        localStorage.setItem('mentee-application', JSON.stringify(saveData));
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
      // Update resolver for next step
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

  const handleSubmit = () => {
    toast({
      title: "Application Submitted",
      description: "Thank you! Your mentee application has been submitted successfully.",
    });
    // Clear saved data
    localStorage.removeItem('mentee-application');
    // In a real app, this would submit to the backend
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
      case 0: return <MenteeStep1 {...stepProps} />;
      case 1: return <MenteeStep2 {...stepProps} />;
      case 2: return <MenteeStep3 {...stepProps} />;
      case 3: return <MenteeStep4 {...stepProps} />;
      case 4: return <MenteeStep5 {...stepProps} />;
      case 5: return <MenteeStep6 {...stepProps} />;
      case 6: return <MenteeStep7 {...stepProps} />;
      case 7: return <MenteeStep8 {...stepProps} />;
      case 8: return <MenteeSummary form={form} onSubmit={handleSubmit} onPrevious={handlePrevious} />;
      default: return null;
    }
  };

  // ---------- Autofill helpers ----------
  const lorem = (n: number) =>
    ("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ".repeat(10)).slice(0, n);

  const menteeStepPatch = (step: number) => {
    switch (step) {
      case 0:
        return {
          applicant: { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', title: 'Founder' },
          company: { name: 'Acme Co', type: 'LLC', typeOther: '', industry: ['Technology'], website: 'https://acme.co', phoneBusiness: '8161234567' },
          applicant_phoneMobile: '8165551212',
          referral: { source: 'Web search' },
          address: { business: { street1: '123 Main St', street2: 'Suite 100', city: 'Kansas City', state: 'MO', postalCode: '64111', country: 'US' } },
        };
      case 1:
        return {
          company: {
            yearsInBusiness: 2,
            fiscalYearEnd: 'December',
            founderIsApplicant: true,
            ultimateDecisionMaker: true,
            ownership: [{ name: 'Jane Doe', title: 'CEO', equityPercent: 100 }],
          },
          governance: { hasBoardOfDirectors: false, hasAdvisoryBoard: true, directorsCount: 3 },
        };
      case 2:
        return { team: { fullTime: 3, partTime: 1, contractors: 2, total: 6 } };
      case 3:
        return {
          finance: {
            years: {
              '2023': { fullTimeEmployees: 2, annualRevenue: 150000, revenueGrowthPercent: 20, profitGrowthPercent: 10, equityPercent: 100 },
              '2024': { fullTimeEmployees: 3, annualRevenue: 250000, revenueGrowthPercent: 30, profitGrowthPercent: 15, equityPercent: 100 },
              '2025': { fullTimeEmployees: 4, annualRevenue: 400000, revenueGrowthPercent: 60, profitGrowthPercent: 25, equityPercent: 100 },
            },
            wasProfitableLastYear: true,
            currentlyProfitable: true,
            largestCustomerSharePercent: 25,
            takesAnnualSalary: true,
            contextNotes: 'N/A',
          },
        };
      case 4:
        return {
          strengths: { matrix: { leadership: 'Strong', finance: 'Moderate', sales: 'Strong' } },
          narratives: {
            biggestSuccess: lorem(160),
            helpAreas: lorem(160),
            mistakes: [
              { whatHappened: lorem(80), lesson: lorem(80) },
              { whatHappened: lorem(80), lesson: lorem(80) },
              { whatHappened: lorem(80), lesson: lorem(80) },
            ],
            whyHEMP: lorem(170),
          },
        };
      case 5:
        return {
          references: {
            accountant: { name: 'A Person', firm: 'CPA LLC', phone: '8161112222', email: 'acct@example.com' },
            attorney: { name: 'B Person', firm: 'Law LLC', phone: '8163334444', email: 'atty@example.com' },
            bank: { name: 'C Person', bankName: 'Bank Inc', phone: '8165556666', email: 'bank@example.com' },
            business: [
              { name: 'Biz Ref 1', company: 'Co 1', phone: '8167778888', email: 'biz1@example.com' },
              { name: 'Biz Ref 2', company: 'Co 2', phone: '8169990000', email: 'biz2@example.com' },
            ],
            customer: [
              { name: 'Cust Ref 1', company: 'Cust Co 1', phone: '8161010101', email: 'cust1@example.com' },
              { name: 'Cust Ref 2', company: 'Cust Co 2', phone: '8162020202', email: 'cust2@example.com' },
            ],
            supplier: [
              { name: 'Supp Ref 1', company: 'Supp Co 1', phone: '8163030303', email: 'supp1@example.com' },
              { name: 'Supp Ref 2', company: 'Supp Co 2', phone: '8164040404', email: 'supp2@example.com' },
            ],
          },
        };
      case 6:
        return { uploads: { coverLetter: ['cover.pdf'], orgChart: ['org.pdf'], personalBioOrResume: ['bio.pdf'], businessDescription: ['desc.pdf'], releaseGeneral: ['gen.pdf'], releaseInfoAuthorization: ['auth.pdf'], releaseApplicationInfo: ['app.pdf'], headshot: ['head.jpg'] } };
      case 7:
        return { signature: { typedName: 'Jane Doe', consent: true, drawn: '', method: 'typed', timestamp: new Date().toISOString(), ip: '127.0.0.1' } };
      default:
        return {};
    }
  };

  const menteeAllData = () => {
    let data: any = {};
    for (let i = 0; i <= 7; i++) data = { ...data, ...menteeStepPatch(i) };
    return { ...form.getValues(), ...data };
  };

  const autofillThisStep = () => form.reset({ ...form.getValues(), ...menteeStepPatch(currentStep) });
  const autofillAndNext = async () => { autofillThisStep(); await handleNext(); };
  const autofillAllSteps = () => form.reset(menteeAllData());

  return (
    <Layout>
      <div className="container mx-auto py-8 max-w-6xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">HEMP Mentee Application</h1>
          <p className="text-muted-foreground text-center">
            Complete your application to join the HEMP mentee program
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