import React from 'react';
import { MessageSquare, HelpCircle, PhoneCall, Info } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Textarea } from '../../ui/Input';
import { useFormContext } from 'react-hook-form';

export const AdditionalNotes = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Card
      title="Additional Notes"
      bnTitle="অতিরিক্ত তথ্য"
      icon={<MessageSquare className="w-5 h-5" />}
      status="not-started"
    >
      <div className="grid grid-cols-1 gap-6">
        <Textarea
          label="Short Self Description"
          bnLabel="নিজের সম্পর্কে সংক্ষেপে"
          required
          placeholder="Briefly summarize your personality and outlook on life / আপনার স্বভাব ও জীবনদর্শন সম্পর্কে লিখুন"
          {...register('selfDescription')}
          error={errors.selfDescription?.message as string}
          helperText="Maximum 300 words. This section helps families understand you better / এই অংশটি পরিবারকে আপনাকে ভালোভাবে বুঝতে সাহায্য করবে"
        />

        <Textarea
          label="Why Marriage Now?"
          bnLabel="কেন এখন বিয়ে করতে চান?"
          placeholder="Your motivation for marriage / কেন এখন বিয়ে করতে ইচ্ছুক?"
          {...register('marriageReason')}
          icon={<HelpCircle className="w-4 h-4 text-emerald" />}
        />

        <Textarea
          label="Special Notes / Conditions"
          bnLabel="বিশেষ দ্রষ্টব্য বা শর্ত"
          placeholder="Any mandatory conditions or special notes / কোনো বিশেষ শর্ত বা বক্তব্য"
          {...register('specialNotes')}
          icon={<Info className="w-4 h-4 text-emerald" />}
        />

        <Textarea
          label="Guardian / Family Contact Note"
          bnLabel="অভিভাবকের যোগাযোগের তথ্য বা বার্তা"
          placeholder="How to contact your family? / পরিবারের সাথে যোগাযোগের জন্য বিশেষ কোনো বার্তা?"
          {...register('guardianContact')}
          icon={<PhoneCall className="w-4 h-4 text-emerald" />}
        />
      </div>
    </Card>
  );
};
