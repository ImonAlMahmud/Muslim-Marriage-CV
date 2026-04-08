import React from 'react';
import { Sparkles, Smile, BookOpen, Heart, Activity } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Input, Select, Textarea } from '../../ui/Input';
import { COMPLEXION_OPTIONS, LANGUAGES_OPTIONS } from '../../../constants';
import { useFormContext, Controller } from 'react-hook-form';

export const PersonalOverview = () => {
  const { register, control, formState: { errors } } = useFormContext();

  return (
    <Card
      title="Personal Overview"
      bnTitle="ব্যক্তিগত তথ্য"
      icon={<Sparkles className="w-5 h-5" />}
      status="not-started"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Complexion"
          bnLabel="গায়ের রং"
          options={COMPLEXION_OPTIONS}
          {...register('complexion')}
        />
        
        <Input
          label="Health Condition"
          bnLabel="শারীরিক অবস্থা"
          placeholder="e.g. Fit and Healthy"
          {...register('healthCondition')}
          icon={<Activity className="w-4 h-4 text-emerald" />}
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Languages Known / ভাষা জ্ঞান
          </label>
          <div className="flex flex-wrap gap-3">
            {LANGUAGES_OPTIONS.map((lang) => (
              <label
                key={lang}
                className="flex items-center gap-2 px-4 py-2 bg-ivory border border-slate-200 rounded-xl cursor-pointer hover:border-emerald/30 transition-all select-none"
              >
                <input
                  type="checkbox"
                  value={lang}
                  {...register('languages')}
                  className="w-4 h-4 rounded text-emerald focus:ring-emerald border-slate-300"
                />
                <span className="text-sm font-medium text-slate-600">{lang}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Hobbies & Interests"
            bnLabel="শখ ও আগ্রহ"
            placeholder="What do you enjoy doing in your free time? / অবসরে কী করতে পছন্দ করেন?"
            {...register('hobbies')}
            icon={<Smile className="w-4 h-4 text-emerald" />}
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Personality Summary"
            bnLabel="আপনার ব্যক্তিত্ব"
            required
            placeholder="Describe your character, values, and habits / আপনার চরিত্র, অভ্যাস ও মূল্যবোধ সম্পর্কে লিখুন"
            {...register('personality')}
            error={errors.personality?.message as string}
            helperText="Write about your character, habits, values, and interests / আপনার স্বভাব, মূল্যবোধ, অভ্যাস ও আগ্রহ সম্পর্কে লিখুন"
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Future Goals & Plans"
            bnLabel="ভবিষ্যৎ পরিকল্পনা"
            placeholder="What are your goals after marriage? / বিবাহের পর আপনার পরিকল্পনা ও লক্ষ্য কী?"
            {...register('futureGoals')}
            icon={<Heart className="w-4 h-4 text-emerald" />}
          />
        </div>
      </div>
    </Card>
  );
};
