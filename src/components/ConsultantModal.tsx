import React from 'react';
import { Phone, CheckCircle2, User, X } from 'lucide-react';
import { VIETINBANK_BRAND } from '../data/vietinbankData';

interface ConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  customMessage?: string;
}

export const ConsultantModal: React.FC<ConsultantModalProps> = ({
  isOpen,
  onClose,
  title = 'Tư vấn Sản phẩm & Dịch vụ',
  customMessage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with VietinBank primary blue */}
        <div className="bg-gradient-to-r from-[#00386B] to-[#00529C] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-base">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-slate-800 text-sm leading-relaxed">
            {customMessage || (
              <>
                <p className="font-medium text-slate-900 mb-2">
                  Cảm ơn Quý khách đã quan tâm đến sản phẩm/dịch vụ này!
                </p>
                <p className="text-slate-600">
                  Quý khách vui lòng liên hệ trực tiếp cán bộ VietinBank tại quầy để được tư vấn và nhận ưu đãi tốt nhất.
                </p>
              </>
            )}
          </div>

          {/* Consultant Info Card */}
          <div className="border border-slate-200 rounded-xl p-4 flex items-center gap-4 bg-slate-50/50">
            <div className="w-12 h-12 rounded-full bg-[#00386B]/10 text-[#00386B] flex items-center justify-center font-bold text-lg shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-500 font-medium">Cán bộ hỗ trợ trực tiếp</div>
              <div className="text-base font-bold text-slate-900">
                {VIETINBANK_BRAND.consultant.name}
              </div>
              <div className="text-xs text-slate-600">
                {VIETINBANK_BRAND.consultant.title}
              </div>
            </div>
            <a
              href={`tel:${VIETINBANK_BRAND.consultant.phone}`}
              className="flex items-center gap-2 bg-[#ED1C24] hover:bg-[#c91219] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-transform active:scale-95 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span>Gọi ngay</span>
            </a>
          </div>

          <div className="text-xs text-slate-500 text-center">
            Số điện thoại trực tiếp: <span className="font-semibold text-slate-800">{VIETINBANK_BRAND.consultant.phone}</span>
          </div>

          {/* Close CTA */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
            >
              Đã hiểu & Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
