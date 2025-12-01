"use client";
import type { LucideIcon } from "lucide-react";

interface HomeSectionProps {
  menuItems: { id: string; label: string; icon: LucideIcon }[];
  onMenuClick: (id: string) => void;
}

export default function HomeSection({ menuItems, onMenuClick }: HomeSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Bem-vindo ao Provador Mágico! ✨</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onMenuClick(item.id)}
              className="bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-3 transition transform hover:scale-[1.02]"
            >
              <Icon size={32} />
              <span className="text-lg font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}