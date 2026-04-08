import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { CheckCircle2, CircleDashed } from 'lucide-react';

export const ProgressBar = () => {
    const { watch, formState: { errors } } = useFormContext();
    const data = watch();

    // Required fields mapping for overall progress
    const requiredFields = [
        'fullName', 'gender', 'dob', 'presentAddress', 'permanentAddress',
        'contactNumber', 'religion', 'highestQualification', 'occupation',
        'fatherName', 'motherName', 'familyBackground', 'personality',
        'prefReligiousQualities', 'selfDescription'
    ];

    const completedRequiredCount = requiredFields.filter(field => {
        const value = data[field as keyof typeof data];
        return value && (typeof value === 'string' ? value.length > 0 : true);
    }).length;

    const totalCount = requiredFields.length;
    const progressPercentage = Math.round((completedRequiredCount / totalCount) * 100);

    const getStatusMessage = () => {
        if (progressPercentage === 100) return 'Profile Complete! 🎉 / সম্পন্ন হয়েছে';
        if (progressPercentage > 70) return 'Almost there! 🚀 / প্রায় শেষ';
        if (progressPercentage > 30) return 'Doing great! / ভালো হচ্ছে';
        return 'Let\'s start! / শুরু করা যাক';
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-premium mb-10 sticky top-24 z-30">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald/10 flex items-center justify-center text-emerald">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-700 leading-none">Biodata Readiness / প্রোফাইল পূর্ণতা</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                            {getStatusMessage()}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-serif font-black text-emerald">{progressPercentage}%</span>
                </div>
            </div>

            <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner-soft">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-light to-emerald"
                />
            </div>

            <div className="flex items-center justify-between mt-3 px-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {completedRequiredCount} of {totalCount} Required Fields
                </p>
                {progressPercentage < 100 && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-rose-400 animate-pulse">
                        <CircleDashed className="w-3 h-3" />
                        আরেকটু বাকি আছে
                    </div>
                )}
            </div>
        </div>
    );
};
