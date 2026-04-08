import React from 'react';
import { Plus, Trash2, ListPlus } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Input, Textarea } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { useFormContext, useFieldArray } from 'react-hook-form';

export const CustomFields = () => {
  const { control, register, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields"
  });

  return (
    <Card
      title="Custom Fields"
      bnTitle="অতিরিক্ত কাস্টম তথ্য"
      icon={<ListPlus className="w-5 h-5" />}
      status={fields.length > 0 ? 'completed' : 'not-started'}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 font-medium">
                Add any extra information that is not covered in other sections / অন্য কোনো তথ্য যা দিতে চান তা এখানে যোগ করুন
            </p>
            <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => append({ id: crypto.randomUUID(), label: '', value: '' })}
                className="shrink-0"
            >
                <Plus className="w-4 h-4 mr-1" /> Add Field
            </Button>
        </div>

        {fields.length > 0 && (
            <div className="space-y-8 pt-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="relative p-6 bg-slate-50 rounded-2xl border border-slate-100 group transition-all duration-200 hover:border-emerald/20 hover:bg-emerald/[0.02]">
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 gap-6">
                            <Input
                                label={`Field Label ${index + 1}`}
                                bnLabel="তথ্যের শিরোনাম"
                                placeholder="e.g. Favorite Authors, Additional Skill, etc."
                                {...register(`customFields.${index}.label` as const)}
                                required
                            />
                            <Textarea
                                label={`Field Value ${index + 1}`}
                                bnLabel="তথ্যের বিবরণ"
                                placeholder="Details about this field... / বিস্তারিত লিখুন..."
                                {...register(`customFields.${index}.value` as const)}
                                required
                            />
                        </div>
                    </div>
                ))}
            </div>
        )}

        {fields.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ListPlus className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-400">No custom fields added yet.</p>
            </div>
        )}
      </div>
    </Card>
  );
};
