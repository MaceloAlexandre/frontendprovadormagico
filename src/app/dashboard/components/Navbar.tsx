"use client";
import { 
  LogOut, 
  Sparkles, 
  Menu,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";


interface NavbarProps {
  userName: string;
  userEmail: string;
  userCredits: number | null;
  isLoadingCredits: boolean;
  creditsError: string | null;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onToggleCreditsModal: () => void;
  showUserMenu: boolean;
  onToggleUserMenu: () => void;
  userMenuItems: { id: string; label: string; icon: LucideIcon }[];
  onUserMenuClick: (id: string) => void;
  onLogout: () => void;
}

export default function Navbar({
  userName,
  userEmail,
  userCredits,
  isLoadingCredits,
  creditsError,
  isSidebarOpen,
  onToggleSidebar,
  onToggleCreditsModal,
  showUserMenu,
  onToggleUserMenu,
  userMenuItems,
  onUserMenuClick,
  onLogout
}: NavbarProps) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        
        {/* Logo e Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="relative p-2 hover:bg-purple-50 rounded-lg transition group"
          >
            <Menu size={24} className="text-gray-700" />
            {!isSidebarOpen && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
            )}
          </button>
          
          <div className="flex items-center gap-2">
            <Sparkles size={28} className="text-purple-500" />
            <span className="font-bold text-xl text-gray-800 hidden sm:block">Provador Mágico</span>
          </div>
        </div>

        {/* Créditos + Usuário */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleCreditsModal}
            className="relative flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition"
            disabled={isLoadingCredits}
          >
            <Sparkles size={18} />
            {isLoadingCredits ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : creditsError ? (
              <AlertCircle size={16} />
            ) : (
              <span className="font-semibold">{userCredits ?? 0}</span>
            )}
            <span className="hidden sm:inline text-sm">créditos</span>
          </button>

          <div className="relative">
            <button 
              onClick={onToggleUserMenu}
              className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-semibold hover:from-purple-500 hover:to-indigo-500 transition"
            >
              {userName.charAt(0).toUpperCase()}
            </button>

            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={onToggleUserMenu}/>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl z-50 py-2 border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">{userName}</p>
                    <p className="text-sm text-gray-500 truncate">{userEmail}</p>
                  </div>
                  
                  {userMenuItems.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => onUserMenuClick(id)}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-purple-50 text-gray-700 transition"
                    >
                      <Icon size={18} />
                      {label}
                    </button>
                  ))}

                  <hr className="my-2" />

                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition"
                  >
                    <LogOut size={18} />
                    Sair
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}
