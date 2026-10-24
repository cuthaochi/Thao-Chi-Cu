import React from 'react';
import { Heart, Sparkles, Home, X } from 'lucide-react';
import { VIETINBANK_BRAND } from '../data/vietinbankData';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReturnHome: () => void;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({
  isOpen,
  onClose,
  onReturnHome,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pt-8 pb-4 px-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00386B] to-[#00529C] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/20">
            <Heart className="w-8 h-8 text-rose-300 fill-rose-300/30" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2">
            VietinBank Trân Trọng Cảm Ơn!
          </h3>

          <div className="p-4 my-3 bg-blue-50/70 border border-blue-100 rounded-xl text-slate-800 text-base font-medium leading-relaxed">
            "Cảm ơn Quý khách đã sử dụng dịch vụ của VietinBank. Chúc Quý khách một ngày tốt lành!"
          </div>

          <p className="text-xs text-slate-500 mb-6">
            Nếu cần thêm bất kỳ trợ giúp nào tại quầy, vui lòng bấm chuông gọi nhân viên quầy hoặc liên hệ hotline <strong className="text-slate-700">{VIETINBANK_BRAND.hotline247}</strong>.
          </p>

          <button
            onClick={() => {
              onClose();
              onReturnHome();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#00386B] hover:bg-[#00284d] text-white font-medium rounded-xl shadow-md transition-all active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Quay lại Màn hình chính</span>
          </button>
        </div>
      </div>
    </div>
  );
};
