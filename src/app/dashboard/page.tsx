"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Shirt, 
  User, 
  Palette,
  RefreshCw,
  Settings,
  History,
  ShoppingBag
} from "lucide-react";
import { logout, getUserCredits, getUserFromToken } from "@/lib/api";

// Componentes
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CreditsModal from "./components/CreditsModal";

// Seções
import HomeSection from "./components/sections/profilebar/Home";
import MagicalTryonSection from "./components/sections/sidebar/MagicalTryOn";
import AdjustClothesSection from "./components/sections/sidebar/AdjustClothes";
import AdjustPersonSection from "./components/sections/sidebar/AdjustPerson";
import ColorPaletteSection from "./components/sections/sidebar/ColorPalette";
import WardrobeSection from "./components/sections/sidebar/Wardrobe";
import ProfileSection from "./components/sections/profilebar/Profile";
import HistorySection from "./components/sections/profilebar/History";
import PurchasesSection from "./components/sections/profilebar/Purchases";
import SettingsSection from "./components/sections/profilebar/Settings";

export default function DashboardPage() {
  const router = useRouter();
  
  // Estados
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [userCredits, setUserCredits] = useState<number | null>(null);
  const [isLoadingCredits, setIsLoadingCredits] = useState(true);
  const [creditsError, setCreditsError] = useState<string | null>(null);
  const [userName, setUserName] = useState("Usuário");
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Menu items
  const menuItems = [
    { id: "magical-tryon", label: "Provador Mágico", icon: Sparkles },
    { id: "adjust-clothes", label: "Ajustar Roupa", icon: Shirt },
    { id: "adjust-person", label: "Ajustar Pessoa", icon: User },
    { id: "color-palette", label: "Paleta de Cores", icon: Palette },
    { id: "wardrobe", label: "Meu Guarda Roupa", icon: Shirt },
  ];

  const userMenuItems = [
    { id: "profile", label: "Meu Perfil", icon: User },
    { id: "wardrobe", label: "Meu Guarda Roupa", icon: Shirt },
    { id: "history", label: "Meu Histórico", icon: History },
    { id: "purchases", label: "Compras", icon: ShoppingBag },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  // Efeitos
  useEffect(() => {
    setIsClient(true);
    const userInfo = getUserFromToken();
    
    if (!userInfo) {
      router.push('/login');
      return;
    }
    
    setUserName(userInfo.username || "Usuário");
    setUserEmail(userInfo.email || "");
    setIsAdmin(userInfo.role === "ROLE_ADMIN");
    
    fetchCredits();
  }, [router]);

  // Funções
  const fetchCredits = async () => {
    setIsLoadingCredits(true);
    setCreditsError(null);
    try {
      const data = await getUserCredits();
      setUserCredits(data.credits);
    } catch (error) {
      console.error('Erro ao buscar créditos:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar créditos';
      setCreditsError(errorMessage);
      
      if (errorMessage.includes('401') || errorMessage.includes('não autenticado')) {
        router.push('/login');
      }
    } finally {
      setIsLoadingCredits(false);
    }
  };

  const handleMenuClick = (id: string) => {
    setActiveSection(id);
    setIsSidebarOpen(false);
  };

  const handleUserMenuClick = (id: string) => {
    setShowUserMenu(false);
    handleMenuClick(id);
  };

  // Renderizar conteúdo baseado na seção ativa
  const renderContent = () => {
    switch (activeSection) {
      case "magical-tryon":
        return <MagicalTryonSection />;
      case "adjust-clothes":
        return <AdjustClothesSection />;
      case "adjust-person":
        return <AdjustPersonSection />;
      case "color-palette":
        return <ColorPaletteSection />;
      case "wardrobe":
        return <WardrobeSection />;
      case "profile":
        return <ProfileSection userName={userName} userEmail={userEmail} isAdmin={isAdmin} />;
      case "history":
        return <HistorySection />;
      case "purchases":
        return <PurchasesSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <HomeSection menuItems={menuItems} onMenuClick={handleMenuClick} />;
    }
  };

  // Loading inicial
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <RefreshCw size={48} className="animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      
      {/* Navbar */}
      <Navbar
        userName={userName}
        userEmail={userEmail}
        userCredits={userCredits}
        isLoadingCredits={isLoadingCredits}
        creditsError={creditsError}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onToggleCreditsModal={() => setShowCreditsModal(!showCreditsModal)}
        showUserMenu={showUserMenu}
        onToggleUserMenu={() => setShowUserMenu(!showUserMenu)}
        userMenuItems={userMenuItems}
        onUserMenuClick={handleUserMenuClick}
        onLogout={logout}
      />

      {/* Modal de Créditos */}
      <CreditsModal
        isOpen={showCreditsModal}
        onClose={() => setShowCreditsModal(false)}
        userCredits={userCredits}
        isLoadingCredits={isLoadingCredits}
        creditsError={creditsError}
        onRetry={fetchCredits}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          activeSection={activeSection}
          menuItems={menuItems}
          onMenuClick={handleMenuClick}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Conteúdo Principal */}
        <main className={`flex-1 p-6 lg:p-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}>
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}