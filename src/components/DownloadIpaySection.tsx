import React from 'react';
import { IPAY_DOWNLOAD_LINKS, VIETINBANK_BRAND } from '../data/vietinbankData';
import { 
  Smartphone, Apple, Play, QrCode, ShieldCheck, 
  ArrowRight, Sparkles, CheckCircle2, Download, Zap
} from 'lucide-react';

export const DownloadIpaySection: React.FC = () => {
  // QR Code generator using reliable qrserver or direct SVG render
  const iosQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(IPAY_DOWNLOAD_LINKS.ios)}`;
  const androidQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(IPAY_DOWNLOAD_LINKS.android)}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#00386B] via-[#004e92] to-[#00386B] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-rose-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span>Ngân hàng số toàn năng cho mọi nhu cầu</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Tải App VietinBank iPay Mobile
          </h1>
          <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed">
            Quét mã QR bằng camera điện thoại của Quý khách ngay tại quầy giao dịch để tải ứng dụng chính thức, an toàn và hoàn toàn miễn phí.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-blue-100">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Miễn phí chuyển khoản 24/7
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mở tài khoản số đẹp
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Lãi suất gửi online cao hơn quầy
            </span>
          </div>
        </div>

        {/* Decorative graphic */}
        <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none hidden md:block">
          <Smartphone className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* QR Codes & Direct Download Dual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* iOS Card */}
        <div className="bg-white border-2 border-slate-200 hover:border-[#00386B] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-4 shadow-sm">
            <Apple className="w-7 h-7" />
          </div>

          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Dành cho thiết bị Apple
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            VietinBank iPay trên iPhone / iPad
          </h2>
          <p className="text-xs text-slate-600 mt-1 mb-5">
            Tương thích iOS 13.0 trở lên, tối ưu cho Face ID và Apple Wallet
          </p>

          {/* QR Code Container */}
          <div className="p-3 bg-white border-2 border-slate-200 rounded-2xl shadow-inner mb-5">
            <img
              src={iosQrUrl}
              alt="QR tải VietinBank iPay trên App Store"
              referrerPolicy="no-referrer"
              className="w-44 h-44 object-contain rounded-lg"
              loading="lazy"
            />
          </div>

          <div className="text-xs text-slate-500 mb-4 flex items-center gap-1">
            <QrCode className="w-3.5 h-3.5 text-[#00386B]" />
            <span>Dùng camera iPhone quét mã để tải nhanh</span>
          </div>

          <a
            href={IPAY_DOWNLOAD_LINKS.ios}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-slate-950 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm rounded-xl shadow-md transition-transform active:scale-[0.98]"
          >
            <Apple className="w-4 h-4" />
            <span>Mở trên App Store</span>
            <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
          </a>
        </div>

        {/* Android Card */}
        <div className="bg-white border-2 border-slate-200 hover:border-[#00386B] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
            <Play className="w-6 h-6 fill-current" />
          </div>

          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Dành cho thiết bị Android
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            VietinBank iPay trên Android
          </h2>
          <p className="text-xs text-slate-600 mt-1 mb-5">
            Samsung, Xiaomi, OPPO, Vivo... hỗ trợ Android 8.0 trở lên
          </p>

          {/* QR Code Container */}
          <div className="p-3 bg-white border-2 border-slate-200 rounded-2xl shadow-inner mb-5">
            <img
              src={androidQrUrl}
              alt="QR tải VietinBank iPay trên Google Play"
              referrerPolicy="no-referrer"
              className="w-44 h-44 object-contain rounded-lg"
              loading="lazy"
            />
          </div>

          <div className="text-xs text-slate-500 mb-4 flex items-center gap-1">
            <QrCode className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dùng camera hoặc Zalo quét mã để tải nhanh</span>
          </div>

          <a
            href={IPAY_DOWNLOAD_LINKS.android}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm rounded-xl shadow-md transition-transform active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Mở trên Google Play</span>
            <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
          </a>
        </div>
      </div>

      {/* Guide Steps to Activate iPay after Download */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            3 Bước kích hoạt nhanh tại quầy giao dịch
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Cán bộ tư vấn sẽ hỗ trợ Quý khách hoàn thành ngay trong 2 phút
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#00386B] font-bold text-sm flex items-center justify-center">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Cài đặt ứng dụng</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tải app qua mã QR ở trên hoặc tìm kiếm từ khóa <strong>VietinBank iPay</strong> trên cửa hàng ứng dụng.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#00386B] font-bold text-sm flex items-center justify-center">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Đăng nhập / Đăng ký</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nhập số điện thoại đã mở tài khoản tại quầy, tạo mật khẩu đăng nhập cá nhân an toàn.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#00386B] font-bold text-sm flex items-center justify-center">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Xác thực CCCD & Khuôn mặt</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chụp CCCD gắn chip và quét NFC ngay tại quầy để mở khóa toàn bộ hạn mức chuyển khoản theo quy định.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
