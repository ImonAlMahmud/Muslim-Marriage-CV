import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { biodataSchema, BiodataFormValues } from './utils/validators';
import { INITIAL_BIODATA } from './types';
import { BiodataForm } from './components/form/BiodataForm';
import { LivePreview } from './components/preview/LivePreview';
import { ProgressBar } from './components/ProgressBar';
import { Button, cn } from './components/ui/Button';
import { FileDown, Printer, ShieldCheck, Heart, Moon, Sun, Menu, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2pdf from 'html2pdf.js';
import confetti from 'canvas-confetti';

export default function App() {
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const methods = useForm<BiodataFormValues>({
    resolver: zodResolver(biodataSchema),
    defaultValues: INITIAL_BIODATA as any,
    mode: 'onChange',
  });

  const { watch, handleSubmit } = methods;
  const fullName = watch('fullName');

  const handleDownloadPDF = async () => {
    const element = document.getElementById('pdf-content');
    if (!element) return;

    setIsGenerating(true);
    const opt = {
      margin: 10,
      filename: `Muslim_Marriage_CV_${fullName || 'Unnamed'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Add a special effect when form is completed
  React.useEffect(() => {
    const requiredFields = [
        'fullName', 'gender', 'dob', 'presentAddress', 'permanentAddress',
        'contactNumber', 'religion', 'highestQualification', 'occupation',
        'fatherName', 'motherName', 'familyBackground', 'personality',
        'prefReligiousQualities', 'selfDescription'
    ];
    const data = watch();
    const completedRequiredCount = requiredFields.filter(field => {
        const value = data[field as keyof BiodataFormValues];
        return value && (typeof value === 'string' ? value.length > 0 : true);
    }).length;

    if (completedRequiredCount === requiredFields.length) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#064e3b', '#B08968', '#f0fdf4']
        });
    }
  }, [fullName]); // Simplified trigger for demo

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-ivory bg-pattern selection:bg-emerald/10 selection:text-emerald">
        {/* Navigation / Header */}
        <header className="bg-white/70 backdrop-blur-lg border-b border-slate-100 sticky top-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald rounded-2xl flex items-center justify-center shadow-lg shadow-emerald/20">
                <Heart className="text-white w-5 h-5 fill-current" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-emerald leading-none">Nikah CV</h2>
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Marriage Biodata Maker</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-emerald/5 rounded-full border border-emerald/10 text-emerald">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Privacy Guaranteed / শতভাগ গোপনীয়তা</span>
               </div>
               <Button variant="primary" onClick={handleDownloadPDF} isLoading={isGenerating}>
                  <FileDown className="w-4 h-4" />
                  Download PDF
               </Button>
               <Button variant="secondary" onClick={handlePrint}>
                  <Printer className="w-4 h-4" />
                  Print
               </Button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => setIsMobilePreviewOpen(!isMobilePreviewOpen)}>
                    {isMobilePreviewOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <section className="mb-16 text-center max-w-2xl mx-auto">
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
             >
                <Badge variant="success" className="mb-4 py-1.5 px-4 rounded-xl border border-emerald/20">
                    Trusted by Thousands of Families
                </Badge>
                <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-emerald mb-6 leading-[1.1]">
                    Create a Respectful Marriage Biodata Instantly
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed font-medium">
                    Build a beautiful, professional, and family-shareable Muslim marriage CV in minutes — with complete privacy. <span className="text-emerald font-bold">No data is saved on our servers.</span>
                </p>
                
                <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
                   <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald animate-pulse"></span>
                      No Database
                   </div>
                   <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald animate-pulse"></span>
                      Client-Side Generation
                   </div>
                   <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald animate-pulse"></span>
                      Family Friendly
                   </div>
                </div>
             </motion.div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Section */}
            <div className="lg:col-span-7">
               <ProgressBar />
               <BiodataForm />
            </div>

            {/* Preview Section - Sticky Desktop */}
            <div className="hidden lg:block lg:col-span-5">
               <LivePreview />
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-slate-100 py-12 px-6 mt-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Moon className="w-5 h-5 text-emerald" />
                            <span className="text-lg font-serif font-bold text-emerald">Nikah CV Maker</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium">
                            A privacy-first tool dedicated to helping the Ummah find suitable life partners through respectful and professional representation.
                        </p>
                    </div>

                    <div className="bg-ivory-dark/50 p-6 rounded-2xl border border-slate-200/50">
                        <h4 className="text-sm font-bold text-emerald uppercase tracking-widest mb-3 flex items-center gap-2">
                           <ShieldCheck className="w-4 h-4" /> Privacy First
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            Your information is not stored anywhere. All data stays in your browser memory and is cleared upon closing the tab. The PDF is generated locally on your device.
                        </p>
                        <p className="text-xs text-slate-500 mt-2 font-bengali font-bold">
                            আপনার তথ্য কোথাও সংরক্ষণ করা হয় না। ব্রাউজার বন্ধ করলেই সব তথ্য মুছে যাবে।
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Made with Heart for the Ummah</p>
                        <p className="text-[10px] text-slate-300 mt-1">© 2024 Muslim Marriage CV Maker. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>

        {/* Mobile Preview Modal */}
        <AnimatePresence>
            {isMobilePreviewOpen && (
                <motion.div
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-[60] bg-ivory md:hidden overflow-y-auto"
                >
                    <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex items-center justify-between z-10">
                         <Button variant="ghost" size="sm" onClick={() => setIsMobilePreviewOpen(false)}>
                            <X className="w-5 h-5 mr-1" /> Close
                         </Button>
                         <div className="flex items-center gap-2">
                            <Button size="sm" onClick={handleDownloadPDF} isLoading={isGenerating}>
                                <FileDown className="w-4 h-4 mr-1" /> Save PDF
                            </Button>
                         </div>
                    </div>
                    <div className="p-4">
                        <LivePreview />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </FormProvider>
  );
}

const Badge = ({ children, variant = 'default', className }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'error' | 'outline', className?: string }) => {
    const styles = {
      default: 'bg-slate-100 text-slate-600',
      success: 'bg-emerald/10 text-emerald',
      warning: 'bg-amber/10 text-amber-700',
      error: 'bg-rose-50 text-rose-600',
      outline: 'border border-slate-200 text-slate-500',
    };
  
    return (
      <span
        className={cn(
          'px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5',
          styles[variant],
          className
        )}
      >
        {children}
      </span>
    );
  };
