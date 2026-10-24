import React, { useState } from 'react';
import { PRODUCTS_DATA, VIETINBANK_BRAND } from '../data/vietinbankData';
import { ProductItem } from '../types';
import { 
  Sparkles, Gift, Heart, Phone, ChevronRight, CheckCircle2, 
  Tag, Shield, ArrowRight, Eye, LayoutGrid, SlidersHorizontal
} from 'lucide-react';

interface FeaturedProductsProps {
  onOpenConsultantForProduct: (productName: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onOpenConsultantForProduct,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'personal' | 'household' | 'enterprise' | 'promo' | 'auction'>('all');
  const [selectedProductPreview, setSelectedProductPreview] = useState<ProductItem | null>(null);

  const filterChips = [
    { key: 'all', label: 'Tất cả sản phẩm' },
    { key: 'personal', label: 'Cá nhân' },
    { key: 'household', label: 'Hộ kinh doanh' },
    { key: 'enterprise', label: 'Doanh nghiệp' },
    { key: 'promo', label: 'Ưu đãi đang triển khai' },
    { key: 'auction', label: 'Đấu giá tài sản bảo đảm' },
  ];

  const filteredProducts = PRODUCTS_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300">
      {/* Featured Header Card */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#00386B] via-[#004e92] to-[#00386B] text-white shadow-xl overflow-hidden border border-red-500/30">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-rose-300 text-xs font-bold mb-3 border border-red-400/30">
            <Gift className="w-3.5 h-3.5 text-amber-300" />
            <span>Nổi bật · Ưu đãi độc quyền tại quầy</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Sản phẩm & Dịch vụ nổi bật
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-blue-100 leading-relaxed">
            Khám phá các sản phẩm, gói giải pháp tài chính và ưu đãi đặc quyền VietinBank đang được giới thiệu tại chi nhánh.
          </p>
        </div>
        <div className="absolute right-6 -bottom-6 opacity-10 pointer-events-none hidden md:block">
          <Sparkles className="w-52 h-52 text-white" />
        </div>
      </div>

      {/* Filter Chips Bar (Segmented button tabs) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {filterChips.map((chip) => {
          const isActive = activeFilter === chip.key;
          return (
            <button
              key={chip.key}
              onClick={() => setActiveFilter(chip.key as any)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#00386B] text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Product Posters Cards Grid / Carousel style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white border border-slate-200 hover:border-red-500/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
          >
            {/* Top Red Hairline Border */}
            <div className="h-1 bg-gradient-to-r from-[#00386B] via-[#ED1C24] to-[#00386B]" />

            <div>
              {/* Poster Image Container */}
              <div 
                className="relative aspect-4/3 bg-slate-100 overflow-hidden cursor-pointer"
                onClick={() => setSelectedProductPreview(product)}
                title="Nhấn để xem poster kích thước đầy đủ"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.poster-fallback')) {
                      const fb = document.createElement('div');
                      fb.className = 'poster-fallback w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#00386B] to-[#002244] text-white p-4 text-center';
                      fb.innerHTML = `
                        <div class="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-2">
                          <svg class="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
                        </div>
                        <span class="font-bold text-sm">${product.name}</span>
                        <span class="text-xs text-blue-200 mt-1">${product.categoryLabel}</span>
                      `;
                      parent.appendChild(fb);
                    }
                  }}
                />

                {/* Category Chip floating on image */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-xs rounded-lg text-[11px] font-semibold text-white shadow-xs">
                  {product.categoryLabel}
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#ED1C24] rounded-lg text-[11px] font-bold text-white shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Nổi bật</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#00386B] transition-colors leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {product.highlightText}
                </p>

                {/* Benefits list */}
                {product.benefits && (
                  <div className="pt-2 space-y-1.5 border-t border-slate-100">
                    {product.benefits.slice(0, 3).map((b, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Nút "Tôi quan tâm" (Mandatory PDF 5) */}
            <div className="p-5 pt-0">
              <button
                onClick={() => onOpenConsultantForProduct(product.name)}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#00386B] to-[#004e92] hover:from-[#ED1C24] hover:to-[#c91219] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-rose-300" />
                <span>Tôi quan tâm</span>
                <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Poster Lightbox Modal Preview */}
      {selectedProductPreview && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProductPreview(null)}
        >
          <div 
            className="relative max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-rose-600 uppercase">
                  {selectedProductPreview.categoryLabel}
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  {selectedProductPreview.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProductPreview(null)}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
              >
                Đóng
              </button>
            </div>

            <div className="max-h-[60vh] overflow-hidden rounded-2xl bg-slate-100 flex items-center justify-center">
              <img
                src={selectedProductPreview.imageUrl}
                alt={selectedProductPreview.name}
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            </div>

            <button
              onClick={() => {
                const name = selectedProductPreview.name;
                setSelectedProductPreview(null);
                onOpenConsultantForProduct(name);
              }}
              className="w-full py-3 bg-[#ED1C24] hover:bg-[#c91219] text-white font-bold text-sm rounded-xl shadow-md"
            >
              Tôi quan tâm sản phẩm này
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
