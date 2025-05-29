import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';  // Importing AdminDashboard
import AdminLogin from './components/AdminLogin';  // Importing AdminLogin
import ArticleDetail from './pages/ArticleDetail';
import EditArticle from './pages/EditArticle';
import TodayHistoryPage from './pages/TodayHistoryPage';
import VisionSection from './pages/VisionSection';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookieConsentBanner from './components/CookieConsentBanner';
import AncientHistory from "./pages/history/AncientHistory";
import MedievalHistory from "./pages/history/MedievalHistory";
import ModernHistory from "./pages/history/ModernHistory";
import HistoryArticles from "./pages/history/HistoryArticles";
import ContactForm from './pages/Contact';
import History from './pages/History';
import ScrollToTop from './components/ScrollToTop';
// Placeholder pages
 
const Diversity = () => <div className="p-6">🌍 Diversity Page Coming Soon</div>;
const Documentary = () => <div className="p-6">🎬 Documentary Page Coming Soon</div>;

// Placeholder for 404 route
const NotFound = () => <div className="p-6">404: Page Not Found</div>;

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <div className="bg-gray-50 min-h-screen font-sans">
        <Navbar />
        <main className="w-full px-4 py-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/diversity" element={<Diversity />} />
            <Route path="/documentary" element={<Documentary />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* Admin route */}
            <Route path="/admin-login" element={<AdminLogin />} /> {/* Admin login route */}
            <Route path="*" element={<NotFound />} /> {/* Catch-all for undefined routes */}
            <Route path="/article/:slug" element={<ArticleDetail />} />
            <Route path="/admin/edit-article/:id" element={<EditArticle />} />
            <Route path="/today-history" element={<TodayHistoryPage />} />
            <Route path="/vision" element={<VisionSection />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/history/ancient" element={<AncientHistory />} />
            <Route path="/history/medieval" element={<MedievalHistory />} />
            <Route path="/history/modern" element={<ModernHistory />} />
            <Route path="/history/articles" element={<HistoryArticles />} />
            <Route path="/history" element={<History/>} />
            <Route path='/contact' element={<ContactForm/>}/>
          </Routes>
        </main>
        <CookieConsentBanner/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
