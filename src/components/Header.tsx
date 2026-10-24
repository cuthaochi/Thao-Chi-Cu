import React from 'react';
import { NavTab } from '../types';
import { VIETINBANK_BRAND, BRANCHES_DATA } from '../data/vietinbankData';
import { Phone, Building2, HelpCircle, Download, Gamepad2, PiggyBank, Calculator, Sparkles, MapPin } from 'lucide-react';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  selectedBranchId: string;
  onSelectBranch: (branchId: string) => void;
  onOpenConsultant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  selectedBranchId,
  onSelectBranch,
  onOpenConsultant,
}) => {
  const currentBranch = BRANCHES_DATA.find(b => b.id === selectedBranchId) || BRANCHES_DATA[0];

  const navItems: { tab: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { tab: 'faq', label: 'Giải đáp', icon: HelpCircle },
    { tab: 'download', label: 'Tải iPay', icon: Download },
    { tab: 'game', label: 'Game nhận quà', icon: Gamepad2 },
    { tab: 'deposit', label: 'Lãi tiền gửi', icon: PiggyBank },
    { tab: 'loan', label: 'Lịch trả nợ', icon: Calculator },
    { tab: 'products', label: 'Sản phẩm nổi bật', icon: Sparkles },
    { tab: 'branches', label: 'Điểm giao dịch', icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark & Branch Indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2 group text-left cursor-pointer"
            title="Quay về trang chính"
          >
            <div className="h-10 px-1 py-0.5 flex items-center justify-center bg-white rounded-md border border-slate-100 shadow-2xs">
              <img
                src={VIETINBANK_BRAND.logoUrl}
                alt="VietinBank"
                referrerPolicy="no-referrer"
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  // Fallback if logo fails
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-logo')) {
                    const fallback = document.createElement('span');
                    fallback.className = 'fallback-logo font-bold text-[#00386B] text-lg tracking-tight';
                    fallback.innerText = 'VietinBank';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
            <div className="hidden sm:block">
              <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider leading-none">
                Quầy Giao Dịch
              </span>
              <span className="text-sm font-bold text-[#00386B] group-hover:text-[#ED1C24] transition-colors leading-tight">
                CN {currentBranch.name}
              </span>
            </div>
          </button>

          {/* Quick branch switcher dropdown */}
          <div className="relative hidden md:inline-flex items-center">
            <select
              value={selectedBranchId}
              onChange={(e) => onSelectBranch(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium hover:border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-[#00386B] cursor-pointer"
            >
              {BRANCHES_DATA.map((b) => (
                <option key={b.id} value={b.id}>
                  Chi nhánh {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Zone 2: Navigation Links (single-line, concise) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            const Icon = item.icon;
            return (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs xl:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#00386B] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-[#00386B] hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-red-300' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action (Quick Consultant / Hotline) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenConsultant}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#ED1C24] to-[#C91219] hover:from-[#c91219] hover:to-[#a00e14] text-white text-xs font-semibold rounded-lg shadow-sm transition-transform active:scale-95 whitespace-nowrap shrink-0"
            title="Liên hệ tư vấn viên tại quầy"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tư vấn viên: 0973.874.232</span>
            <span className="sm:hidden">Tư vấn viên</span>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Horizontal Sub-Nav Bar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 bg-slate-50 border-t border-slate-200/60 no-scrollbar">
        <button
          onClick={() => onSelectTab('home')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
            currentTab === 'home'
              ? 'bg-[#00386B] text-white'
              : 'text-slate-600 bg-white border border-slate-200'
          }`}
        >
          Trang chủ
        </button>
        {navItems.map((item) => {
          const isActive = currentTab === item.tab;
          const Icon = item.icon;
          return (
            <button
              key={item.tab}
              onClick={() => onSelectTab(item.tab)}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-[#00386B] text-white shadow-2xs'
                  : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
