
import React from 'react';

interface HeaderProps {
  onHome: () => void;
  isLoggedIn: boolean;
  phone?: string;
}

const Header: React.FC<HeaderProps> = ({ onHome, isLoggedIn, phone }) => {
  return (
    <header className="sticky top-0 z-50 glass-morphism border-b px-4 py-3 sm:px-8 flex justify-between items-center">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={onHome}
      >
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
          R
        </div>
        <span className="font-bold text-xl tracking-tight hidden sm:block">RetailPay</span>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-gray-600 font-medium">{phone}</span>
          </div>
        ) : (
          <span className="text-sm font-medium text-gray-400">Not Logged In</span>
        )}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
          <img src="https://picsum.photos/id/64/100" alt="User" />
        </div>
      </div>
    </header>
  );
};

export default Header;
