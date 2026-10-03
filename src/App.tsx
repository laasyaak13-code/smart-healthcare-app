import React, { useState } from 'react';
import { AcademicNotice } from './components/AcademicNotice';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MyHealthSection } from './components/MyHealthSection';
import { HealthRecordsSection } from './components/HealthRecordsSection';
import { AiHealthSection } from './components/AiHealthSection';
import { AppointmentsSection } from './components/AppointmentsSection';
import { MedicationsSection } from './components/MedicationsSection';
import { EmergencySection } from './components/EmergencySection';
import { FindCareSection } from './components/FindCareSection';
import { DashboardSection } from './components/DashboardSection';
import { TechOverviewSection } from './components/TechOverviewSection';
import { SupportSection } from './components/SupportSection';
import { Footer } from './components/Footer';
import { ToastNotification, ToastMessage } from './components/ToastNotification';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { INITIAL_NOTIFICATIONS } from './data/mockData';
import { AppNotification } from './types';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('fac-1');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleShowToast = (text: string, type: 'success' | 'alert' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    handleShowToast('Notification marked as read.', 'info');
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100'
    }`}>
      {/* Top Academic Banner */}
      <AcademicNotice compact />

      {/* Main Navbar */}
      <Navbar
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onNavigate={handleNavigate}
      />

      <main>
        {/* 1. Home Section */}
        <HeroSection onNavigate={handleNavigate} />

        {/* 2. My Health Section */}
        <MyHealthSection onShowToast={handleShowToast} />

        {/* 3. Health Records Section */}
        <HealthRecordsSection onShowToast={handleShowToast} />

        {/* 4. AI Health Section */}
        <AiHealthSection onShowToast={handleShowToast} />

        {/* 5. Appointments Section */}
        <AppointmentsSection onShowToast={handleShowToast} />

        {/* 6. Medications Section */}
        <MedicationsSection onShowToast={handleShowToast} />

        {/* 7. Emergency Care Section */}
        <EmergencySection 
          onNavigate={handleNavigate} 
          onSelectFacility={(id) => setSelectedFacilityId(id)}
          onShowToast={handleShowToast} 
        />

        {/* 8. Find Care & Route Visualization Section */}
        <FindCareSection 
          externalSelectedFacilityId={selectedFacilityId}
          onShowToast={handleShowToast} 
        />

        {/* 9. Smart Healthcare Dashboard */}
        <DashboardSection onNavigate={handleNavigate} onShowToast={handleShowToast} />

        {/* 10. Behind CareConnect: How It Works */}
        <TechOverviewSection />

        {/* 11. Support & Help Center */}
        <SupportSection onNavigate={handleNavigate} onShowToast={handleShowToast} />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Toast Feedback */}
      <ToastNotification toasts={toasts} onDismiss={handleDismissToast} />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
