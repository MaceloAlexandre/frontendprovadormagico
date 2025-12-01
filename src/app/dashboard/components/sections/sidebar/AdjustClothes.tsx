"use client";

import { useState, useRef } from "react";
import { Upload, Sparkles, X, RefreshCw, Download, AlertCircle, Check } from "lucide-react";
import { processFixClothes, resolveImageUrl } from "@/lib/api";

export default function AdjustClothesSection() {
  const [clothesFile, setClothesFile] = useState<File | null>(null);
  const [clothesPreview, setClothesPreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    // Validações
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      setError('Formato inválido. Use JPG, PNG ou WEBP');
      return;
    }

    if (file.size > maxSize) {
      setError('Imagem muito grande. Máximo 10MB');
      return;
    }

    // Criar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setClothesFile(file);
      setClothesPreview(reader.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setClothesFile(null);
    setClothesPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    if (!clothesFile) {
      setError('Por favor, selecione a imagem da roupa');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await processFixClothes(clothesFile);
      
      if (response.url) {
        setResultImage(response.url);
        setSuccess(response.message);
        
        // Disparar evento para atualizar créditos
        window.dispatchEvent(new Event('creditsUpdated'));
      } else {
        setError(response.message || 'Erro ao processar imagem');
      }
    } catch (err) {
      console.error('Erro ao processar fix-clothes:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao processar. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setClothesFile(null);
    setClothesPreview(null);
    setResultImage(null);
    setError(null);
    setSuccess(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadResult = () => {
    if (!resultImage) return;
    
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `clothes-fixed-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Ajustar Roupa</h2>
          <p className="text-gray-600 mt-1">Padronize e remova o fundo das suas peças</p>
        </div>
        {(clothesFile || resultImage) && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
          >
            <RefreshCw size={18} />
            Limpar Tudo
          </button>
        )}
      </div>

      {/* Alertas */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-red-800">Erro</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-green-800">Sucesso!</p>
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        </div>
      )}

      {/* Grid de Upload e Resultado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Upload da Roupa */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles size={20} className="text-blue-600" />
              Imagem da Roupa
            </h3>

            {!clothesPreview ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto text-gray-400 mb-3" size={40} />
                <p className="text-gray-600 mb-2">Arraste a imagem ou clique para selecionar</p>
                <p className="text-sm text-gray-500">JPG, PNG ou WEBP (máx. 10MB)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={clothesPreview}
                  alt="Roupa selecionada"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Informações */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-3">O que esta função faz:</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Remove o modelo/pessoa da foto</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Remove o fundo, deixando apenas a roupa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Padroniza em fundo branco ou cinza claro</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Completa partes ocultas da roupa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Ideal para criar catálogos profissionais</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Resultado */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles size={20} className="text-green-600" />
            Resultado
          </h3>

          {resultImage ? (
            <div className="space-y-4">
              <div className="relative bg-gray-50 rounded-xl p-4 border border-gray-200">
                <img
                  src={resolveImageUrl(resultImage)}
                  alt="Roupa ajustada"
                  className="w-full h-64 object-contain rounded-lg"
                />
              </div>
              <button
                onClick={downloadResult}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold"
              >
                <Download size={20} />
                Baixar Imagem
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 h-64 flex items-center justify-center text-center">
              <div className="text-gray-400">
                <Sparkles className="mx-auto mb-3" size={40} />
                <p className="text-sm">A roupa ajustada aparecerá aqui</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Botão de Processar */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!clothesFile || isProcessing}
          className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition transform ${
            !clothesFile || isProcessing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white hover:scale-105 shadow-lg'
          }`}
        >
          {isProcessing ? (
            <>
              <RefreshCw size={24} className="animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Sparkles size={24} />
              Ajustar e Padronizar Roupa
            </>
          )}
        </button>
      </div>
    </div>
  );
}