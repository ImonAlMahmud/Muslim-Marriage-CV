import React, { useState, useEffect, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { biodataSchema, BiodataFormValues } from './utils/validators';
import { INITIAL_BIODATA } from './types';
import { BiodataForm } from './components/form/BiodataForm';
import { LivePreview } from './components/preview/LivePreview';
import { Button, cn } from './components/ui/Button';
import { Printer, ShieldCheck, Heart, Moon, Sun, Menu, X, Sparkles, Loader2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const THEMES = {
  classic: { primary: '#064e3b', secondary: '#B08968', icon: '#FDFCF8', name: 'Classic Emerald', uiPrimary: '#064e3b', uiBg: '#fcf9f2', isDark: false },
  modern: { primary: '#022c22', secondary: '#2dd4bf', icon: '#ffffff', name: 'Emerald Night', uiPrimary: '#14b8a6', uiBg: '#011511', isDark: true },
  gold: { primary: '#634832', secondary: '#d4af37', icon: '#d4af37', name: 'Gold Royale', uiPrimary: '#634832', uiBg: '#fdfcf8', isDark: false }
} as const;

type ThemeKey = keyof typeof THEMES;

const SAMPLE_BIODATA: Partial<BiodataFormValues> = {
  fullName: 'Ibrahim Khalil',
  gender: 'Male' as any,
  dob: '1995-05-15',
  height: "5'10\"",
  maritalStatus: 'Unmarried' as any,
  nationality: 'Bangladeshi',
  presentAddress: 'Dhanmondi, Dhaka',
  contactNumber: '01700-000000',
  email: 'ibrahim.khalil@email.com',
  religion: 'Islam',
  orientation: 'Sunni',
  salahStatus: '5 times regularly',
  quranAbility: 'Can read fluently',
  highestQualification: "Bachelor's",
  occupation: 'Software Engineer',
  fatherName: 'Late Abdur Rahman',
  motherName: 'Maryam Begum',
  familyBackground: 'Respectable family focusing on deen and education.',
  personality: 'Calm and family-oriented.',
  prefReligiousQualities: 'Should be regular in Salah and modest.',
  selfDescription: 'I try my best to live according to the Sunnah.',
  profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop'
};

export default function App() {
  const [theme, setTheme] = useState<ThemeKey>('classic');
  const [pageSize, setPageSize] = useState<'a4' | 'legal'>('a4');
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const themeColors = useMemo(() => THEMES[theme], [theme]);

  const methods = useForm<BiodataFormValues>({
    resolver: zodResolver(biodataSchema),
    defaultValues: INITIAL_BIODATA as any,
    mode: 'onChange',
  });

  const { watch, reset, setValue } = methods;
  const formData = watch();

  const progress = useMemo(() => {
    const required = ['fullName', 'gender', 'dob', 'presentAddress', 'contactNumber', 'religion', 'highestQualification', 'occupation'] as const;
    const completed = required.filter(f => formData[f]);
    return Math.round((completed.length / required.length) * 100);
  }, [formData]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFillSample = () => {
    reset(SAMPLE_BIODATA as any);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [themeColors.primary, themeColors.secondary]
    });
  };

  const handlePrint = async () => {
    setIsProcessing(true);
    setExportProgress(0);
    
    const duration = 1500;
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setExportProgress(percent);
      
      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          window.print();
        }, 300);
      }
    }, 50);
  };

  return (
    <FormProvider {...methods}>
      <div 
        className="min-h-screen transition-colors duration-500 overflow-x-hidden selection:bg-emerald-900/10 selection:text-emerald-900"
        style={{ backgroundColor: themeColors.uiBg }}
      >
        <style>{`@page { size: ${pageSize} portrait; margin: 0mm; }`}</style>
        
        <AnimatePresence>
          {isProcessing && <ProcessingModal progress={exportProgress} themeColors={themeColors} />}
        </AnimatePresence>

        {/* Studio Header */}
        <header 
          className={cn(
            "fixed top-0 left-0 right-0 z-[1000] px-4 sm:px-8 no-print transition-all duration-500 ease-in-out border-b",
            isScrolled ? "py-2 sm:py-3 shadow-lg backdrop-blur-3xl" : "py-3 sm:py-5 backdrop-blur-md"
          )}
          style={{ 
            backgroundColor: themeColors.isDark 
              ? (isScrolled ? `${themeColors.uiBg}ee` : `${themeColors.uiBg}cc`) 
              : (isScrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)'), 
            borderColor: themeColors.isDark 
              ? (isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)') 
              : `${themeColors.secondary}22` 
          }}
        >
          <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
            <LogoBespoke themeColors={themeColors} />
            
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Theme Selector */}
              <div className="hidden md:flex p-1 rounded-xl bg-slate-900/5 dark:bg-white/5 gap-1">
                {(Object.keys(THEMES) as ThemeKey[]).map((key) => (
                  <button 
                    key={key}
                    onClick={() => setTheme(key)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[9px] font-black transition-all flex items-center gap-2 uppercase tracking-widest",
                      theme === key ? "shadow-sm scale-105" : "opacity-70 hover:opacity-100"
                    )}
                    style={{ 
                      backgroundColor: theme === key ? (themeColors.isDark ? 'rgba(255,255,255,0.15)' : 'white') : 'transparent',
                      color: theme === key ? (themeColors.isDark ? 'white' : themeColors.primary) : (themeColors.isDark ? 'rgba(255,255,255,0.6)' : themeColors.primary)
                    }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: THEMES[key].primary }}></div>
                    {key}
                  </button>
                ))}
              </div>

              {/* Paper Size */}
              <div className="hidden sm:flex p-1 rounded-xl bg-slate-900/5 dark:bg-white/5">
                {(['a4', 'legal'] as const).map((size) => (
                  <button 
                    key={size}
                    onClick={() => setPageSize(size)} 
                    className={cn(
                      "px-4 py-2 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest",
                      pageSize === size ? "text-white shadow-md" : "opacity-70 hover:opacity-100"
                    )}
                    style={{ 
                      backgroundColor: pageSize === size ? themeColors.primary : 'transparent', 
                      color: pageSize === size ? 'white' : (themeColors.isDark ? 'rgba(255,255,255,0.6)' : `${themeColors.primary}88`) 
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button 
                onClick={handlePrint} 
                disabled={isProcessing}
                className="group relative px-6 py-3 sm:px-8 sm:py-4 text-white font-black rounded-xl sm:rounded-2xl transition-all overflow-hidden active:scale-95 shadow-xl flex-shrink-0"
                style={{ backgroundColor: themeColors.primary }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})` }}
                ></div>
                <div className="absolute inset-0 bg-shimmer animate-shimmer group-hover:block hidden opacity-10"></div>
                <div className="relative flex items-center justify-center gap-2 text-[10px] sm:text-xs">
                  {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4 transition-transform group-hover:-translate-y-1" />}
                  <span className="tracking-widest uppercase">
                    {isProcessing ? "PROCESSING..." : "PRINT / SAVE CV"}
                  </span>
                  {!isProcessing && <Sparkles className="w-3 h-3 animate-pulse hidden sm:block text-gold" />}
                </div>
              </button>

              {/* Mobile toggle */}
              <div className="lg:hidden">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => setIsMobilePreviewOpen(!isMobilePreviewOpen)}
                  className="rounded-xl"
                >
                  {isMobilePreviewOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Studio View */}
        <main className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
            
            {/* Left Column: Hero + Form */}
            <div className="space-y-12">
              <section className="text-left relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-900/5 rounded-full blur-3xl -z-10"></div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border rounded-full mb-6"
                    style={{ borderColor: `${themeColors.primary}22` }}
                  >
                    <ShieldCheck className="w-4 h-4" style={{ color: themeColors.primary }} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">100% In-Browser Privacy</span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-6xl font-serif font-black mb-6 leading-[1.1] tracking-tight">
                    <span style={{ color: themeColors.isDark ? 'white' : themeColors.primary }}>Marriage CV Generator,</span><br/>
                    <span style={{ color: themeColors.secondary }}>Beautifully Documented.</span>
                  </h1>

                  {/* High-Fidelity Progress Bar Section */}
                  <div 
                    className={cn(
                      "flex items-center justify-between gap-6 py-5 px-8 rounded-3xl border transition-all duration-300 mb-12",
                      themeColors.isDark ? "bg-slate-900/60 border-white/10 shadow-emerald-950/40" : "bg-white border-emerald-50/50 shadow-premium"
                    )}
                  >
                    <div className="flex-1">
                        <div className="flex justify-between items-end mb-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Progress / পূর্ণতা</span>
                            <span className="text-xl font-serif font-black" style={{ color: themeColors.isDark ? 'white' : themeColors.primary }}>{progress}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: themeColors.isDark ? 'rgba(255,255,255,0.1)' : `${themeColors.primary}11` }}>
                            <motion.div 
                              animate={{ width: `${progress}%` }} 
                              className="h-full" 
                              style={{ backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})` }}
                            ></motion.div>
                        </div>
                    </div>
                    <button 
                      type="button"
                      onClick={handleFillSample} 
                      className="text-[9px] font-black uppercase tracking-widest hover:underline flex items-center gap-2 transition-colors" 
                      style={{ color: themeColors.isDark ? '#2dd4bf' : themeColors.primary }}
                    >
                        <Zap className={cn("w-3 h-3", themeColors.isDark ? "text-[#2dd4bf]" : "")} /> Sample
                    </button>
                  </div>
                </motion.div>
              </section>

              <div className="relative">
                 <BiodataForm singlePage theme={theme} />
              </div>
            </div>

            {/* Right Column: Previews (Sticky) */}
            <div className="hidden lg:block sticky top-32">
               <div className="flex flex-col items-center">
                  <div className="w-full flex justify-between items-center mb-6 px-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Live Studio Preview</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{pageSize.toUpperCase()} Single Page Layout</span>
                  </div>
                  <LivePreview theme={theme} pageSize={pageSize} />
               </div>
            </div>
          </div>
        </main>

        {/* Mobile View Sidebar */}
        <AnimatePresence>
          {isMobilePreviewOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 z-[2000] bg-ivory lg:hidden overflow-y-auto pt-24 px-4 pb-10"
              style={{ backgroundColor: themeColors.uiBg }}
            >
               <div className="flex flex-col items-center gap-8">
                  <div className="w-full flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-slate-200/50 shadow-sm">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Preview Mode</span>
                    <button onClick={() => setIsMobilePreviewOpen(false)} className="text-xs font-bold text-rose-500">Close</button>
                  </div>
                  <LivePreview theme={theme} pageSize={pageSize} scale={0.9} />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FormProvider>
  );
}

const LogoBespoke = ({ themeColors }: { themeColors: any }) => (
  <div className="flex items-center gap-4 group cursor-pointer text-left">
    <div className="relative w-11 h-11 sm:w-13 sm:h-13">
      <div 
        className="absolute inset-0 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-emerald-950/20" 
        style={{ backgroundColor: themeColors.primary }}
      ></div>
      <div 
        className="absolute inset-0 bg-white border-2 rounded-2xl flex items-center justify-center transform group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform duration-500 overflow-hidden" 
        style={{ borderColor: themeColors.primary }}
      >
        <div className="absolute inset-0 opacity-[0.03] bg-pattern"></div>
        <Heart className="w-6 h-6 fill-current relative z-10" style={{ color: themeColors.primary }} />
      </div>
    </div>
    <div className="min-w-0">
      <div className="flex items-baseline gap-1.5 leading-tight">
        <h2 className="text-lg sm:text-2xl font-serif font-black tracking-tighter" style={{ color: themeColors.isDark ? 'white' : themeColors.primary }}>Nikah CV</h2>
        <span className="text-[10px] sm:text-xs font-serif font-medium hidden xs:inline" style={{ color: themeColors.secondary }}>Studio</span>
      </div>
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] leading-none mt-1 hidden sm:block" style={{ color: themeColors.isDark ? 'rgba(255,255,255,0.4)' : `${themeColors.secondary}aa` }}>By Ideomet Technologies</p>
    </div>
  </div>
);

