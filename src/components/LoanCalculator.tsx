import React, { useState, useMemo } from 'react';
import { LoanCalculationResult, LoanScheduleRow } from '../types';
import { 
  Calculator, Calendar, DollarSign, Clock, Percent, 
  FileSpreadsheet, ArrowRight, X, Printer, Copy, Check, 
  ShieldCheck, Info, AlertCircle 
} from 'lucide-react';

interface LoanCalculatorProps {
  onOpenConsultant: () => void;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onOpenConsultant }) => {
  // Input fields (Strictly matching PDF 3: No sliders, direct text/number input)
  const [propertyValueStr, setPropertyValueStr] = useState<string>('2000000000'); // 2 Tỷ VND
  const [loanAmountStr, setLoanAmountStr] = useState<string>('1000000000'); // 1 Tỷ VND
  const [loanTermMonths, setLoanTermMonths] = useState<number>(120); // 10 years (120 months)
  const [annualRate, setAnnualRate] = useState<number>(8.5); // 8.5%/year
  const [disbursementDate, setDisbursementDate] = useState<string>('2026-10-24');
  const [cycle, setCycle] = useState<'monthly' | 'quarterly' | 'biannual' | 'annual'>('monthly');
  const [paymentDayOfMonth, setPaymentDayOfMonth] = useState<number>(25); // Day 25th as example in PDF 3
  const [roundingMode, setRoundingMode] = useState<'exact' | 'thousand'>('thousand');

  // Modal for Detailed Amortization Table
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [copiedTable, setCopiedTable] = useState<boolean>(false);

  // Parsing values
  const rawProperty = useMemo(() => {
    const val = propertyValueStr.replace(/\D/g, '');
    return val ? parseInt(val, 10) : 0;
  }, [propertyValueStr]);

  const rawLoanAmount = useMemo(() => {
    const val = loanAmountStr.replace(/\D/g, '');
    return val ? parseInt(val, 10) : 0;
  }, [loanAmountStr]);

  // Loan calculation logic strictly adhering to PDF 3 rules
  const calculationResult: LoanCalculationResult = useMemo(() => {
    if (rawLoanAmount <= 0 || loanTermMonths <= 0 || annualRate < 0) {
      return {
        firstPayment: 0,
        lastPayment: 0,
        totalPrincipal: 0,
        totalInterest: 0,
        totalPayment: 0,
        schedule: [],
      };
    }

    // Determine cycle months and periodic rate
    let monthsPerPeriod = 1;
    let ratePerPeriod = (annualRate / 100) / 12;

    if (cycle === 'quarterly') {
      monthsPerPeriod = 3;
      ratePerPeriod = (annualRate / 100) / 4;
    } else if (cycle === 'biannual') {
      monthsPerPeriod = 6;
      ratePerPeriod = (annualRate / 100) / 2;
    } else if (cycle === 'annual') {
      monthsPerPeriod = 12;
      ratePerPeriod = annualRate / 100;
    }

    const totalPeriods = Math.max(1, Math.ceil(loanTermMonths / monthsPerPeriod));
    const rawPrincipalPerPeriod = rawLoanAmount / totalPeriods;

    let basePrincipal = rawPrincipalPerPeriod;
    if (roundingMode === 'thousand') {
      basePrincipal = Math.round(rawPrincipalPerPeriod / 1000) * 1000;
    } else {
      basePrincipal = Math.round(rawPrincipalPerPeriod);
    }

    let remainingBalance = rawLoanAmount;
    const schedule: LoanScheduleRow[] = [];
    let accumulatedPrincipal = 0;
    let accumulatedInterest = 0;

    // Parse starting disbursement date
    const startDate = new Date(disbursementDate);
    const validStart = isNaN(startDate.getTime()) ? new Date() : startDate;

    for (let period = 1; period <= totalPeriods; period++) {
      const openingBalance = remainingBalance;

      // Calculate payment date: advance months
      const payDate = new Date(validStart);
      payDate.setMonth(validStart.getMonth() + period * monthsPerPeriod);
      // Set to chosen payment day of month
      const maxDayInMonth = new Date(payDate.getFullYear(), payDate.getMonth() + 1, 0).getDate();
      payDate.setDate(Math.min(paymentDayOfMonth, maxDayInMonth));

      const dateFormatted = `${String(payDate.getDate()).padStart(2, '0')}/${String(payDate.getMonth() + 1).padStart(2, '0')}/${payDate.getFullYear()}`;

      // Principal for this period
      let periodPrincipal = basePrincipal;
      if (period === totalPeriods) {
        // Last period absorbs any rounding difference
        periodPrincipal = openingBalance;
      } else {
        periodPrincipal = Math.min(periodPrincipal, openingBalance);
      }

      // Interest for this period = openingBalance * ratePerPeriod
      let periodInterest = openingBalance * ratePerPeriod;
      if (roundingMode === 'thousand') {
        periodInterest = Math.round(periodInterest / 1000) * 1000;
      } else {
        periodInterest = Math.round(periodInterest);
      }

      const totalPeriodPayment = periodPrincipal + periodInterest;
      const closingBalance = Math.max(0, openingBalance - periodPrincipal);

      remainingBalance = closingBalance;
      accumulatedPrincipal += periodPrincipal;
      accumulatedInterest += periodInterest;

      schedule.push({
        period,
        date: dateFormatted,
        openingBalance,
        principal: periodPrincipal,
        interest: periodInterest,
        totalPayment: totalPeriodPayment,
        closingBalance,
      });

      if (remainingBalance <= 0) break;
    }

    const firstPayment = schedule.length > 0 ? schedule[0].totalPayment : 0;
    const lastPayment = schedule.length > 0 ? schedule[schedule.length - 1].totalPayment : 0;

    return {
      firstPayment,
      lastPayment,
      totalPrincipal: accumulatedPrincipal,
      totalInterest: accumulatedInterest,
      totalPayment: accumulatedPrincipal + accumulatedInterest,
      schedule,
    };
  }, [rawLoanAmount, loanTermMonths, annualRate, disbursementDate, cycle, paymentDayOfMonth, roundingMode]);

  // Copy schedule as text table
  const handleCopySchedule = () => {
    let t = `LỊCH TRẢ NỢ VIETINBANK - DƯ NỢ GIẢM DẦN\n`;
    t += `Số tiền vay: ${rawLoanAmount.toLocaleString('vi-VN')} VND | Kỳ hạn: ${loanTermMonths} tháng | Lãi suất: ${annualRate}%/năm\n`;
    t += `Kỳ\tNgày trả\tDư nợ đầu kỳ\tTiền gốc\tTiền lãi\tTổng gốc + lãi\tDư nợ còn lại\n`;
    calculationResult.schedule.forEach((row) => {
      t += `${row.period}\t${row.date}\t${row.openingBalance.toLocaleString('vi-VN')}\t${row.principal.toLocaleString('vi-VN')}\t${row.interest.toLocaleString('vi-VN')}\t${row.totalPayment.toLocaleString('vi-VN')}\t${row.closingBalance.toLocaleString('vi-VN')}\n`;
    });
    t += `TỔNG CỘNG:\t\t\t${calculationResult.totalPrincipal.toLocaleString('vi-VN')}\t${calculationResult.totalInterest.toLocaleString('vi-VN')}\t${calculationResult.totalPayment.toLocaleString('vi-VN')}\n`;

    navigator.clipboard.writeText(t);
    setCopiedTable(true);
    setTimeout(() => setCopiedTable(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#00386B] via-[#004e92] to-[#00386B] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-rose-200 text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5 text-rose-300" />
            <span>Phương thức: Trả gốc đều, lãi tính trên dư nợ giảm dần</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Lịch trả nợ khoản vay
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-2">
            Công cụ tính toán kế hoạch trả nợ chi tiết, hỗ trợ Quý khách chủ động kế hoạch tài chính cá nhân và kinh doanh.
          </p>
        </div>
        <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none hidden md:block">
          <FileSpreadsheet className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* Main Calculation Inputs & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form: 7 cols */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              Bước 1: Nhập thông tin khoản vay
            </h2>
            <p className="text-xs text-slate-500">
              Nhập số liệu chính xác để tính toán lịch thanh toán
            </p>
          </div>

          {/* 1. Giá trị bất động sản / TSBĐ (Tham khảo) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Giá trị tài sản bảo đảm / Bất động sản
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={rawProperty > 0 ? rawProperty.toLocaleString('vi-VN') : ''}
                onChange={(e) => setPropertyValueStr(e.target.value.replace(/\D/g, ''))}
                placeholder="2.000.000.000"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00386B]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                VND
              </span>
            </div>
          </div>

          {/* 2. Số tiền vay (Không dùng slider kéo thả - dạng nhập số chuẩn PDF 3) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Số tiền vay <span className="text-red-500">*</span>
              </label>
              {rawProperty > 0 && (
                <span className="text-xs text-blue-700 font-medium">
                  Tỷ lệ vay: {Math.round((rawLoanAmount / rawProperty) * 100)}% giá trị TSBĐ
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={rawLoanAmount > 0 ? rawLoanAmount.toLocaleString('vi-VN') : ''}
                onChange={(e) => setLoanAmountStr(e.target.value.replace(/\D/g, ''))}
                placeholder="1.000.000.000"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-lg font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#00386B]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                VND
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[200000000, 500000000, 1000000000, 2000000000].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setLoanAmountStr(v.toString())}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  {(v / 1000000000 >= 1 ? `${v / 1000000000} Tỷ` : `${v / 1000000} Triệu`)}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Thời gian vay & Lãi suất */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Thời gian vay (Tháng) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="420"
                  value={loanTermMonths}
                  onChange={(e) => setLoanTermMonths(Math.max(1, parseInt(e.target.value || '1', 10)))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00386B]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-medium">
                  {Math.floor(loanTermMonths / 12)} năm {loanTermMonths % 12 > 0 ? `${loanTermMonths % 12} th` : ''}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Lãi suất (%/năm) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="30"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(parseFloat(e.target.value || '0'))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#00386B]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  %/năm
                </span>
              </div>
            </div>
          </div>

          {/* 4. Ngày giải ngân & Chu kỳ trả nợ & Ngày trả nợ định kỳ (Section 2.1 & 2.4 from PDF 3) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Ngày giải ngân
              </label>
              <input
                type="date"
                value={disbursementDate}
                onChange={(e) => setDisbursementDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Chu kỳ trả nợ
              </label>
              <select
                value={cycle}
                onChange={(e) => setCycle(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white"
              >
                <option value="monthly">Hằng tháng (Lãi/12)</option>
                <option value="quarterly">Hằng quý (Lãi/4)</option>
                <option value="biannual">6 tháng (Lãi/2)</option>
                <option value="annual">Hằng năm (Lãi/1)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Ngày trả nợ định kỳ
              </label>
              <select
                value={paymentDayOfMonth}
                onChange={(e) => setPaymentDayOfMonth(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white"
              >
                {[5, 10, 15, 20, 25, 28].map((day) => (
                  <option key={day} value={day}>
                    Ngày {day} hàng tháng
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. Quy tắc làm tròn số (Section 2.3 from PDF 3) */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="font-medium">Quy tắc làm tròn:</span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="rounding"
                  checked={roundingMode === 'thousand'}
                  onChange={() => setRoundingMode('thousand')}
                  className="text-[#00386B]"
                />
                <span>Làm tròn 1.000 đồng</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="rounding"
                  checked={roundingMode === 'exact'}
                  onChange={() => setRoundingMode('exact')}
                  className="text-[#00386B]"
                />
                <span>Đơn vị đồng</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Output: Summary & Button Xem Chi Tiết */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-gradient-to-br from-slate-900 via-[#00386B] to-[#002244] rounded-3xl p-6 sm:p-7 text-white shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-300">
                Tóm tắt nghĩa vụ trả nợ
              </span>
              <span className="text-xs text-blue-200">
                {calculationResult.schedule.length} kỳ thanh toán
              </span>
            </div>

            {/* Số tiền trả kỳ đầu (cao nhất) */}
            <div className="space-y-1">
              <span className="text-xs text-blue-200 uppercase font-medium">
                Số tiền trả kỳ đầu tiên (Gốc + Lãi)
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 tabular-nums">
                {calculationResult.firstPayment.toLocaleString('vi-VN')} <span className="text-sm font-semibold text-amber-200">VND</span>
              </div>
            </div>

            {/* Số tiền trả kỳ cuối */}
            <div className="space-y-1 border-t border-white/10 pt-3">
              <span className="text-xs text-blue-200 uppercase font-medium">
                Số tiền trả kỳ cuối cùng
              </span>
              <div className="text-xl font-bold text-emerald-300 tabular-nums">
                {calculationResult.lastPayment.toLocaleString('vi-VN')} <span className="text-xs font-semibold text-emerald-200">VND</span>
              </div>
            </div>

            {/* Totals Breakdown */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
              <div>
                <span className="text-slate-300 block">Tổng tiền gốc:</span>
                <strong className="text-white text-sm tabular-nums">
                  {calculationResult.totalPrincipal.toLocaleString('vi-VN')} VND
                </strong>
              </div>
              <div>
                <span className="text-slate-300 block">Tổng lãi phải trả:</span>
                <strong className="text-amber-300 text-sm tabular-nums">
                  {calculationResult.totalInterest.toLocaleString('vi-VN')} VND
                </strong>
              </div>
            </div>

            {/* Total Combined */}
            <div className="p-3 bg-white/10 rounded-2xl flex items-center justify-between text-xs">
              <span className="text-blue-100 font-medium">Tổng gốc & lãi cả kỳ:</span>
              <strong className="text-white text-base font-bold tabular-nums">
                {calculationResult.totalPayment.toLocaleString('vi-VN')} VND
              </strong>
            </div>

            {/* Button Xem Chi Tiết -> Shows Detailed Amortization Table (Step 2 from PDF 3) */}
            <button
              onClick={() => setShowDetailModal(true)}
              className="w-full py-3.5 px-4 bg-[#ED1C24] hover:bg-[#c91219] text-white font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Xem chi tiết bảng tính lịch trả nợ</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenConsultant}
              className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Đăng ký gói vay ưu đãi tại quầy</span>
            </button>
          </div>

          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-[#00386B] space-y-1 leading-relaxed">
            <div className="font-bold flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#ED1C24]" />
              <span>Đặc điểm phương thức Dư nợ giảm dần:</span>
            </div>
            <p>
              • Tiền gốc trả đều mỗi kỳ: <span className="font-semibold">{(rawLoanAmount / (loanTermMonths / (cycle === 'quarterly' ? 3 : cycle === 'biannual' ? 6 : cycle === 'annual' ? 12 : 1))).toLocaleString('vi-VN')} VND</span>.
            </p>
            <p>• Tiền lãi giảm dần theo số dư nợ gốc thực tế còn lại.</p>
            <p>• Tổng lãi phải trả thấp hơn đáng kể so với phương thức trả góp đều.</p>
          </div>
        </div>
      </div>

      {/* MODAL: Full Detailed Amortization Schedule Table (PDF 3 Step 2) */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#00386B] to-[#00529C] px-6 py-4 text-white flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-bold text-lg sm:text-xl">
                  Bảng tính lịch trả nợ với dư nợ giảm dần
                </h3>
                <p className="text-xs text-blue-100">
                  Số tiền vay: {rawLoanAmount.toLocaleString('vi-VN')} VND · {loanTermMonths} tháng · Lãi suất: {annualRate}%/năm
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySchedule}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-lg text-xs font-semibold transition-colors"
                >
                  {copiedTable ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTable ? 'Đã chép' : 'Sao chép'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In lịch</span>
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white/90 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Table Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100/90 text-slate-700 uppercase font-semibold text-[11px] sticky top-0 z-10 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3 text-center">Stt</th>
                      <th className="py-3 px-3">Kỳ trả nợ</th>
                      <th className="py-3 px-3 text-right">Số gốc còn lại</th>
                      <th className="py-3 px-3 text-right">Gốc</th>
                      <th className="py-3 px-3 text-right">Lãi</th>
                      <th className="py-3 px-3 text-right">Tổng gốc + Lãi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-normal">
                    {/* Row 0: Initial state */}
                    <tr className="bg-slate-50/50 text-slate-600 font-medium">
                      <td className="py-2.5 px-3 text-center">0</td>
                      <td className="py-2.5 px-3">{calculationResult.schedule[0]?.date || disbursementDate}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums">{rawLoanAmount.toLocaleString('vi-VN')}</td>
                      <td className="py-2.5 px-3 text-right">-</td>
                      <td className="py-2.5 px-3 text-right">-</td>
                      <td className="py-2.5 px-3 text-right">-</td>
                    </tr>

                    {/* Amortization Rows */}
                    {calculationResult.schedule.map((row) => (
                      <tr key={row.period} className="hover:bg-blue-50/40 transition-colors">
                        <td className="py-2.5 px-3 text-center font-medium text-slate-500">{row.period}</td>
                        <td className="py-2.5 px-3 font-medium text-slate-800">{row.date}</td>
                        <td className="py-2.5 px-3 text-right tabular-nums text-slate-600">{row.closingBalance.toLocaleString('vi-VN')}</td>
                        <td className="py-2.5 px-3 text-right tabular-nums font-semibold text-slate-900">{row.principal.toLocaleString('vi-VN')}</td>
                        <td className="py-2.5 px-3 text-right tabular-nums text-amber-700 font-medium">{row.interest.toLocaleString('vi-VN')}</td>
                        <td className="py-2.5 px-3 text-right tabular-nums font-bold text-[#00386B]">{row.totalPayment.toLocaleString('vi-VN')}</td>
                      </tr>
                    ))}
                  </tbody>
                  {/* Footer Totals Row */}
                  <tfoot className="bg-[#00386B] text-white font-bold sticky bottom-0">
                    <tr>
                      <td colSpan={3} className="py-3.5 px-4 text-center uppercase tracking-wider text-xs">
                        TỔNG CỘNG
                      </td>
                      <td className="py-3.5 px-3 text-right tabular-nums">
                        {calculationResult.totalPrincipal.toLocaleString('vi-VN')}
                      </td>
                      <td className="py-3.5 px-3 text-right tabular-nums text-amber-300">
                        {calculationResult.totalInterest.toLocaleString('vi-VN')}
                      </td>
                      <td className="py-3.5 px-3 text-right tabular-nums text-rose-200">
                        {calculationResult.totalPayment.toLocaleString('vi-VN')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-500">
                * Bảng tính mang tính chất tham khảo. Chi tiết hồ sơ thực tế được điều chỉnh theo thỏa thuận hợp đồng tín dụng.
              </span>
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
              >
                Đóng bảng tính
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
