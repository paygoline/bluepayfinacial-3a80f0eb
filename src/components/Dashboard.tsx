
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from '@/components/ui/carousel';
import { useAuth } from '../contexts/AuthContext';
import { useAutoSlide } from '../hooks/useAutoSlide';
import { Bell, Eye, EyeOff, ArrowUp, CheckCircle, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import { DashboardSkeleton, Spinner } from './ui/loader';
import BuyPayId from './BuyPayId';
import Transfer from './Transfer';
import Airtime from './Airtime';
import Data from './Data';
import Support from './Support';
import EarnMore from './EarnMore';
import Profile from './Profile';
import ProfileInfo from './ProfileInfo';
import About from './About';
import TransactionHistory from './TransactionHistory';
import ReferEarn from './ReferEarn';
import Upgrade from './Upgrade';
import JoinCommunities from './JoinCommunities';
import Onboarding from './Onboarding';
import ReferEarnPopup from './ReferEarnPopup';

const Dashboard = () => {
  const { user, logout, isOnboardingComplete, completeOnboarding, showReferPopup, hideReferPopup } = useAuth();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [currentView, setCurrentView] = useState('dashboard');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showOnboardingPopup, setShowOnboardingPopup] = useState(!isOnboardingComplete);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useAutoSlide(api, 4000);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);


  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
      setShowLogoutDialog(false);
      setIsLoggingOut(false);
    }, 800);
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  const handleCompleteOnboarding = () => {
    completeOnboarding();
    setShowOnboardingPopup(false);
  };



  const quickActions = [
    {
      icon: "💳",
      label: "Buy PAY ID",
      gradient: "from-purple-500 to-fuchsia-500",
      action: () => setCurrentView('buy-pay-id')
    },
    {
      icon: "📺",
      label: "Watch",
      gradient: "from-slate-700 to-slate-900",
      action: () => window.open('t.me/Paygofficial', '_blank')
    },
    {
      icon: "📱",
      label: "Airtime",
      gradient: "from-sky-500 to-blue-600",
      action: () => setCurrentView('airtime')
    },
    {
      icon: "🌐",
      label: "Data",
      gradient: "from-rose-500 to-red-600",
      action: () => setCurrentView('data')
    },
    {
      icon: "🎧",
      label: "Support",
      gradient: "from-teal-500 to-emerald-600",
      action: () => setCurrentView('support')
    },
    {
      icon: "👥",
      label: "Group",
      gradient: "from-cyan-500 to-sky-600",
      action: () => setCurrentView('join-communities')
    },
    {
      icon: "💰",
      label: "Earn More",
      gradient: "from-amber-400 to-orange-500",
      action: () => setCurrentView('earn-more')
    },
    {
      icon: "👤",
      label: "Profile",
      gradient: "from-indigo-500 to-purple-600",
      action: () => setCurrentView('profile')
    }
  ];

  const promotions = [
    {
      title: "Transact & Win",
      subtitle: "Great prizes await",
      description: "All customers who pay with PayGo in store will stand a chance to win great prizes",
      image: "/lovable-uploads/3ce9f1fb-b753-4102-8a22-a51a0cf90c72.png"
    },
    {
      title: "Mobile Money",
      subtitle: "AUGUST 27-28",
      description: "Special promotion for mobile money transactions",
      image: "/lovable-uploads/c33112b4-8b2b-4d2d-97d5-5db6d30d2254.png"
    },
    {
      title: "Winners",
      subtitle: "of K20 airtime",
      names: ["Patience Ng'andwe", "Phiri John"],
      image: "/lovable-uploads/df8c5190-45dd-42bb-a63b-2d0ac0fe8e40.png"
    }
  ];

  if (currentView === 'buy-pay-id') {
    return <BuyPayId onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'transfer') {
    return <Transfer onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'airtime') {
    return <Airtime onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'data') {
    return <Data onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'support') {
    return <Support onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'earn-more') {
    return <EarnMore onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'profile') {
    return <Profile 
      onBack={() => setCurrentView('dashboard')} 
      onNavigate={(page) => setCurrentView(page)}
    />;
  }

  if (currentView === 'profile-info') {
    return <ProfileInfo onBack={() => setCurrentView('profile')} />;
  }

  if (currentView === 'about') {
    return <About onBack={() => setCurrentView('profile')} />;
  }

  if (currentView === 'transaction-history') {
    return <TransactionHistory onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'refer-earn') {
    return <ReferEarn 
      onBack={() => setCurrentView('dashboard')} 
      onNavigate={(page) => setCurrentView(page)}
    />;
  }

  if (currentView === 'upgrade') {
    return <Upgrade onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'join-communities') {
    return <JoinCommunities onBack={() => setCurrentView('dashboard')} />;
  }

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 animate-fade-in-up">
      {/* Onboarding Popup */}
      {showOnboardingPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
            <Onboarding onComplete={handleCompleteOnboarding} />
          </div>
        </div>
      )}

      {/* Sliding Banner */}
      <div className="bg-white p-3 overflow-hidden border-b">
        <div className="animate-slide-banner whitespace-nowrap text-red-500">
          Dear user we're currently having issues with OPay bank kindly use another bank for your payment of pay Id
        </div>
      </div>

      {/* Header */}
      <div className="mx-2">
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 text-white p-5 rounded-b-[2rem] shadow-2xl shadow-purple-900/30">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -top-12 -right-10 w-48 h-48 rounded-full bg-fuchsia-500/30 blur-3xl animate-float-slow" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-orange-400/25 blur-3xl animate-float-slow" style={{ animationDelay: '1s' }} />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />

        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-white to-purple-100 flex items-center justify-center ring-2 ring-white/40 shadow-md animate-pulse-ring">
                <span className="text-purple-700 font-bold text-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-purple-900" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Hi, {user?.name} 👋</h1>
              <p className="text-xs opacity-80 flex items-center gap-1"><Shield className="w-3 h-3" /> Verified account</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setCurrentView('transaction-history')}
              className="relative bg-white/15 hover:bg-white/25 backdrop-blur-sm p-2 rounded-full ring-1 ring-white/20"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white px-3 py-2 rounded-full text-xs ring-1 ring-white/20"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-5 ring-1 ring-white/25 shadow-inner">
          {/* Shine effect */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shine" />
          </div>

          <div className="relative flex items-center justify-between mb-1">
            <p className="text-xs uppercase tracking-wider opacity-80 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Your Balance
            </p>
            <Button
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="bg-white/15 hover:bg-white/25 p-2 rounded-full"
            >
              {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <h2 className="relative text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-50 to-fuchsia-100 bg-clip-text text-transparent drop-shadow-sm">
            {balanceVisible ? `₦${(user?.balance || 0).toLocaleString()}.00` : '₦***,***.00'}
          </h2>
          <p className="relative text-xs opacity-80 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-300" /> Weekly Rewards: ₦180,000.00
          </p>

          <div className="relative flex space-x-3 mt-5">
            <Button
              onClick={() => setCurrentView('upgrade')}
              className="flex-1 bg-white text-purple-700 hover:bg-purple-50 rounded-full py-3 flex items-center justify-center space-x-2 shadow-lg shadow-black/10 font-semibold transition-all active:scale-95"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Upgrade</span>
            </Button>
            <Button
              onClick={() => setCurrentView('transfer')}
              className="flex-1 bg-gradient-to-r from-orange-400 via-pink-500 to-fuchsia-500 text-white hover:opacity-95 rounded-full py-3 flex items-center justify-center space-x-2 shadow-lg shadow-pink-500/40 font-semibold transition-all active:scale-95"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Transfer</span>
            </Button>
          </div>
        </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="px-6 pt-5">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <TrendingUp className="w-4 h-4" />, label: 'Earnings', value: '₦12,450', tint: 'from-emerald-400 to-teal-500' },
            { icon: <Zap className="w-4 h-4" />, label: 'Referrals', value: '24', tint: 'from-amber-400 to-orange-500' },
            { icon: <Shield className="w-4 h-4" />, label: 'Tier', value: 'Silver', tint: 'from-indigo-400 to-purple-500' },
          ].map((s, i) => (
            <div key={i} className="animate-fade-in-up bg-white/70 backdrop-blur-md rounded-2xl p-3 border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]" style={{ animationDelay: `${i * 80}ms` }}>
              <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${s.tint} text-white flex items-center justify-center shadow-md mb-1.5`}>
                {s.icon}
              </div>
              <p className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold">{s.label}</p>
              <p className="text-sm font-bold text-gray-800">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 pt-4">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-gray-800">Quick Actions</h3>
            <span className="text-[10px] text-gray-500">Tap to open</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="group flex flex-col items-center text-center focus:outline-none animate-fade-in-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg shadow-black/10 ring-1 ring-white/40 mb-2 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-xl group-active:scale-95`}>
                  <span className="text-2xl drop-shadow-sm">{action.icon}</span>
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-white/20 pointer-events-none" />
                </div>
                <p className="text-[11px] font-medium text-gray-700 leading-tight">{action.label}</p>
              </button>
            ))}
          </div>
        </div>


        {/* Promotions Carousel */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" /> Current Promotions
          </h3>
          <Carousel 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
          >
            <CarouselContent>
              {promotions.map((promotion, index) => (
                <CarouselItem key={index}>
                  <div className="relative rounded-2xl overflow-hidden h-[240px] shadow-lg shadow-purple-900/10 ring-1 ring-white/50">
                    <img 
                      src={promotion.image} 
                      alt={promotion.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in-up">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex space-x-3">
              <Button
                onClick={cancelLogout}
                disabled={isLoggingOut}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg"
              >
                No
              </Button>
              <Button
                onClick={confirmLogout}
                disabled={isLoggingOut}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                {isLoggingOut ? <><Spinner size="sm" /> Logging out...</> : 'Yes'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Refer & Earn Popup */}
      {showReferPopup && (
        <ReferEarnPopup onClose={hideReferPopup} />
      )}
    </div>
  );
};


export default Dashboard;
