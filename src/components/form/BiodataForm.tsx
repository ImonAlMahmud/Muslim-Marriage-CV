import React from 'react';
import { useFormContext } from 'react-hook-form';
import { BiodataFormValues } from '../../utils/validators';
import { BasicInfo } from './sections/BasicInfo';
import { ReligiousInfo } from './sections/ReligiousInfo';
import { EducationProfession } from './sections/EducationProfession';
import { FamilyInfo } from './sections/FamilyInfo';
import { PersonalOverview } from './sections/PersonalOverview';
import { MarriagePreferences } from './sections/MarriagePreferences';
import { AdditionalNotes } from './sections/AdditionalNotes';
import { CustomFields } from './sections/CustomFields';
import { User, ShieldCheck, GraduationCap, Users, Sparkles, Heart, FileText, Plus } from 'lucide-react';
import { PhotoUpload } from './sections/PhotoUpload'; // I'll need to check if this exists or create it

const THEMES = {
  classic: { primary: '#064e3b', secondary: '#B08968', uiBg: '#fcf9f2', isDark: false },
  modern: { primary: '#022c22', secondary: '#2dd4bf', uiBg: '#011511', isDark: true },
  gold: { primary: '#634832', secondary: '#d4af37', uiBg: '#fdfcf8', isDark: false }
} as const;

interface BiodataFormProps {
  singlePage?: boolean;
  theme?: keyof typeof THEMES;
}

export const BiodataForm: React.FC<BiodataFormProps> = ({ theme = 'classic' }) => {
  const { watch, setValue } = useFormContext<BiodataFormValues>();
  const profilePhoto = watch('profilePhoto');
  const isDark = (THEMES[theme] || THEMES.classic).isDark;

  return (
    <div className="space-y-12 pb-20">
      {/* Photo Section */}
      <div className={cn("card-premium p-6 sm:p-10", isDark ? "bg-[#042f2e]/40 border-white/5" : "")}>
         <PhotoUpload 
            value={profilePhoto} 
            onChange={(val) => setValue('profilePhoto', val)} 
            theme={theme}
         />
      </div>

      <FormCard 
        title="Identity" 
        bnTitle="সাধারণ তথ্য" 
        icon={<User className="w-6 h-6" />} 
        theme={theme}
      >
        <BasicInfo />
      </FormCard>

      <FormCard 
        title="Religious Identity" 
        bnTitle="ধর্মীয় তথ্য" 
        icon={<ShieldCheck className="w-6 h-6" />} 
        theme={theme}
      >
        <ReligiousInfo />
      </FormCard>

      <FormCard 
        title="Education & Profession" 
        bnTitle="শিক্ষা ও পেশা" 
        icon={<GraduationCap className="w-6 h-6" />} 
        theme={theme}
      >
        <EducationProfession />
      </FormCard>

      <FormCard 
        title="Family Information" 
        bnTitle="পারিবারিক তথ্য" 
        icon={<Users className="w-6 h-6" />} 
        theme={theme}
      >
        <FamilyInfo />
      </FormCard>

      <FormCard 
        title="Personal Overview" 
        bnTitle="ব্যক্তিগত তথ্য" 
        icon={<Sparkles className="w-6 h-6" />} 
        theme={theme}
      >
        <PersonalOverview />
      </FormCard>

      <FormCard 
        title="Marriage Preferences" 
        bnTitle="বিবাহের পছন্দ" 
        icon={<Heart className="w-6 h-6" />} 
        theme={theme}
      >
        <MarriagePreferences />
      </FormCard>

      <FormCard 
        title="Additional Notes" 
        bnTitle="অন্যান্য তথ্য" 
        icon={<FileText className="w-6 h-6" />} 
        theme={theme}
      >
        <AdditionalNotes />
      </FormCard>

      <FormCard 
        title="Custom Fields" 
        bnTitle="অতিরিক্ত তথ্য" 
        icon={<Plus className="w-6 h-6" />} 
        theme={theme}
      >
        <CustomFields />
      </FormCard>
    </div>
  );
};

interface FormCardProps {
  title: string;
  bnTitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  theme?: keyof typeof THEMES;
}

const FormCard: React.FC<FormCardProps> = ({ title, bnTitle, icon, children, theme = 'classic' }) => {
  const themeColors = THEMES[theme] || THEMES.classic;
  const isDark = themeColors.isDark;
  
  return (
    <div className={cn(
      "card-premium p-6 sm:p-10 transition-all duration-500",
      isDark ? "bg-[#042f2e]/40 border-white/5" : ""
    )}>
      <div className="flex items-center gap-6 mb-10">
        <div 
          className={cn(
            "w-14 h-14 sm:w-16 sm:h-16 rounded-[1.75rem] flex items-center justify-center shadow-xl transform hover:rotate-6 transition-transform relative overflow-hidden",
            isDark ? "bg-teal-500 text-slate-900 shadow-teal-500/20" : "bg-emerald-900 text-gold shadow-emerald-950/20"
          )}
        >
          <div className="absolute inset-0 opacity-10 bg-pattern"></div>
          <div className="relative z-10">{icon}</div>
        </div>
        <div>
          <span 
            className={cn(
              "text-[10px] font-black uppercase tracking-[0.3em] block mb-0.5 opacity-60 font-bengali",
              isDark ? "text-teal-400" : "text-gold"
            )}
          >
            {bnTitle}
          </span>
          <h3 className={cn(
            "text-2xl sm:text-3xl font-serif font-black tracking-tight",
            isDark ? "text-white" : "text-emerald-900"
          )}>
            {title}
          </h3>
        </div>
      </div>
      <div className="space-y-8">{children}</div>
    </div>
  );
};

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
