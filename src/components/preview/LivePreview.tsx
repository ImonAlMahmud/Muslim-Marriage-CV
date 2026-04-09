import React, { useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { BiodataFormValues } from '../../utils/validators';
import { User, ShieldCheck, Briefcase, Sparkles, Heart } from 'lucide-react';

const THEMES = {
  classic: { primary: '#064e3b', secondary: '#B08968', icon: '#FDFCF8', name: 'Classic Emerald', uiPrimary: '#064e3b', uiBg: '#fcf9f2', isDark: false },
  modern: { primary: '#022c22', secondary: '#2dd4bf', icon: '#ffffff', name: 'Emerald Night', uiPrimary: '#14b8a6', uiBg: '#011511', isDark: true },
  gold: { primary: '#634832', secondary: '#d4af37', icon: '#d4af37', name: 'Gold Royale', uiPrimary: '#634832', uiBg: '#fdfcf8', isDark: false }
} as const;

interface LivePreviewProps {
  theme?: keyof typeof THEMES;
  pageSize?: 'a4' | 'legal';
  scale?: number;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ 
  theme = 'classic', 
  pageSize = 'a4',
  scale = 0.65 
}) => {
  const { watch } = useFormContext<BiodataFormValues>();
  const data = watch();
  
  const themeColors = THEMES[theme] || THEMES.classic;
  const isDark = themeColors.isDark;
  const heightClass = pageSize === 'legal' ? 'min-h-[356mm]' : 'min-h-[297mm]';
  const borderSize = pageSize === 'legal' ? 'border-[14px]' : 'border-[12px]';

  // QR Generation Logic
  const qrFields = [
    `Verified Muslim Marriage CV`,
    `Name: ${data.fullName || 'User'}`,
    `Gender: ${data.gender || 'N/A'}`,
    `Religion: ${data.religion || 'Islam'}`,
    `Qualification: ${data.highestQualification || 'N/A'}`,
    `Occupation: ${data.occupation || 'N/A'}`,
    data.contactNumber ? `Contact: ${data.contactNumber}` : ''
  ].filter(Boolean).join('\n');
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrFields)}`;

  return (
    <div className="no-print origin-top transition-transform duration-500" style={{ transform: `scale(${scale})` }}>
      <div 
        id="pdf-content"
        className={`w-[210mm] ${heightClass} paper-shadow relative overflow-hidden bg-pattern font-sans ${borderSize} transition-all duration-500 ${isDark ? 'bg-[#022c22] text-white' : 'bg-[#fcfaf4] text-slate-800'}`} 
        style={{ borderColor: themeColors.primary }}
      >
        <div className="absolute inset-1.5 border-[2px] border-double pointer-events-none" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : `${themeColors.secondary}44` }}></div>
        
        {/* QR Code */}
        <div className="absolute top-10 right-10 z-20 print:top-12 print:right-12">
            <div className={`p-2 rounded-2xl shadow-md border ${isDark ? 'bg-slate-900/50 border-white/5' : 'bg-white border-slate-100/50'}`}>
                <div className="relative">
                    <img src={qrUrl} className={`w-20 h-20 ${isDark ? 'invert opacity-90' : 'opacity-90'}`} alt="QR Verification" />
                    <div className="absolute inset-0 border border-current opacity-10 rounded-sm"></div>
                </div>
                <p className={`text-[6px] font-black uppercase tracking-tighter text-center mt-1.5 ${isDark ? 'text-teal-400' : 'text-slate-400'}`}>Verified MMCV Studio</p>
            </div>
        </div>

        <div className="p-[12mm] relative z-10 flex flex-col h-full">
            {/* Elegant Header */}
            <div className="mb-12 relative text-left">
                <p className="font-arabic text-2xl mb-8 opacity-80 select-none text-center" style={{ color: themeColors.secondary }}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                
                <div className="flex items-center gap-10">
                    {data.profilePhoto && (
                        <div className={`w-40 h-40 rounded-[3rem] border-[6px] shadow-2xl overflow-hidden flex items-center justify-center flex-shrink-0 ${isDark ? 'border-[#115e59] bg-slate-900' : 'border-white bg-white'}`}>
                            <img src={data.profilePhoto} className="w-full h-full object-cover" alt="Profile" />
                        </div>
                    )}
                    <div className="flex-1">
                        <h1 className="text-5xl font-serif font-black mb-4 tracking-tighter drop-shadow-sm uppercase leading-[0.9]" style={{ color: isDark ? 'white' : themeColors.primary }}>
                            {data.fullName || "Marriage Biodata"}
                        </h1>
                        <div className="flex items-center gap-3">
                            <div className="h-[2px] w-12" style={{ backgroundColor: themeColors.secondary }}></div>
                            <p className="text-[11px] font-black uppercase tracking-[0.4em] opacity-80" style={{ color: themeColors.secondary }}>
                                Premium Profile | <span className="font-bengali">জীবনবৃত্তান্ত</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-1 flex-1">
                <CVSection title="Basic Attributes" icon={<User className="w-4 h-4" />} themeColors={themeColors}>
                    <div className="grid grid-cols-2 gap-x-10">
                        <CVDataRow label="Gender" value={data.gender} themeColors={themeColors} />
                        <CVDataRow label="Birth Date" value={data.dob} themeColors={themeColors} />
                        <CVDataRow label="Height" value={data.height} themeColors={themeColors} />
                        <CVDataRow label="Marital Status" value={data.maritalStatus} themeColors={themeColors} />
                        <CVDataRow label="Nationality" value={data.nationality} themeColors={themeColors} />
                        <CVDataRow label="Contact Num" value={data.contactNumber} themeColors={themeColors} />
                        <CVDataRow label="Email" value={data.email} themeColors={themeColors} />
                    </div>
                    <CVDataRow label="Full Address" value={data.presentAddress} themeColors={themeColors} />
                </CVSection>

                <CVSection title="Religious Identity" icon={<ShieldCheck className="w-4 h-4" />} themeColors={themeColors}>
                    <div className="grid grid-cols-2 gap-x-10">
                        <CVDataRow label="Religion" value={data.religion} themeColors={themeColors} />
                        <CVDataRow label="Orientation" value={data.orientation} themeColors={themeColors} />
                        <CVDataRow label="Daily Salah" value={data.salahStatus} themeColors={themeColors} />
                        <CVDataRow label="Quranic Literacy" value={data.quranAbility} themeColors={themeColors} />
                    </div>
                </CVSection>

                <CVSection title="Education & Professional" icon={<Briefcase className="w-4 h-4" />} themeColors={themeColors}>
                    <div className="grid grid-cols-2 gap-x-10">
                        <CVDataRow label="Qualification" value={data.highestQualification} themeColors={themeColors} />
                        <CVDataRow label="Current Role" value={data.occupation} themeColors={themeColors} />
                    </div>
                </CVSection>

                <CVSection title="Personal Vision" icon={<Sparkles className="w-4 h-4" />} themeColors={themeColors}>
                    <div className={`p-4 border-[2px] border-double rounded-xl text-[10px] leading-relaxed italic whitespace-pre-wrap break-words ${isDark ? 'bg-slate-900/40 border-white/10 text-slate-300' : 'bg-white/40 border-[#B08968]/20 text-slate-600'}`}>
                        "{data.prefReligiousQualities || 'Looking for a life partner who is respectful and family-oriented.'}"
                    </div>
                    {data.selfDescription && (
                        <div className="mt-3 text-[10px] leading-tight font-serif font-medium opacity-90 italic text-center whitespace-pre-wrap break-words" style={{ color: isDark ? themeColors.secondary : themeColors.primary }}>
                            -- {data.selfDescription} --
                        </div>
                    )}
                </CVSection>

                {data.customFields && data.customFields.length > 0 && (
                    <CVSection title="Additional Information" icon={<Heart className="w-4 h-4" />} themeColors={themeColors}>
                        <div className="grid grid-cols-2 gap-x-10">
                            {data.customFields.map((field) => (
                                <CVDataRow key={field.id} label={field.label} value={field.value} themeColors={themeColors} />
                            ))}
                        </div>
                    </CVSection>
                )}
            </div>

            <div className="mt-auto pt-6 flex flex-col items-center opacity-40">
                <div className="w-12 h-[1.5px] mb-3" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : themeColors.secondary }}></div>
                <div className="flex justify-between w-full px-2 text-[7px] font-black uppercase tracking-[0.3em]" style={{ color: isDark ? 'white' : themeColors.primary }}>
                    <span>{themeColors.name.toUpperCase()} EDITION</span>
                    <span>PRIVATE & SECURE</span>
                    <span>BY IDEOMET TECHNOLOGIES</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const CVSection = ({ title, icon, children, themeColors }: any) => {
  const isDark = themeColors.isDark;
  return (
    <div className="mb-6 break-inside-avoid">
      <div className="flex items-center gap-3 mb-4 group">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md transition-transform" style={{ backgroundColor: isDark ? '#2dd4bf' : themeColors.primary, color: isDark ? '#011511' : themeColors.icon }}>
          {icon}
        </div>
        <div className="flex-1 border-b-[2px] border-double pb-1.5" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : `${themeColors.primary}22` }}>
          <h4 className="text-sm font-serif font-black uppercase tracking-[0.15em] relative top-[1px]" style={{ color: isDark ? 'white' : themeColors.primary }}>{title}</h4>
        </div>
      </div>
      <div className="pl-1 space-y-0.5">{children}</div>
    </div>
  );
};

const CVDataRow = ({ label, value, themeColors }: any) => {
  if (!value) return null;
  const isDark = themeColors.isDark;
  return (
    <div className="flex py-1.5 border-b border-[#064e3b]/5 last:border-0 items-baseline gap-2" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : `${themeColors.primary}11` }}>
      <span className="w-[38%] text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: isDark ? '#2dd4bf' : themeColors.secondary }}>{label}</span>
      <span className={`w-[62%] text-[11px] font-semibold leading-tight whitespace-pre-wrap break-words ${isDark ? 'text-slate-100' : 'text-slate-700'}`}>{value}</span>
    </div>
  );
};
