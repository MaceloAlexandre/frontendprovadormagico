"use client";

export default function AdjustPersonSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Ajustar Pessoa</h2>
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
        <p className="text-gray-600 mb-6">
          Ajuste parâmetros do modelo virtual para melhor visualização.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
          Ajustar Modelo
        </button>
      </div>
    </div>
  );
}
