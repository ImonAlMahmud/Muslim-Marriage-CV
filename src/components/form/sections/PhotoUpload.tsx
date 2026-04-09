import React, { useRef, useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';

interface PhotoUploadProps {
  value?: string;
  onChange: (value: string | null) => void;
  theme?: string;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsOptimizing(true);
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const image = new Image();
      image.onload = () => {
        // Studio Optimization Engine: Resize & Compress to keep PDF size small
        const canvas = document.createElement('canvas');
        let width = image.width;
        let height = image.height;
        const max_px = 800;

        if (width > height) {
          if (width > max_px) {
            height *= max_px / width;
            width = max_px;
          }
        } else {
          if (height > max_px) {
            width *= max_px / height;
            height = max_px;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(image, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          onChange(compressedDataUrl);
        }
        setIsOptimizing(false);
      };
      image.src = readerEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-bold text-slate-700 tracking-tight">
        Profile Photo / <span className="font-bengali">ছবি</span> 
        <span className="block text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-0.5">Auto-Optimized Studio Engine</span>
      </label>
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-[2rem] bg-emerald-900/5 border-2 border-dashed border-emerald-900/10 flex items-center justify-center overflow-hidden shadow-inner relative">
          {value ? (
            <img src={value} className="w-full h-full object-cover" alt="Profile" />
          ) : (
            <Camera className="w-8 h-8 text-emerald-900/20" />
          )}
          {isOptimizing && (
            <div className="absolute inset-0 bg-emerald-900/40 backdrop-blur-sm flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()} 
            disabled={isOptimizing} 
            className="text-xs font-bold text-white bg-emerald-900 px-5 py-2.5 rounded-xl hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/10 disabled:opacity-50"
          >
            {isOptimizing ? 'Optimizing...' : 'Update Photo'}
          </button>
          {value && !isOptimizing && (
            <button 
              type="button"
              onClick={() => onChange(null)} 
              className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-widest pl-1"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*" 
      />
    </div>
  );
};
