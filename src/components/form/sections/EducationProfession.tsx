import React from 'react';
import { GraduationCap, Briefcase, Building, MapPin, DollarSign, Award } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Input, Select, Textarea } from '../../ui/Input';
import { EDUCATION_QUALIFICATIONS } from '../../../constants';
import { useFormContext } from 'react-hook-form';

export const EducationProfession = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Card
      title="Education & Life"
      bnTitle="শিক্ষা ও জীবন"
      icon={<GraduationCap className="w-5 h-5" />}
      status="not-started"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Textarea
            label="Highest Qualification"
            bnLabel="সর্বোচ্চ যোগ্যতা"
            required
            placeholder="Describe your highest educational degree / আপনার সর্বোচ্চ শিক্ষাগত ডিগ্রি সম্পর্কে লিখুন"
            {...register('highestQualification')}
            error={errors.highestQualification?.message as string}
          />
        </div>
        
        <Input
          label="Institution Name"
          bnLabel="প্রতিষ্ঠানের নাম"
          required
          placeholder="e.g. University of Dhaka"
          {...register('institution')}
          error={errors.institution?.message as string}
          icon={<Building className="w-4 h-4 text-emerald" />}
        />

        <Input
          label="Major / Subject"
          bnLabel="বিষয় / বিভাগ"
          placeholder="e.g. Computer Science"
          {...register('subject')}
          error={errors.subject?.message as string}
        />

        <Input
          label="Year of Completion"
          bnLabel="পাশের সাল"
          placeholder="e.g. 2020"
          {...register('passingYear')}
          error={errors.passingYear?.message as string}
        />

        <div className="md:col-span-2 section-divider opacity-30 mt-2 mb-4" />

        <div className="md:col-span-2">
          <Textarea
            label="Current Occupation"
            bnLabel="পেশা"
            required
            placeholder="Describe your current profession and responsibilities / আপনার পেশা সম্পর্কে লিখুন"
            {...register('occupation')}
            error={errors.occupation?.message as string}
            icon={<Briefcase className="w-4 h-4 text-emerald" />}
          />
        </div>

        <Input
          label="Job Title"
          bnLabel="পদবী"
          placeholder="e.g. Senior Developer"
          {...register('jobTitle')}
          error={errors.jobTitle?.message as string}
        />

        <Input
          label="Workplace / Company"
          bnLabel="প্রতিষ্ঠানের নাম (পেশা)"
          placeholder="e.g. Tech Solutions Ltd."
          {...register('workplace')}
          error={errors.workplace?.message as string}
        />

        <Input
          label="Work Location"
          bnLabel="কর্মস্থান"
          placeholder="e.g. Dhaka, Bangladesh"
          {...register('workLocation')}
          error={errors.workLocation?.message as string}
          icon={<MapPin className="w-4 h-4 text-emerald" />}
        />

        <div className="md:col-span-2">
            <Textarea
              label="Career Summary"
              bnLabel="পেশা নিয়ে সংক্ষিপ্ত বর্ণনা"
              placeholder="Briefly describe your career path and future plans / আপনার কর্মজীবন সম্পর্কে সংক্ষেপে লিখুন"
              {...register('careerSummary')}
              error={errors.careerSummary?.message as string}
            />
        </div>
      </div>
    </Card>
  );
};
