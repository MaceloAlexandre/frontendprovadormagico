"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { registerService } from "@/lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    telefone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError("");
    setLoading(true);

    if (!form.username || !form.email || !form.telefone || !form.password) {
      setError("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      await registerService(form);
      setSuccess(true);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    } catch (err) {
      setError("Erro ao criar conta. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7zm0-4a4 4 0 110-8 4 4 0 010 8z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Criar Conta</h1>
            <p className="text-gray-600 text-sm">Preencha os dados para se cadastrar</p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              Conta criada com sucesso! Redirecionando...
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-2 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5" /> {error}
            </div>
          )}

          {/* Nome */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Nome Completo</label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Telefone */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Telefone</label>
            <input
              name="telefone"
              type="text"
              value={form.telefone}
              onChange={handleChange}
              placeholder="(99) 99999-9999"
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {/* Senha */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700">Senha</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Botão */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Criar Conta"}
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Já tem uma conta?{" "}
            <a href="/login" className="text-purple-600 font-semibold hover:text-purple-700">
              Entrar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
