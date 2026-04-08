import React from 'react';
import { Home, Users, Heart, Users2 } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Input, Select, Textarea } from '../../ui/Input';
import { FAMILY_TYPE_OPTIONS, FAMILY_RELIGIOUS_OPTIONS } from '../../../constants';
import { useFormContext } from 'react-hook-form';

export const FamilyInfo = () => {
  const { register, formState: { errors } } = useFormContext();

  const countOptions = Array.from({ length: 11 }, (_, i) => ({ value: i.toString(), label: i.toString() }));

  return (
    <Card
      title="Family Information"
      bnTitle="পারিবারিক তথ্য"
      icon={<Home className="w-5 h-5" />}
      status="not-started"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Father's Name"
          bnLabel="পিতার নাম"
          required
          placeholder="e.g. Abdur Rahman"
          {...register('fatherName')}
          error={errors.fatherName?.message as string}
        />
        
        <Input
          label="Father's Occupation"
          bnLabel="পিতার পেশা"
          placeholder="e.g. Teacher"
          {...register('fatherOccupation')}
          error={errors.fatherOccupation?.message as string}
        />

        <Input
          label="Mother's Name"
          bnLabel="মাতার নাম"
          required
          placeholder="e.g. Fatema Begum"
          {...register('motherName')}
          error={errors.motherName?.message as string}
        />

        <Input
          label="Mother's Occupation"
          bnLabel="মাতার পেশা"
          placeholder="e.g. Homemaker"
          {...register('motherOccupation')}
          error={errors.motherOccupation?.message as string}
        />

        <Select
          label="Number of Brothers"
          bnLabel="ভাইয়ের সংখ্যা"
          options={countOptions}
          {...register('brothersCount')}
        />

        <Select
          label="Number of Sisters"
          bnLabel="বোনের সংখ্যা"
          options={countOptions}
          {...register('sistersCount')}
        />

        <Select
          label="Family Type"
          bnLabel="পরিবারের ধরন"
          options={FAMILY_TYPE_OPTIONS}
          {...register('familyType')}
        />

        <Select
          label="Family Religious Environment"
          bnLabel="পরিবারের ধর্মীয় পরিবেশ"
          options={FAMILY_RELIGIOUS_OPTIONS}
          {...register('familyEnvironment')}
          icon={<Heart className="w-4 h-4 text-emerald" />}
        />

        <div className="md:col-span-2">
            <Textarea
              label="Family Background Summary"
              bnLabel="পরিবার সম্পর্কে বিস্তারিত"
              required
              placeholder="Describe your family background, values, and traditions / আপনার পরিবার সম্পর্কে ২-৪ লাইনে লিখুন"
              {...register('familyBackground')}
              error={errors.familyBackground?.message as string}
              helperText="Describe your family respectfully in 2–4 lines / পরিবার সম্পর্কে সম্মানজনকভাবে ২-৪ লাইনে লিখুন"
            />
        </div>
      </div>
    </Card>
  );
};
