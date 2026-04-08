import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Biodata } from '../../types';
import { User, Phone, MapPin, Mail, Calendar, Ruler, Droplets, Heart, GraduationCap, Briefcase, Home, Shield, Sparkles, MessageSquare, HeartHandshake, Info } from 'lucide-react';
import { cn } from '../ui/Button';

export const LivePreview = () => {
    const { watch } = useFormContext<Biodata>();
    const data = watch();

    const SectionHeader = ({ title, icon: Icon }: { title: string; icon: any }) => (
        <div className="flex items-center gap-3 border-b-2 border-emerald/10 pb-2 mb-4 mt-8 first:mt-0">
            <div className="w-8 h-8 rounded-lg bg-emerald/5 flex items-center justify-center text-emerald">
                <Icon className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-serif font-bold text-emerald uppercase tracking-wider">{title}</h3>
        </div>
    );

    const DataRow = ({ label, value, bnLabel }: { label: string; value?: string | string[]; bnLabel?: string }) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return null;
        return (
            <div className="grid grid-cols-3 py-2 border-b border-slate-50 last:border-0 group">
                <div className="col-span-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tight group-hover:text-emerald transition-colors">{label}</span>
                    {bnLabel && <span className="block text-[10px] font-medium text-slate-300 font-bengali leading-none">{bnLabel}</span>}
                </div>
                <div className="col-span-2 text-sm font-medium text-slate-700 leading-relaxed break-words whitespace-pre-wrap">
                    {Array.isArray(value) ? value.join(', ') : value}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden sticky top-6 max-h-[calc(100vh-48px)] flex flex-col">
            {/* Document Header */}
            <div className="bg-emerald p-8 text-center relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <MoonScale className="w-24 h-24 text-white rotate-12" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-ivory mb-1">
                    {data.fullName || "Your Full Name"}
                </h1>
                <p className="text-emerald-100/80 text-sm font-medium tracking-[0.2em] uppercase">
                    Marriage Biodata | জীবনবৃত্তান্ত
                </p>
                {data.gender && (
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm text-xs font-bold text-white uppercase tracking-widest">
                        {data.gender} Profile
                    </div>
                )}
            </div>

            {/* Document Body */}
            <div className="p-10 overflow-y-auto custom-scrollbar-slim bg-[#FFFFFF] flex-1">
                <div id="pdf-content">
                    <section>
                        <SectionHeader title="Basic Information" icon={User} />
                        <div className="space-y-1">
                            <DataRow label="Age" value={data.age} bnLabel="বয়স" />
                            <DataRow label="Date of Birth" value={data.dob} bnLabel="জন্মতারিখ" />
                            <DataRow label="Height" value={data.height} bnLabel="উচ্চতা" />
                            <DataRow label="Marital Status" value={data.maritalStatus} bnLabel="বৈবাহিক অবস্থা" />
                            <DataRow label="Blood Group" value={data.bloodGroup} bnLabel="রক্তের গ্রুপ" />
                            <DataRow label="Nationality" value={data.nationality} bnLabel="জাতীয়তা" />
                            <DataRow label="Present Address" value={data.presentAddress} bnLabel="বর্তমান ঠিকানা" />
                            <DataRow label="Permanent Address" value={data.permanentAddress} bnLabel="স্থায়ী ঠিকানা" />
                            <DataRow label="Contact Number" value={data.contactNumber} bnLabel="মোবাইল নম্বর" />
                            <DataRow label="Email" value={data.email} bnLabel="ইমেইল" />
                        </div>
                    </section>

                    <section>
                        <SectionHeader title="Religious Information" icon={Shield} />
                        <div className="space-y-1">
                            <DataRow label="Orientation" value={data.orientation} bnLabel="আকীদা / মানহাজ" />
                            <DataRow label="Madhhab" value={data.madhhab} bnLabel="মাযহাব" />
                            <DataRow label="Salah" value={data.salahStatus} bnLabel="সালাত" />
                            <DataRow label="Quran" value={data.quranAbility} bnLabel="কুরআন তিলাওয়াত" />
                            <DataRow label="Attire" value={data.dressStatus} bnLabel="পর্দা / দাড়ি" />
                            <DataRow label="Islamic Education" value={data.religiousBackground} bnLabel="দ্বীনি ব্যাকগ্রাউন্ড" />
                            <DataRow label="Islamic Lifestyle" value={data.lifestyleSummary} bnLabel="জীবনচর্চা" />
                        </div>
                    </section>

                    <section>
                        <SectionHeader title="Education & Profession" icon={GraduationCap} />
                        <div className="space-y-1">
                            <DataRow label="Highest Degree" value={data.highestQualification} bnLabel="যোগ্যতা" />
                            <DataRow label="Institution" value={data.institution} bnLabel="প্রতিষ্ঠান" />
                            <DataRow label="Subject" value={data.subject} bnLabel="বিভাগ" />
                            <DataRow label="Occupation" value={data.occupation} bnLabel="পেশা" />
                            <DataRow label="Job Title" value={data.jobTitle} bnLabel="পদবী" />
                            <DataRow label="Workplace" value={data.workplace} bnLabel="প্রতিষ্ঠানের নাম" />
                            <DataRow label="Summary" value={data.careerSummary} bnLabel="সংক্ষিপ্ত বিবরণ" />
                        </div>
                    </section>

                    <section>
                        <SectionHeader title="Family Information" icon={Home} />
                        <div className="space-y-1">
                            <DataRow label="Father" value={data.fatherName} bnLabel="পিতার নাম" />
                            <DataRow label="Father's Job" value={data.fatherOccupation} bnLabel="পিতার পেশা" />
                            <DataRow label="Mother" value={data.motherName} bnLabel="মাতার নাম" />
                            <DataRow label="Mother's Job" value={data.motherOccupation} bnLabel="মাতার পেশা" />
                            <DataRow label="Siblings" value={(data.brothersCount || data.sistersCount) ? `${data.brothersCount} Brother(s), ${data.sistersCount} Sister(s)` : undefined} bnLabel="ভাই-বোন" />
                            <DataRow label="Family Type" value={data.familyType} bnLabel="পরিবারের ধরন" />
                            <DataRow label="Background" value={data.familyBackground} bnLabel="পরিবার সম্পর্কে" />
                        </div>
                    </section>

                    <section>
                        <SectionHeader title="Personal Overview" icon={Sparkles} />
                        <div className="space-y-1">
                            <DataRow label="Personality" value={data.personality} bnLabel="ব্যক্তিত্ব" />
                            <DataRow label="Complexion" value={data.complexion} bnLabel="গায়ের রং" />
                            <DataRow label="Languages" value={data.languages} bnLabel="ভাষাজ্ঞান" />
                            <DataRow label="Hobbies" value={data.hobbies} bnLabel="শখ ও আগ্রহ" />
                            <DataRow label="Goals" value={data.futureGoals} bnLabel="ভবিষ্যৎ পরিকল্পনা" />
                        </div>
                    </section>

                    <section>
                        <SectionHeader title="Partner Expectations" icon={HeartHandshake} />
                        <div className="space-y-1">
                            <DataRow label="Preferred Traits" value={data.prefReligiousQualities} bnLabel="ধর্মীয় বৈশিষ্ট্য" />
                            <DataRow label="Education" value={data.prefEducation} bnLabel="শিক্ষাগত যোগ্যতা" />
                            <DataRow label="Occupation" value={data.prefOccupation} bnLabel="পেশা" />
                            <DataRow label="Location" value={data.prefLocation} bnLabel="অবস্থান" />
                            <DataRow label="Expectations" value={data.prefFamilyExpectations} bnLabel="প্রারিবারিক প্রত্যাশা" />
                            <DataRow label="Partner Vision" value={data.prefOther} bnLabel="জীবনসঙ্গী সম্পর্কে ভাবনা" />
                        </div>
                    </section>

                    <section>
                        <SectionHeader title="Additional Notes" icon={MessageSquare} />
                        <div className="space-y-1">
                            <DataRow label="Self Intro" value={data.selfDescription} bnLabel="সংক্ষেপে নিজের সম্পর্কে" />
                            <DataRow label="Why Marriage" value={data.marriageReason} bnLabel="বিয়ে করার কারণ" />
                            <DataRow label="Notes" value={data.specialNotes} bnLabel="বিশেষ দ্রষ্টব্য" />
                        </div>
                    </section>

                    {data.customFields && data.customFields.length > 0 && (
                        <section>
                            <SectionHeader title="Other Information" icon={Info} />
                            <div className="space-y-1">
                                {data.customFields.map((field) => (
                                    <DataRow key={field.id} label={field.label} value={field.value} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="mt-12 text-center border-t border-slate-100 pt-8 opacity-40 italic text-[10px] text-slate-400">
                    Generated via Muslim Marriage CV Maker
                </div>
            </div>
        </div>
    );
};

const MoonScale = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
