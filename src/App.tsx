import React, { useState } from 'react';
import { NavTab } from './types';
import { VIETINBANK_BRAND, BRANCHES_DATA } from './data/vietinbankData';
import { Header } from './components/Header';
import { HomeOverview } from './components/HomeOverview';
import { FaqSection } from './components/FaqSection';
import { DownloadIpaySection } from './components/DownloadIpaySection';
import { FlappyGameSection } from './components/FlappyGameSection';
import { DepositCalculator } from './components/DepositCalculator';
import { LoanCalculator } from './components/LoanCalculator';
import { FeaturedProducts } from './components/FeaturedProducts';
import { BranchesSection } from './components/BranchesSection';
import { ConsultantModal } from './components/ConsultantModal';
import { ThankYouModal } from './components/ThankYouModal';
import { Phone, Building2, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('can-tho');
  
  // Consultant Modal State
  const [isConsultantOpen, setIsConsultantOpen] = useState<boolean>(false);
  const [consultantModalTitle, setConsultantModalTitle] = useState<string>('Tư vấn Dịch vụ VietinBank');
  const [consultantModalMessage, setConsultantModalMessage] = useState<string | undefined>(undefined);

  // Thank You Modal State (PDF 1 requirement: "Kết thúc cuộc trò chuyện")
  const [isThankYouOpen, setIsThankYouOpen] = useState<boolean>(false);

  const handleOpenConsultantForProduct = (productName: string) => {
    setConsultantModalTitle(`Tư vấn: ${productName}`);
    setConsultantModalMessage(
      `Cảm ơn Quý khách đã quan tâm đến "${productName}". Quý khách vui lòng liên hệ cán bộ VietinBank tại quầy để được tư vấn chi tiết.`
    );
    setIsConsultantOpen(true);
  };

  const handleOpenGeneralConsultant = () => {
    setConsultantModalTitle('Hỗ trợ & Tư vấn trực tiếp tại quầy');
    setConsultantModalMessage(undefined);
    setIsConsultantOpen(true);
  };

  const handleReturnHome = () => {
    setCurrentTab('home');
  };

  const currentBranch = BRANCHES_DATA.find((b) => b.id === selectedBranchId) || BRANCHES_DATA[0];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Kiosk App Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        selectedBranchId={selectedBranchId}
        onSelectBranch={setSelectedBranchId}
        onOpenConsultant={handleOpenGeneralConsultant}
      />

      {/* Main Viewport Content Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'home' && (
          <HomeOverview
            onSelectTab={setCurrentTab}
            selectedBranchId={selectedBranchId}
            onOpenConsultant={handleOpenGeneralConsultant}
          />
        )}

        {currentTab === 'faq' && (
          <FaqSection
            onReturnHome={handleReturnHome}
            onOpenThankYou={() => setIsThankYouOpen(true)}
            onOpenConsultant={handleOpenGeneralConsultant}
          />
        )}

        {currentTab === 'download' && (
          <DownloadIpaySection />
        )}

        {currentTab === 'game' && (
          <FlappyGameSection
            onReturnHome={handleReturnHome}
          />
        )}

        {currentTab === 'deposit' && (
          <DepositCalculator
            onOpenConsultant={handleOpenGeneralConsultant}
            onGoToDownload={() => setCurrentTab('download')}
          />
        )}

        {currentTab === 'loan' && (
          <LoanCalculator
            onOpenConsultant={handleOpenGeneralConsultant}
          />
        )}

        {currentTab === 'products' && (
          <FeaturedProducts
            onOpenConsultantForProduct={handleOpenConsultantForProduct}
          />
        )}

        {currentTab === 'branches' && (
          <BranchesSection
            selectedBranchId={selectedBranchId}
            onSelectBranch={setSelectedBranchId}
          />
        )}
      </main>

      {/* Clean Kiosk Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#00386B]">{VIETINBANK_BRAND.fullName}</span>
            <span>·</span>
            <span>Chi nhánh {currentBranch.name}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span>Tổng đài CSKH 24/7: <strong className="text-slate-900">{VIETINBANK_BRAND.hotline247}</strong></span>
            <span>·</span>
            <span>Tư vấn viên quầy: <strong className="text-slate-900">{VIETINBANK_BRAND.consultant.phone}</strong></span>
          </div>
        </div>
      </footer>

      {/* Shared Modals */}
      <ConsultantModal
        isOpen={isConsultantOpen}
        onClose={() => setIsConsultantOpen(false)}
        title={consultantModalTitle}
        customMessage={consultantModalMessage}
      />

      <ThankYouModal
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
        onReturnHome={handleReturnHome}
      />
    </div>
  );
}
