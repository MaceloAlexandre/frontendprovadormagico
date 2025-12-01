"use client";

import { useEffect, useState } from "react";
import { processTryOn } from "@/lib/api";
import { resolveImageUrl } from "@/lib/api";
import { UploadCloud } from "lucide-react";
import { creditEvents } from "@/lib/creditEvents"; // ajuste o caminho conforme necessário

export default function MagicalTryonSection() {
  const [dressFile, setDressFile] = useState<File | null>(null);
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [dressPreview, setDressPreview] = useState<string | null>(null);
  const [modelPreview, setModelPreview] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Generate previews
  useEffect(() => {
    if (dressFile) {
      const url = URL.createObjectURL(dressFile);
      setDressPreview(url);
      return () => URL.revokeObjectURL(url);
    } else setDressPreview(null);
  }, [dressFile]);

  useEffect(() => {
    if (modelFile) {
      const url = URL.createObjectURL(modelFile);
      setModelPreview(url);
      return () => URL.revokeObjectURL(url);
    } else setModelPreview(null);
  }, [modelFile]);

  const handleTryOn = async () => {
    setError(null);
    setMessage(null);
    setResultUrl(null);

    if (!dressFile || !modelFile) {
      setError("Selecione a imagem da roupa e da modelo antes de continuar.");
      return;
    }

    setLoading(true);
    try {
      const data = await processTryOn(dressFile, modelFile);
      setMessage(data.message ?? null);
      setResultUrl(data.url ?? null);
      
      // 🎯 DISPARA O EVENTO PARA ATUALIZAR OS CRÉDITOS
      creditEvents.emit();
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao processar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-gray-900">Provador Mágico ✨</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ------- COLUNA ESQUERDA ------- */}
        <div className="space-y-6">
          <UploadBox
            label="Imagem da roupa"
            preview={dressPreview}
            onChange={setDressFile}
          />

          <UploadBox
            label="Imagem da modelo"
            preview={modelPreview}
            onChange={setModelFile}
          />

          <button
            onClick={handleTryOn}
            disabled={loading || !dressFile || !modelFile}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold transition disabled:opacity-40"
          >
            {loading ? "Processando..." : "✨ Aplicar Roupa no Modelo(a)."}
          </button>

          {error && <p className="text-red-600 font-medium">{error}</p>}
          {message && <p className="text-green-700 font-medium">{message}</p>}
        </div>

        {/* ------- COLUNA DIREITA (RESULTADO) ------- */}
        <div className="border border-purple-300 rounded-xl bg-white p-2 flex max-h-[510px] justify-center items-center">
          {resultUrl ? (
            <img
              src={resolveImageUrl(resultUrl)}
              alt="Resultado do Try-On"
              className="rounded-xl shadow-xl object-contain max-w-full max-h-[450px] w-auto h-auto"
            />
          ) : (
            <div className="text-gray-500 text-lg text-center py-10 w-full">
              O resultado aparecerá aqui 👗✨
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* COMPONENTE DE UPLOAD BONITO */
function UploadBox({
  label,
  preview,
  onChange,
}: {
  label: string;
  preview: string | null;
  onChange: (file: File | null) => void;
}) {
  return (
    <label className="cursor-pointer border-2 border-purple-300 border-dashed rounded-xl p-6 hover:bg-purple-50 transition flex flex-col items-center justify-center text-center">
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="max-h-48 object-contain rounded-lg shadow"
        />
      ) : (
        <div className="flex flex-col items-center text-gray-500">
          <UploadCloud className="w-10 h-10 mb-2" />
          <span className="font-medium">{label}</span>
          <span className="text-sm mt-1">Clique para enviar</span>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}