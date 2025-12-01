"use client";
import { X, RefreshCw, AlertCircle, Plus } from "lucide-react";
import { useEffect } from "react";
import { creditEvents } from "../../../lib/creditEvents"; // ajuste o caminho conforme necessário

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userCredits: number | null;
  isLoadingCredits: boolean;
  creditsError: string | null;
  onRetry: () => void;
}

export default function CreditsModal({
  isOpen,
  onClose,
  userCredits,
  isLoadingCredits,
  creditsError,
  onRetry
}: CreditsModalProps) {
  // Escuta eventos de mudança de créditos
  useEffect(() => {
    const unsubscribe = creditEvents.subscribe(() => {
      onRetry(); // Recarrega os créditos quando há mudança
    });

    return unsubscribe;
  }, [onRetry]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Seus Créditos</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>
        
        {isLoadingCredits ? (
          <div className="flex justify-center items-center py-12">
            <RefreshCw size={32} className="animate-spin text-purple-600" />
          </div>
        ) : creditsError ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 text-red-700 mb-3">
              <AlertCircle size={20} />
              <p className="font-semibold">Erro ao carregar créditos</p>
            </div>
            <p className="text-red-600 text-sm mb-4">{creditsError}</p>
            <button
              onClick={onRetry}
              className="flex items-center gap-2 text-red-700 hover:text-red-800 font-medium"
            >
              <RefreshCw size={16} />
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-6 mb-6">
              <p className="text-gray-600 mb-2">Saldo atual</p>
              <p className="text-4xl font-bold text-purple-700">{userCredits ?? 0} créditos</p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                <Plus size={20} />
                Comprar 100 créditos - R$ 29,90
              </button>
              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                <Plus size={20} />
                Comprar 500 créditos - R$ 129,90
              </button>
              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                <Plus size={20} />
                Comprar 1000 créditos - R$ 229,90
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}