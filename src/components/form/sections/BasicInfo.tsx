import React from 'react';
import { User, Calendar, MapPin, Phone, Mail, Droplets, Ruler, Heart } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Input, Select, Textarea } from '../../ui/Input';
import { HEIGHT_OPTIONS, BLOOD_GROUPS, MARITAL_STATUS, GENDER_OPTIONS } from '../../../constants';
import { useFormContext } from 'react-hook-form';

export const BasicInfo = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Card
      title="Basic Information"
      bnTitle="সাধারণ তথ্য"
      icon={<User className="w-5 h-5" />}
      status={errors.fullName || errors.gender || errors.dob || errors.presentAddress ? 'in-progress' : 'completed'}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          bnLabel="আপনার পূর্ণ নাম"
          placeholder="e.g. Abdullah Ibn Al-Khattab"
          required
          {...register('fullName')}
          error={errors.fullName?.message as string}
        />
        
        <Select
          label="Gender"
          bnLabel="লিঙ্গ"
          required
          options={GENDER_OPTIONS}
          {...register('gender')}
          error={errors.gender?.message as string}
        />

        <Input
          label="Date of Birth"
          bnLabel="জন্মতারিখ"
          type="date"
          required
          {...register('dob')}
          error={errors.dob?.message as string}
          icon={<Calendar className="w-4 h-4 text-emerald" />}
        />

        <Select
          label="Height"
          bnLabel="উচ্চতা"
          required
          options={HEIGHT_OPTIONS.map(h => ({ value: h, label: h }))}
          {...register('height')}
          error={errors.height?.message as string}
          icon={<Ruler className="w-4 h-4 text-emerald" />}
        />

        <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Select
                    label="Blood Group"
                    bnLabel="রক্তের গ্রুপ"
                    options={BLOOD_GROUPS.map(bg => ({ value: bg, label: bg }))}
                    {...register('bloodGroup')}
                    icon={<Droplets className="w-4 h-4 text-rose-500" />}
                />

                <Select
                    label="Marital Status"
                    bnLabel="বৈবাহিক অবস্থা"
                    required
                    options={MARITAL_STATUS}
                    {...register('maritalStatus')}
                    error={errors.maritalStatus?.message as string}
                    icon={<Heart className="w-4 h-4 text-emerald" />}
                />

                <Input
                    label="Nationality"
                    bnLabel="জাতীয়তা"
                    required
                    {...register('nationality')}
                    error={errors.nationality?.message as string}
                />
            </div>
        </div>

        <div className="md:col-span-2">
            <Textarea
              label="Present Address"
              bnLabel="বর্তমান ঠিকানা"
              placeholder="City, District, Area"
              required
              {...register('presentAddress')}
              error={errors.presentAddress?.message as string}
              icon={<MapPin className="w-4 h-4 text-emerald" />}
            />
        </div>

        <Input
          label="Permanent Address"
          bnLabel="স্থায়ী ঠিকানা"
          placeholder="Village, Post, Thana, District"
          required
          {...register('permanentAddress')}
          error={errors.permanentAddress?.message as string}
          icon={<MapPin className="w-4 h-4 text-emerald" />}
        />

        <Input
          label="Contact Number / WhatsApp"
          bnLabel="মোবাইল নম্বর (যোগাযোগের জন্য)"
          placeholder="e.g. 017xx-xxxxxx"
          {...register('contactNumber')}
          error={errors.contactNumber?.message as string}
          icon={<Phone className="w-4 h-4 text-emerald" />}
        />

        <Input
          label="Email Address"
          bnLabel="ইমেইল (ঐচ্ছিক)"
          placeholder="example@mail.com"
          type="email"
          {...register('email')}
          error={errors.email?.message as string}
          icon={<Mail className="w-4 h-4 text-emerald" />}
        />
      </div>
    </Card>
  );
};
