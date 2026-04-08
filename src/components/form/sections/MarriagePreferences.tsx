import React from 'react';
import { HeartHandshake, ShieldCheck, MapPin, GraduationCap, Briefcase, Info } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Input, Select, Textarea } from '../../ui/Input';
import { HEIGHT_OPTIONS, EDUCATION_QUALIFICATIONS } from '../../../constants';
import { useFormContext } from 'react-hook-form';

export const MarriagePreferences = () => {
  const { register, formState: { errors } } = useFormContext();

  const ageOptions = Array.from({ length: 50 }, (_, i) => ({ value: (i + 18).toString(), label: (i + 18).toString() }));

  return (
    <Card
      title="Marriage Preferences"
      bnTitle="জীবনসঙ্গী যেমন খুঁজছেন"
      icon={<HeartHandshake className="w-5 h-5" />}
      status="not-started"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
                Preferred Age Range / পছন্দসই বয়স
            </label>
            <div className="flex items-center gap-3">
                <Select
                    options={ageOptions}
                    {...register('prefAgeRange.min')}
                />
                <span className="text-slate-400">to</span>
                <Select
                    options={ageOptions}
                    {...register('prefAgeRange.max')}
                />
            </div>
        </div>

        <div className="md:col-span-1 space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
                Preferred Height Range / উচ্চতা
            </label>
            <div className="flex items-center gap-3">
                <Select
                    options={HEIGHT_OPTIONS.map(h => ({ value: h, label: h }))}
                    {...register('prefHeightRange.min')}
                />
                <span className="text-slate-400">to</span>
                <Select
                    options={HEIGHT_OPTIONS.map(h => ({ value: h, label: h }))}
                    {...register('prefHeightRange.max')}
                />
            </div>
        </div>

        <Select
          label="Education Level"
          bnLabel="ন্যূনতম শিক্ষাগত যোগ্যতা"
          options={[{ value: 'Any', label: 'Any / যে কোনো' }, ...EDUCATION_QUALIFICATIONS]}
          {...register('prefEducation')}
          icon={<GraduationCap className="w-4 h-4 text-emerald" />}
        />

        <Input
          label="Profession"
          bnLabel="পেশা"
          placeholder="e.g. Teacher, Engineer, Any"
          {...register('prefOccupation')}
          icon={<Briefcase className="w-4 h-4 text-emerald" />}
        />

        <Input
          label="Expected Location"
          bnLabel="আকাঙ্ক্ষিত জেলা/অবস্থান"
          placeholder="e.g. Chittagong, Sylhet, Any"
          {...register('prefLocation')}
          icon={<MapPin className="w-4 h-4 text-emerald" />}
        />
        
        <div className="md:col-span-2">
          <Textarea
            label="Preferred Religious Qualities"
            bnLabel="দ্বীনদারি বা ধর্মীয় বৈশিষ্ট্য"
            required
            placeholder="What religious qualities are you looking for? / জীবনসঙ্গীর মাঝে কী ধরণের দ্বীনদারি খুঁজছেন?"
            {...register('prefReligiousQualities')}
            error={errors.prefReligiousQualities?.message as string}
            helperText="Mention important religious traits you prefer / গুরুত্বপূর্ণ ধর্মীয় বৈশিষ্ট্যগুলো উল্লেখ করুন"
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Family Expectations"
            bnLabel="পারিবারিক প্রত্যাশা"
            placeholder="Any specific expectations from the family? / জীবনসঙ্গীর পরিবার সম্পর্কে আপনার কোনো প্রত্যাশা থাকলে লিখুন"
            {...register('prefFamilyExpectations')}
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Partner Vision"
            bnLabel="জীবনসঙ্গী সম্পর্কে আপনার ভাবনা বা প্রত্যাশা"
            placeholder="Anything else you'd like to mention about your partner? / জীবনসঙ্গী সম্পর্কে আপনার বিস্তারিত অন্যান্য ভাবনা ও প্রত্যাশা লিখুন"
            {...register('prefOther')}
            icon={<Info className="w-4 h-4 text-emerald" />}
          />
        </div>
      </div>
    </Card>
  );
};
