"use client";
import { X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  activeSection: string;
  menuItems: { id: string; label: string; icon: LucideIcon }[];
  onMenuClick: (id: string) => void;
  onClose: () => void;
}

export default function Sidebar({
  isOpen,
  activeSection,
  menuItems,
  onMenuClick,
  onClose
}: SidebarProps) {
  return (
    <aside
      className={`fixed top-[57px] left-0 h-[calc(100vh-57px)] bg-white shadow-xl transition-all duration-300 z-40 ${
        isOpen ? "w-64" : "w-0"
      } overflow-hidden`}
    >
      <div className="p-4 space-y-2 w-64">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-700">Menu</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onMenuClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeSection === item.id
                  ? "bg-purple-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}