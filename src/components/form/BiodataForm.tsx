import React from 'react';
import { useFormContext } from 'react-hook-form';
import { BasicInfo } from './sections/BasicInfo';
import { ReligiousInfo } from './sections/ReligiousInfo';
import { EducationProfession } from './sections/EducationProfession';
import { FamilyInfo } from './sections/FamilyInfo';
import { PersonalOverview } from './sections/PersonalOverview';
import { MarriagePreferences } from './sections/MarriagePreferences';
import { AdditionalNotes } from './sections/AdditionalNotes';
import { CustomFields } from './sections/CustomFields';
import { Button } from '../ui/Button';
import { Eraser, FileDown, Rocket } from 'lucide-react';
import { SAMPLE_DATA } from '../../utils/sampleData';

export const BiodataForm = () => {
    const { reset, formState: { isValid, errors } } = useFormContext();

    const handleFillSample = () => {
        reset(SAMPLE_DATA);
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset the entire form? This will erase all your data. / আপনি কি নিশ্চিত যে আপনি সকল তথ্য মুছে দিতে চান?')) {
            reset();
        }
    };

    const incompleteCount = Object.keys(errors).length;

    return (
        <div className="space-y-10 pb-20">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-sm sticky top-4 z-40">
                <div className="flex items-center gap-3">
                    <Button variant="secondary" size="sm" onClick={handleReset}>
                        <Eraser className="w-4 h-4" />
                        Reset / মুছুন
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleFillSample}>
                        <Rocket className="w-4 h-4" />
                        Fill Sample / স্যাম্পল দেখুন
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    {incompleteCount > 0 && (
                        <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100">
                             আর মাত্র {incompleteCount}টি তথ্য বাকি
                        </span>
                    )}
                    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mr-2">
                        Real-time Saving
                    </p>
                </div>
            </div>

            <div className="space-y-12">
                <section id="basic">
                    <BasicInfo />
                </section>

                <section id="religious">
                    <ReligiousInfo />
                </section>

                <section id="education">
                    <EducationProfession />
                </section>

                <section id="family">
                    <FamilyInfo />
                </section>

                <section id="personal">
                    <PersonalOverview />
                </section>

                <section id="preferences">
                    <MarriagePreferences />
                </section>

                <section id="additional">
                    <AdditionalNotes />
                </section>

                <section id="custom">
                    <CustomFields />
                </section>
            </div>

            {/* Bottom Floating Info for Mobile */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50">
                <Button className="w-full shadow-2xl py-5" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                    <FileDown className="w-5 h-5 mr-2" />
                    Preview & Download PDF
                </Button>
            </div>
        </div>
    );
};
