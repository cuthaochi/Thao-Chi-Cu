import React from 'react';
import { NavTab } from '../types';
import { VIETINBANK_BRAND, BRANCHES_DATA } from '../data/vietinbankData';
import { 
  HelpCircle, Download, Gamepad2, PiggyBank, Calculator, 
  Sparkles, MapPin, ChevronRight, Phone, Gift, ShieldCheck, 
  Clock, ArrowRight, UserCheck
} from 'lucide-react';

interface HomeOverviewProps {
  onSelectTab: (tab: NavTab) => void;
  selectedBranchId: string;
  onOpenConsultant: () => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  onSelectTab,
  selectedBranchId,
  onOpenConsultant,
}) => {
  const currentBranch = BRANCHES_DATA.find((b) => b.id === selectedBranchId) || BRANCHES_DATA[0];

  const featureCards: {
    tab: NavTab;
    title: string;
    badge?: string;
    desc: string;
    icon: React.FC<{ className?: string }>;
    accentColor: string;
    cta: string;
  }[] = [
    {
      tab: 'faq',
      title: '1. Giải đáp thắc mắc khách hàng',
      badge: 'Hỗ trợ nhanh',
      desc: 'Hướng dẫn quên pass iPay, đóng thẻ, đọc CCCD chip NFC & cập nhật sinh trắc học từng bước bằng hình ảnh và video.',
      icon: HelpCircle,
      accentColor: 'from-blue-600 to-indigo-700',
      cta: 'Xem hướng dẫn',
    },
    {
      tab: 'download',
      title: '2. Tải App VietinBank iPay',
      badge: 'QR Quét tức thì',
      desc: 'Quét mã QR cài đặt nhanh cho iPhone và Android. Miễn phí chuyển khoản 24/7 trọn đời.',
      icon: Download,
      accentColor: 'from-sky-600 to-blue-700',
      cta: 'Lấy mã QR',
    },
    {
      tab: 'game',
      title: '3. Thử thách Game nhận quà',
      badge: 'Tặng Voucher',
      desc: 'Chờ vui – Chơi hay – Nhận quà liền tay! Vượt 20 thử thách Flappy Bird để nhận ngay Voucher 2 lít xăng tại quầy.',
      icon: Gamepad2,
      accentColor: 'from-amber-500 to-red-600',
      cta: 'Chơi ngay',
    },
    {
      tab: 'deposit',
      title: '4. Tính lãi tiền gửi tiết kiệm',
      badge: 'Lãi suất cao',
      desc: 'Công cụ tính tiền lãi dự tính & tổng tiền nhận khi đáo hạn theo biểu lãi suất mới nhất tại quầy hoặc gửi online iPay.',
      icon: PiggyBank,
      accentColor: 'from-emerald-600 to-teal-700',
      cta: 'Tính lãi ngay',
    },
    {
      tab: 'loan',
      title: '5. Lịch trả nợ khoản vay',
      badge: 'Dư nợ giảm dần',
      desc: 'Mô phỏng kế hoạch trả gốc đều và lãi theo dư nợ giảm dần. Xem chi tiết từng kỳ thanh toán, tải và in lịch.',
      icon: Calculator,
      accentColor: 'from-rose-600 to-red-700',
      cta: 'Lập lịch trả nợ',
    },
    {
      tab: 'products',
      title: '6. Sản phẩm dịch vụ nổi bật',
      badge: 'Nổi bật',
      desc: 'Gói tài khoản hộ kinh doanh, chạm POS rút tiền, thu hộ KHDN, thẻ tín dụng & danh mục đấu giá tài sản bảo đảm.',
      icon: Sparkles,
      accentColor: 'from-purple-600 to-indigo-700',
      cta: 'Khám phá ngay',
    },
    {
      tab: 'branches',
      title: '7. Điểm mạng lưới giao dịch',
      badge: 'Bản đồ Maps',
      desc: `Tra cứu danh sách PGD, chỉ đường Google Maps, hotline gọi ngay và giờ làm việc tại ${currentBranch.name}.`,
      icon: MapPin,
      accentColor: 'from-slate-700 to-slate-900',
      cta: 'Tra cứu điểm PGD',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Kiosk Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#00386B] via-[#004e92] to-[#00284d] text-white p-6 sm:p-10 shadow-xl border-b-4 border-[#ED1C24]">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-rose-200 text-xs font-bold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span>Kiosk Tương Tác Quầy Giao Dịch · VietinBank {currentBranch.name}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Chào mừng Quý khách đến với VietinBank!
          </h1>

          <p className="text-xs sm:text-base text-blue-100 leading-relaxed max-w-2xl">
            Vui lòng chọn tính năng bên dưới để tra cứu thông tin lãi suất, lập kế hoạch trả nợ, giải đáp vướng mắc hoặc tham gia mini game nhận quà trong lúc chờ phục vụ.
          </p>

          {/* Quick Counter Info */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-blue-100 font-medium">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Sáng 07:30 - 11:30 · Chiều 13:00 - 16:30</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
              <Phone className="w-3.5 h-3.5 text-rose-300" />
              <span>Hotline trung tâm: {VIETINBANK_BRAND.hotline247}</span>
            </div>
          </div>
        </div>

        {/* Decorative background logo */}
        <div className="absolute right-6 -bottom-10 opacity-15 pointer-events-none hidden lg:block">
          <img
            src={VIETINBANK_BRAND.logoUrl}
            alt="VietinBank"
            className="w-96 h-auto object-contain filter brightness-200"
          />
        </div>
      </div>

      {/* 7 Feature Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Danh mục dịch vụ & tiện ích tương tác tại quầy
          </h2>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Chạm vào thẻ để thao tác
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.tab}
                onClick={() => onSelectTab(feat.tab)}
                className="group relative bg-white border border-slate-200/90 hover:border-[#00386B] rounded-3xl p-6 shadow-2xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-[#00386B] text-[#00386B] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    {feat.badge && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-[#00386B] group-hover:bg-red-50 group-hover:text-[#ED1C24] transition-colors">
                        {feat.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#00386B] transition-colors leading-snug">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00386B] group-hover:text-[#ED1C24] transition-colors">
                  <span>{feat.cta}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Counter Consultant On-Duty Strip */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00386B] to-[#00529C] text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">
            <UserCheck className="w-6 h-6 text-rose-300" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-semibold uppercase">
              Chuyên viên phụ trách quầy giao dịch
            </div>
            <div className="text-base font-bold text-slate-900">
              {VIETINBANK_BRAND.consultant.name} · {VIETINBANK_BRAND.consultant.phone}
            </div>
            <div className="text-xs text-slate-600">
              Sẵn sàng hỗ trợ Quý khách giải quyết mọi yêu cầu về tài khoản, thẻ, tiết kiệm và hồ sơ vay.
            </div>
          </div>
        </div>

        <button
          onClick={onOpenConsultant}
          className="w-full sm:w-auto px-5 py-3 bg-[#ED1C24] hover:bg-[#c91219] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" />
          <span>Yêu cầu tư vấn tại quầy</span>
        </button>
      </div>
    </div>
  );
};