const ProcessingModal = ({ progress, themeColors }: { progress: number, themeColors: any }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }} 
    className="fixed inset-0 z-[6000] flex items-center justify-center px-4 backdrop-blur-xl bg-emerald-900/30 no-print"
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }} 
      animate={{ scale: 1, y: 0 }} 
      className="max-w-md w-full bg-white rounded-[3rem] p-10 sm:p-14 shadow-2xl border-[12px] border-ivory text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.05] bg-pattern rotate-12 scale-150"></div>
      <div className="relative z-10">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10 relative">
          <div className="absolute inset-0 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin"></div>
          <Sparkles className="w-10 h-10 text-emerald-900" />
        </div>
        
        <h2 className="text-3xl font-serif font-black text-emerald-900 mb-4 tracking-tight">Studio Preparation</h2>
        <p className="text-xs font-black text-gold uppercase tracking-[0.3em] mb-10">Ready for High-Quality Export!</p>
        
        <div className="relative h-4 bg-emerald-50 rounded-full overflow-hidden shadow-inner mb-6 border border-emerald-100">
          <motion.div 
            animate={{ width: `${progress}%` }} 
            className="absolute inset-0 bg-gradient-to-r from-emerald-900 via-emerald-800 to-gold animate-shimmer" 
            style={{ backgroundSize: '200% 100%' }}
            transition={{ duration: 0.2 }}
          ></motion.div>
        </div>
        
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 pr-2">
          <span>Progress</span>
          <span className="text-emerald-900">{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  </motion.div>
);
