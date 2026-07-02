
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
    logout();
    setShowLogoutDialog(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-orange-100">
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
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-900 text-white p-5 rounded-b-[2rem] shadow-xl shadow-purple-900/20">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -top-12 -right-10 w-40 h-40 rounded-full bg-fuchsia-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 w-40 h-40 rounded-full bg-orange-400/20 blur-3xl" />

        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-white to-purple-100 flex items-center justify-center ring-2 ring-white/40 shadow-md">
              <span className="text-purple-700 font-bold text-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Hi, {user?.name} 👋</h1>
              <p className="text-xs opacity-80">Welcome back!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setCurrentView('transaction-history')}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-sm p-2 rounded-full ring-1 ring-white/20"
            >
              <Bell className="w-5 h-5" />
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
        <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-5 ring-1 ring-white/20 shadow-inner">
          <div className="flex items-center justify-between mb-1">
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
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
            {balanceVisible ? `₦${(user?.balance || 0).toLocaleString()}.00` : '₦***,***.00'}
          </h2>
          <p className="text-xs opacity-80 mt-1">Weekly Rewards: ₦180,000.00</p>


          <div className="flex space-x-3 mt-5">
            <Button
              onClick={() => setCurrentView('upgrade')}
              className="flex-1 bg-white text-purple-700 hover:bg-purple-50 rounded-full py-3 flex items-center justify-center space-x-2 shadow-lg shadow-black/10 font-semibold"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Upgrade</span>
            </Button>
            <Button
              onClick={() => setCurrentView('transfer')}
              className="flex-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:opacity-95 rounded-full py-3 flex items-center justify-center space-x-2 shadow-lg shadow-pink-500/30 font-semibold"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Transfer</span>
            </Button>
          </div>

        </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white mb-8">
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="group flex flex-col items-center text-center focus:outline-none"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg shadow-black/10 ring-1 ring-white/40 mb-2 transition-transform duration-200 group-hover:-translate-y-0.5 group-active:scale-95`}>
                  <span className="text-2xl drop-shadow-sm">{action.icon}</span>
                </div>
                <p className="text-[11px] font-medium text-gray-700 leading-tight">{action.label}</p>
              </button>
            ))}
          </div>
        </div>


        {/* Promotions Carousel */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Current Promotions</h3>
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
                  <div className="relative rounded-2xl overflow-hidden h-[240px]">
                    <img 
                      src={promotion.image} 
                      alt={promotion.title}
                      className="w-full h-full object-cover"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex space-x-3">
              <Button
                onClick={cancelLogout}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg"
              >
                No
              </Button>
              <Button
                onClick={confirmLogout}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
              >
                Yes
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
