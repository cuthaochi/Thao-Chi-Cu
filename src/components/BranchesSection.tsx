import React, { useState } from 'react';
import { BRANCHES_DATA, VIETINBANK_BRAND } from '../data/vietinbankData';
import { BranchOffice } from '../types';
import { 
  MapPin, Phone, Clock, ExternalLink, Navigation, 
  Building2, Search, CheckCircle, ShieldCheck
} from 'lucide-react';

interface BranchesSectionProps {
  selectedBranchId: string;
  onSelectBranch: (id: string) => void;
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({
  selectedBranchId,
  onSelectBranch,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const currentBranch = BRANCHES_DATA.find((b) => b.id === selectedBranchId) || BRANCHES_DATA[0];

  // Filter offices in current branch by search term
  const filteredOffices = currentBranch.offices.filter((office) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      office.name.toLowerCase().includes(q) ||
      office.address.toLowerCase().includes(q) ||
      office.phone.includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#00386B] via-[#004e92] to-[#00386B] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-200 text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5 text-rose-300" />
            <span>Mạng lưới 155 Chi nhánh & gần 1.000 PGD trên toàn quốc</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Mạng lưới Điểm giao dịch VietinBank
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-2">
            Tra cứu thông tin địa chỉ, chỉ đường Google Maps, hotline gọi trực tiếp và hình ảnh thực tế điểm giao dịch.
          </p>
        </div>
        <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none hidden md:block">
          <MapPin className="w-48 h-48 text-white" />
        </div>
      </div>

      {/* Branch Selector & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Branch Select */}
        <div className="w-full md:w-auto flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
            Chọn Chi nhánh:
          </label>
          <div className="flex flex-wrap gap-2 w-full">
            {BRANCHES_DATA.map((branch) => {
              const isSelected = branch.id === currentBranch.id;
              return (
                <button
                  key={branch.id}
                  onClick={() => onSelectBranch(branch.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00386B] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Chi nhánh {branch.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm tên PGD, đường..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#00386B]"
          />
        </div>
      </div>

      {/* Operating Hours Notice Card (Mandatory PDF 4) */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-800">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00386B] text-white flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#00386B]">
              Thời gian giao dịch chuẩn tại quầy ({currentBranch.name})
            </h4>
            <div className="text-xs text-slate-600 mt-0.5 space-y-0.5">
              <div>
                <strong>Thứ 2 đến thứ 6:</strong> Sáng từ 07:30 AM Đến 11:30 AM · Chiều từ 01:00 PM Đến 04:30 PM
              </div>
              <div>
                <strong>Thứ 7 - Chủ nhật:</strong> Nghỉ giao dịch (Quý khách vui lòng giao dịch 24/7 trên VietinBank iPay)
              </div>
            </div>
          </div>
        </div>

        <a
          href={`tel:${currentBranch.hotline}`}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#ED1C24] hover:bg-[#c91219] text-white text-xs font-semibold rounded-xl shadow-xs transition-transform active:scale-95 whitespace-nowrap self-stretch sm:self-auto justify-center"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Hotline: {currentBranch.hotline}</span>
        </a>
      </div>

      {/* Office List Cards (Strictly matching PDF 4 details) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOffices.map((office) => (
          <div
            key={office.id}
            className="bg-white border border-slate-200 hover:border-[#00386B] rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Photo & Badge */}
              <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-4">
                <img
                  src={office.photoUrl}
                  alt={office.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.office-fallback')) {
                      const fb = document.createElement('div');
                      fb.className = 'office-fallback w-full h-full flex flex-col items-center justify-center bg-slate-200 text-slate-600 p-4 text-center';
                      fb.innerHTML = `
                        <svg class="w-10 h-10 text-slate-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        <span class="text-xs font-bold text-slate-700">${office.name}</span>
                      `;
                      parent.appendChild(fb);
                    }
                  }}
                />

                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#00386B] text-white text-[11px] font-bold rounded-lg shadow-sm">
                  Điểm #{office.stt}
                </span>
              </div>

              {/* Title & Address */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {office.name}
              </h3>

              <div className="flex items-start gap-2 mt-2 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{office.address}</span>
              </div>

              {/* Phone display */}
              {office.phone && (
                <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-[#00386B]">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>Số điện thoại: {office.phone}</span>
                </div>
              )}
            </div>

            {/* Bottom Actions: Call hotline & Google Maps Button (Mandatory PDF 4) */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <a
                href={`tel:${office.phone || currentBranch.hotline}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                title="Gọi ngay hotline điểm giao dịch"
              >
                <Phone className="w-3.5 h-3.5 text-[#ED1C24]" />
                <span>Gọi hotline</span>
              </a>

              <a
                href={office.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#00386B] hover:bg-[#002b52] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                title="Mở chỉ đường trên Google Maps"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
