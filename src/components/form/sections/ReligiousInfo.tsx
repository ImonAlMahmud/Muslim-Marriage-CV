import React from 'react';
import { Book, Moon, Shield, Sun, Info } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Input, Select, Textarea } from '../../ui/Input';
import { RELIGION_OPTIONS, ORIENTATION_OPTIONS, MADHHAB_OPTIONS, SALAH_OPTIONS, QURAN_OPTIONS, HIJAB_BEARD_OPTIONS } from '../../../constants';
import { useFormContext } from 'react-hook-form';

export const ReligiousInfo = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Card
      title="Religious Information"
      bnTitle="ধর্মীয় তথ্য"
      icon={<Moon className="w-5 h-5" />}
      status="in-progress"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Religion"
          bnLabel="ধর্ম"
          required
          options={RELIGION_OPTIONS}
          {...register('religion')}
          error={errors.religion?.message as string}
        />
        
        <Select
          label="Aqeedah / Orientation"
          bnLabel="আকীদা / মানহাজ"
          options={ORIENTATION_OPTIONS}
          {...register('orientation')}
          error={errors.orientation?.message as string}
          icon={<Shield className="w-4 h-4 text-emerald" />}
        />

        <Select
          label="Madhhab"
          bnLabel="মাযহাব"
          options={MADHHAB_OPTIONS}
          {...register('madhhab')}
          error={errors.madhhab?.message as string}
        />

        <div className="md:col-span-2">
          <Textarea
            label="Daily Salah Status"
            bnLabel="সালাত আদায় করেন কি?"
            placeholder="Describe your daily salah consistency / আপনার নিয়মিত সালাত আদায় সম্পর্কে লিখুন"
            {...register('salahStatus')}
            error={errors.salahStatus?.message as string}
            icon={<Sun className="w-4 h-4 text-emerald" />}
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Quran Reading"
            bnLabel="আল-কুরআন তিলাওয়াত"
            placeholder="Describe your ability to read the Quran / কুরআন তিলাওয়াত সম্পর্কে লিখুন"
            {...register('quranAbility')}
            error={errors.quranAbility?.message as string}
            icon={<Book className="w-4 h-4 text-emerald" />}
          />
        </div>

        <Select
          label="Hijab / Beard Status"
          bnLabel="পর্দা / দাড়ি বিষয়ক"
          options={HIJAB_BEARD_OPTIONS}
          {...register('dressStatus')}
          error={errors.dressStatus?.message as string}
          icon={<Info className="w-4 h-4 text-emerald" />}
        />

        <div className="md:col-span-2">
          <Textarea
            label="Islamic Education Background"
            bnLabel="দ্বীনি শিক্ষা ব্যাকগ্রাউন্ড"
            placeholder="Mention any madrasa background or Islamic courses / মাদ্রাসা বা কোনো ধর্মীয় কোর্সের তথ্য থাকলে দিন"
            {...register('religiousBackground')}
            error={errors.religiousBackground?.message as string}
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Islamic Lifestyle Summary"
            bnLabel="সংক্ষেপে আপনার জীবনচর্চা"
            placeholder="Describe your daily religious practices and habits / আপনার দৈনন্দিন ধর্মীয় অভ্যাস ও চর্চা সম্পর্কে লিখুন"
            {...register('lifestyleSummary')}
            error={errors.lifestyleSummary?.message as string}
          />
        </div>
      </div>
    </Card>
  );
};
