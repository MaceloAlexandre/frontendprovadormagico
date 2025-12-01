"use client";
import { Shirt } from "lucide-react";

export default function WardrobeSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Meu Guarda Roupa</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition">
            <div className="bg-gray-200 rounded-lg h-40 mb-3 flex items-center justify-center">
              <Shirt size={48} className="text-gray-400" />
            </div>
            <p className="font-semibold text-gray-800">Peça {item}</p>
            <p className="text-sm text-gray-500">Categoria</p>
          </div>
        ))}
      </div>
    </div>
  );
}