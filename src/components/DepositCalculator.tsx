import React, { useState, useMemo } from 'react';
import { DEPOSIT_TERM_RATES, DEPOSIT_TIKTOK_URL } from '../data/vietinbankData';
import { 
  PiggyBank, Calculator, ExternalLink, AlertCircle, 
  ArrowRight, Check, Sparkles, TrendingUp, Info, HelpCircle
} from 'lucide-react';

interface DepositCalculatorProps {
  onOpenConsultant: () => void;
  onGoToDownload: () => void;
}

export const DepositCalculator: React.FC<DepositCalculatorProps> = ({
  onOpenConsultant,
  onGoToDownload,
}) => {
  // Input states
  const [depositAmountStr, setDepositAmountStr] = useState<string>('100000000'); // 100M VND default
  const [selectedTerm, setSelectedTerm] = useState<number>(12); // 12 months default
  const [interestRate, setInterestRate] = useState<number>(DEPOSIT_TERM_RATES[12]);
  const [isOnlineDeposit, setIsOnlineDeposit] = useState<boolean>(false);

  // Validation errors
  const [errors, setErrors] = useState<{
    amount?: string;
    term?: string;
    rate?: string;
  }>({});

  // Clean numeric string
  const rawAmount = useMemo(() => {
    const clean = depositAmountStr.replace(/\D/g, '');
    return clean ? parseInt(clean, 10) : 0;
  }, [depositAmountStr]);

  // Handle amount input with live formatting
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setDepositAmountStr(value);
    
    if (!value || parseInt(value, 10) <= 0) {
      setErrors(prev => ({ ...prev, amount: 'Vui lòng nhập số tiền gửi hợp lệ.' }));
    } else if (parseInt(value, 10) < 1000000) {
      setErrors(prev => ({ ...prev, amount: 'Mức tiền gửi tối thiểu tại VietinBank là 1.000.000 VND.' }));
    } else {
      setErrors(prev => ({ ...prev, amount: undefined }));
    }
  };

  // When term changes, update default interest rate
  const handleTermChange = (term: number) => {
    setSelectedTerm(term);
    const baseRate = DEPOSIT_TERM_RATES[term] || 4.5;
    const finalRate = isOnlineDeposit ? +(baseRate + 0.3).toFixed(2) : baseRate;
    setInterestRate(finalRate);
    setErrors(prev => ({ ...prev, term: undefined }));
  };

  const toggleOnlineOption = (online: boolean) => {
    setIsOnlineDeposit(online);
    const baseRate = DEPOSIT_TERM_RATES[selectedTerm] || 4.5;
    setInterestRate(online ? +(baseRate + 0.3).toFixed(2) : baseRate);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (isNaN(val) || val < 0) {
      setInterestRate(0);
      setErrors(prev => ({ ...prev, rate: 'Vui lòng nhập lãi suất hợp lệ.' }));
    } else if (val > 20) {
      setInterestRate(val);
      setErrors(prev => ({ ...prev, rate: 'Lãi suất không được vượt quá mức trần 20%/năm.' }));
    } else {
      setInterestRate(val);
      setErrors(prev => ({ ...prev, rate: undefined }));
    }
  };

  // Calculations: Lãi dự tính và Tổng tiền nhận
  const calculation = useMemo(() => {
    if (rawAmount <= 0 || interestRate <= 0 || !selectedTerm) {
      return { interest: 0, total: rawAmount };
    }
    // Formula: (Tiền gửi * Lãi suất % * Số tháng) / 12
    const interest = Math.round((rawAmount * (interestRate / 100) * selectedTerm) / 12);
    const total = rawAmount + interest;
    return { interest, total };
  }, [rawAmount, interestRate, selectedTerm]);

  // Quick preset shortcuts
  const presets = [
    { label: '50 Triệu', value: '50000000' },
    { label: '100 Triệu', value: '100000000' },
    { label: '200 Triệu', value: '200000000' },
    { label: '500 Triệu', value: '500000000' },
    { label: '1 Tỷ', value: '1000000000' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00386B] to-[#00529C] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-200 text-xs font-semibold mb-2">
            <PiggyBank className="w-3.5 h-3.5 text-rose-300" />
            <span>Tiết kiệm tích lũy an toàn & sinh lời cao</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Công cụ tính lãi suất tiền gửi
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-2">
            Áp dụng cho sản phẩm tiền gửi thông thường trả lãi sau tại quầy và gửi tiết kiệm online qua VietinBank iPay.
          </p>
        </div>
        <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none hidden md:block">
          <Calculator className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* Main Grid: Form Inputs (Left) and Results Showcase (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form: 7 cols */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Method selector: Quầy vs Online iPay */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Kênh gửi tiết kiệm
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => toggleOnlineOption(false)}
                className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  !isOnlineDeposit
                    ? 'bg-white text-[#00386B] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tại quầy giao dịch
              </button>
              <button
                type="button"
                onClick={() => toggleOnlineOption(true)}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  isOnlineDeposit
                    ? 'bg-[#00386B] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Online trên iPay</span>
                <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.2 rounded-full font-bold">+0.3%</span>
              </button>
            </div>
          </div>

          {/* 1. Số tiền gửi */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Tiền gửi dự tính (Tổng tiền gửi) <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-slate-500 font-medium">Đơn vị: VND</span>
            </div>

            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={rawAmount > 0 ? rawAmount.toLocaleString('vi-VN') : ''}
                onChange={handleAmountChange}
                placeholder="Ví dụ: 100.000.000"
                className={`w-full px-4 py-3 text-lg font-bold text-slate-900 bg-slate-50/50 border rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                  errors.amount
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-slate-300 focus:ring-[#00386B]'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                VND
              </span>
            </div>

            {errors.amount && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.amount}</span>
              </div>
            )}

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500 mr-1">Gợi ý nhanh:</span>
              {presets.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => {
                    setDepositAmountStr(p.value);
                    setErrors(prev => ({ ...prev, amount: undefined }));
                  }}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-[#00386B] text-slate-700 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Kỳ hạn gửi */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Kỳ hạn (Tháng) <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedTerm}
              onChange={(e) => handleTermChange(parseInt(e.target.value, 10))}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00386B] transition-colors"
            >
              {Object.keys(DEPOSIT_TERM_RATES).map((termKey) => {
                const t = parseInt(termKey, 10);
                return (
                  <option key={t} value={t}>
                    {t} tháng (Lãi tham khảo: {DEPOSIT_TERM_RATES[t]}%/năm)
                  </option>
                );
              })}
            </select>
            {errors.term && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.term}</span>
              </div>
            )}
          </div>

          {/* 3. Lãi suất */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Lãi suất áp dụng <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-slate-500 font-medium">% / năm</span>
            </div>
            <div className="relative">
              <input
                type="number"
                step="0.05"
                min="0"
                max="20"
                value={interestRate}
                onChange={handleRateChange}
                className={`w-full px-4 py-3 text-base font-bold text-slate-900 bg-slate-50 border rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                  errors.rate
                    ? 'border-red-400 focus:ring-red-400'
                    : 'border-slate-300 focus:ring-[#00386B]'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                %/năm
              </span>
            </div>
            {errors.rate && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.rate}</span>
              </div>
            )}
            <p className="text-[11px] text-slate-500">
              Biểu lãi suất tự động cập nhật theo quy định hiện hành của VietinBank. Quý khách có thể tự điều chỉnh để mô phỏng.
            </p>
          </div>
        </div>

        {/* Right Output Showcase: 5 cols */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Calculation Result Card */}
          <div className="bg-gradient-to-br from-slate-900 via-[#00386B] to-[#002244] rounded-3xl p-6 sm:p-7 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-300">
                Kết quả dự tính
              </span>
              <span className="text-xs text-blue-200">
                Kỳ hạn {selectedTerm} tháng · {interestRate}%/năm
              </span>
            </div>

            {/* Tiền lãi dự tính */}
            <div className="space-y-1">
              <span className="text-xs text-blue-200 uppercase tracking-wider font-medium">
                Tiền lãi dự tính
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-300 tracking-tight tabular-nums">
                {calculation.interest.toLocaleString('vi-VN')} <span className="text-base text-amber-200/80 font-semibold">VND</span>
              </div>
            </div>

            {/* Tổng tiền khi đáo hạn */}
            <div className="pt-4 border-t border-white/10 space-y-1">
              <span className="text-xs text-blue-200 uppercase tracking-wider font-medium">
                Tổng tiền nhận được khi đáo hạn (Gốc + Lãi)
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                {calculation.total.toLocaleString('vi-VN')} <span className="text-base text-blue-200 font-semibold">VND</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenConsultant}
                className="w-full py-3 px-4 bg-[#ED1C24] hover:bg-[#c91219] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Mở sổ tiết kiệm tại quầy</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGoToDownload}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Gửi online qua iPay nhận +0.3%</span>
              </button>
            </div>
          </div>

          {/* Video Guide Link (Directly from PDF 2) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Video hướng dẫn gửi tiết kiệm
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Mẹo gửi tiết kiệm sinh lời cao nhất và an toàn tại VietinBank.
                </p>
              </div>
            </div>

            <a
              href={DEPOSIT_TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors"
            >
              <span className="truncate pr-2">Xem video trên TikTok</span>
              <ExternalLink className="w-4 h-4 text-slate-500 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
