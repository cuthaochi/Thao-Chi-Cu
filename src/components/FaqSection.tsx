import React, { useState } from 'react';
import { FAQ_TOPICS, VIETINBANK_BRAND } from '../data/vietinbankData';
import { FaqTopic } from '../types';
import { 
  KeyRound, CreditCard, ShieldCheck, ScanFace, 
  ArrowLeft, ChevronLeft, ChevronRight, Play, ExternalLink, 
  Phone, ThumbsUp, ThumbsDown, MessageSquare, CheckCircle, RotateCcw,
  Sparkles, ZoomIn
} from 'lucide-react';

interface FaqSectionProps {
  onReturnHome: () => void;
  onOpenThankYou: () => void;
  onOpenConsultant: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onReturnHome,
  onOpenThankYou,
  onOpenConsultant,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [feedbackGiven, setFeedbackGiven] = useState<'stable' | 'unstable' | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const selectedTopic = FAQ_TOPICS.find(t => t.id === selectedTopicId);

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'KeyRound':
        return <KeyRound className="w-7 h-7 text-[#00386B]" />;
      case 'CreditCard':
        return <CreditCard className="w-7 h-7 text-[#00386B]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-7 h-7 text-[#00386B]" />;
      case 'ScanFace':
      default:
        return <ScanFace className="w-7 h-7 text-[#00386B]" />;
    }
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentStepIndex(0);
    setFeedbackGiven(null);
  };

  const handleBackToList = () => {
    setSelectedTopicId(null);
    setCurrentStepIndex(0);
    setFeedbackGiven(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* View: Topic Selection Cards */}
      {!selectedTopic ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Main Question Heading */}
          <div className="bg-gradient-to-r from-[#00386B] to-[#00529C] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-300">
                Hỗ trợ tương tác tại quầy
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">
                Anh/chị đang gặp khó khăn với nội dung nào?
              </h1>
              <p className="mt-2 text-sm text-blue-100 leading-relaxed">
                Vui lòng chạm chọn 1 trong 4 nội dung dưới đây để xem hướng dẫn từng bước có hình ảnh minh họa chi tiết và video hướng dẫn.
              </p>
            </div>
            {/* Subtle watermark badge in background */}
            <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none">
              <ShieldCheck className="w-48 h-48 text-white" />
            </div>
          </div>

          {/* 4 Topic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {FAQ_TOPICS.map((topic, index) => {
              return (
                <div
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic.id)}
                  className="group relative bg-white border border-slate-200/90 hover:border-[#00386B] rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-13 h-13 rounded-xl bg-blue-50 group-hover:bg-[#00386B]/10 flex items-center justify-center transition-colors">
                        {getTopicIcon(topic.iconName)}
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                        {topic.steps.length} bước
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#00386B] transition-colors leading-snug">
                      {topic.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {topic.shortDesc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-[#00386B]">
                    <span>Xem hướng dẫn chi tiết</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Assistance Notice */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-amber-900">
              <strong className="font-semibold">Cần nhân viên hỗ trợ trực tiếp?</strong> Cán bộ tại quầy VietinBank luôn sẵn sàng đồng hành cùng Quý khách.
            </div>
            <button
              onClick={onOpenConsultant}
              className="text-xs font-semibold px-3 py-1.5 bg-[#ED1C24] hover:bg-[#c91219] text-white rounded-lg whitespace-nowrap shadow-xs"
            >
              Liên hệ CSKH: {VIETINBANK_BRAND.consultant.phone}
            </button>
          </div>
        </div>
      ) : (
        /* View: Step-by-Step Interactive Guide */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Bar for Guide */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <button
              onClick={handleBackToList}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#00386B] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh sách câu hỏi</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Bước {currentStepIndex + 1}/{selectedTopic.steps.length}</span>
              <a
                href={selectedTopic.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors shadow-2xs"
                title="Mở video YouTube hướng dẫn"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Xem Video YouTube</span>
              </a>
            </div>
          </div>

          {/* Guide Header Banner */}
          <div className="bg-gradient-to-r from-[#00386B] to-[#00529C] p-5 rounded-2xl text-white shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {selectedTopic.title}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              Thực hiện lần lượt các bước dưới đây để hoàn thành thao tác trên ứng dụng VietinBank iPay.
            </p>

            {/* Stepper progress dots */}
            <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-1">
              {selectedTopic.steps.map((st, idx) => (
                <button
                  key={st.step}
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    setFeedbackGiven(null);
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    currentStepIndex === idx
                      ? 'bg-white text-[#00386B] shadow-xs'
                      : 'bg-white/20 text-white/90 hover:bg-white/30'
                  }`}
                >
                  B.{st.step}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Content Showcase */}
          {selectedTopic.steps[currentStepIndex] && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Step Text Details */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#00386B] text-xs font-bold">
                  <span>Bước {selectedTopic.steps[currentStepIndex].step} trên {selectedTopic.steps.length}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {selectedTopic.steps[currentStepIndex].title}
                </h3>

                <div className="text-sm text-slate-700 bg-slate-50 border border-slate-100 rounded-xl p-4 leading-relaxed font-normal">
                  {selectedTopic.steps[currentStepIndex].description}
                </div>

                {/* Step controls */}
                <div className="flex items-center gap-3 pt-3">
                  <button
                    disabled={currentStepIndex === 0}
                    onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-xs sm:text-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Bước trước</span>
                  </button>

                  <button
                    disabled={currentStepIndex === selectedTopic.steps.length - 1}
                    onClick={() => setCurrentStepIndex(prev => Math.min(selectedTopic.steps.length - 1, prev + 1))}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#00386B] hover:bg-[#002b52] text-white disabled:opacity-40 disabled:cursor-not-allowed font-medium text-xs sm:text-sm shadow-xs"
                  >
                    <span>Bước tiếp theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Step Illustration Image */}
              <div className="flex flex-col items-center">
                <div 
                  className="relative group w-full max-w-sm rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-4/3 flex items-center justify-center shadow-inner cursor-zoom-in"
                  onClick={() => setZoomedImage(selectedTopic.steps[currentStepIndex].imageUrl)}
                  title="Nhấn để phóng to ảnh minh họa"
                >
                  <img
                    src={selectedTopic.steps[currentStepIndex].imageUrl}
                    alt={selectedTopic.steps[currentStepIndex].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback SVG graphic if github raw image has temporary network issue
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-box')) {
                        const box = document.createElement('div');
                        box.className = 'fallback-box p-4 text-center text-slate-500 text-xs flex flex-col items-center gap-2';
                        box.innerHTML = `
                          <svg class="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          <span>Minh họa bước ${selectedTopic.steps[currentStepIndex].step}</span>
                        `;
                        parent.appendChild(box);
                      }
                    }}
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded text-[11px] text-white flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3 h-3" />
                    <span>Phóng to</span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 mt-2">
                  Hình ảnh minh họa thực tế trên giao diện VietinBank iPay
                </span>
              </div>
            </div>
          )}

          {/* Video Direct Card */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">
                  Video hướng dẫn thao tác trực quan
                </div>
                <div className="text-xs text-slate-600">
                  Xem toàn bộ quy trình thực hiện qua clip YouTube chính thức của ngân hàng
                </div>
              </div>
            </div>
            <a
              href={selectedTopic.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors whitespace-nowrap"
            >
              <span>Xem trên YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Feedback & Satisfaction Section (Strictly from PDF 1 rules) */}
          <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="text-center">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Quý khách đã thực hiện ổn hay chưa?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Phản hồi của Quý khách giúp chúng tôi hoàn thiện chất lượng phục vụ tại quầy.
              </p>
            </div>

            {/* If no feedback chosen yet */}
            {feedbackGiven === null ? (
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => setFeedbackGiven('stable')}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-transform active:scale-95"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Đã ổn</span>
                </button>

                <button
                  onClick={() => setFeedbackGiven('unstable')}
                  className="flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-xl shadow-xs transition-transform active:scale-95"
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>Chưa ổn</span>
                </button>
              </div>
            ) : feedbackGiven === 'stable' ? (
              /* Case: Đã ổn -> Quay lại menu chính */
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center space-y-3 animate-in fade-in">
                <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Rất vui vì đã hỗ trợ được Quý khách thành công!</span>
                </div>
                <p className="text-xs text-emerald-700">
                  Quý khách có thể quay lại danh sách hoặc kết thúc phiên giao dịch bất cứ lúc nào.
                </p>
              </div>
            ) : (
              /* Case: Chưa ổn -> Show required exact message from PDF 1 */
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 space-y-3 animate-in fade-in">
                <div className="text-sm font-semibold text-rose-900 leading-relaxed text-center sm:text-left">
                  “Cảm ơn Quý khách đã phản hồi. Quý khách có thể liên hệ Chuyên viên tư vấn <strong className="text-rose-950">Trần Hoàng Trung – số điện thoại: 0973.874.232</strong> để hỗ trợ trực tiếp. Em sẽ cố gắng cải thiện để phục vụ Quý khách tốt hơn!”
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                  <a
                    href="tel:0973874232"
                    className="flex items-center gap-2 px-4 py-2 bg-[#ED1C24] hover:bg-[#c91219] text-white text-xs font-semibold rounded-xl shadow-xs transition-transform active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Gọi Chuyên viên Trần Hoàng Trung (0973.874.232)</span>
                  </a>
                </div>
              </div>
            )}

            {/* Bottom Actions: Quay lại menu chính & Kết thúc cuộc trò chuyện (Mandatory PDF 1) */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center sm:justify-between gap-3">
              <button
                onClick={handleBackToList}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Xem câu hỏi khác</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={onReturnHome}
                  className="px-4 py-2 bg-[#00386B] hover:bg-[#002b52] text-white text-xs sm:text-sm font-medium rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Quay lại menu chính
                </button>

                <button
                  onClick={onOpenThankYou}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-medium rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Kết thúc cuộc trò chuyện
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zoomed Image Lightbox Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2 shadow-2xl">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 z-10 bg-slate-900/80 text-white px-3 py-1 rounded-full text-xs font-medium"
            >
              Đóng (ESC)
            </button>
            <img
              src={zoomedImage}
              alt="Chi tiết"
              className="max-h-[80vh] w-auto object-contain rounded-lg mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};
