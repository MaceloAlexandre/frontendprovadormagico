"use client";

export default function ColorPaletteSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Paleta de Cores</h2>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-200">
        <p className="text-gray-600 mb-6">
          Descubra as cores que mais combinam com você!
        </p>
        <div className="grid grid-cols-5 gap-4 mb-6">
          {["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"].map((color, i) => (
            <div key={i} className={`${color} h-20 rounded-lg shadow-md`} />
          ))}
        </div>
        <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition">
          Analisar Paleta
        </button>
      </div>
    </div>
  );
}
