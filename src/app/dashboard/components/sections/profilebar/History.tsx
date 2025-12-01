"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Download, Calendar, AlertCircle, Image as ImageIcon } from "lucide-react";
import { getTryOnHistory, resolveImageUrl } from "@/lib/api";

interface HistoryItem {
  id: number;
  imageUrl: string;
  createdAt: string;
}

export default function HistorySection() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getTryOnHistory();
      setHistory(data);
    } catch (err) {
      console.error('Erro ao carregar histórico:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar histórico';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const downloadImage = (imageUrl: string, id: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `tryon-${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Meu Histórico</h2>
        <div className="bg-white rounded-2xl p-12 shadow-md flex flex-col items-center justify-center">
          <RefreshCw size={48} className="animate-spin text-purple-600 mb-4" />
          <p className="text-gray-600">Carregando histórico...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Meu Histórico</h2>
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <p className="font-semibold text-red-800">Erro ao carregar histórico</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
              <button
                onClick={loadHistory}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
              >
                <RefreshCw size={16} />
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Meu Histórico</h2>
          <p className="text-gray-600 mt-1">Todas as suas provas virtuais</p>
        </div>
        <button
          onClick={loadHistory}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition"
        >
          <RefreshCw size={18} />
          Atualizar
        </button>
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-md text-center">
          <ImageIcon className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Nenhuma prova virtual ainda
          </h3>
          <p className="text-gray-500">
            Faça sua primeira prova virtual para começar seu histórico!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
            >
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={resolveImageUrl(item.imageUrl)}
                  alt={`Try-on ${item.id}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Overlay com ações */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => downloadImage(item.imageUrl, item.id)}
                    className="bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition transform hover:scale-110"
                    title="Baixar imagem"
                  >
                    <Download size={20} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}