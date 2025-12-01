/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from 'react';
import { Sparkles, Upload, Zap, Check, ChevronDown, Star, Users, Clock, Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from "next/link";


export default function ProvadorMagico() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [currentExample, setCurrentExample] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const examples = [
    { model: '/model.png', clothes: '/clothes.png', result: '/result.png'},
    { model: '/model2.png', clothes: '/clothes2.png', result: '/result2.png'},
    { model: '/model3.png', clothes: '/clothes3.png', result: '/result3.png'},
    { model: '/model4.png', clothes: '/clothes4.png', result: '/result4.png'},
    { model: '/model5.png', clothes: '/clothes5.png', result: '/result5.png'}
  ];

  // Auto-play do carrossel
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, examples.length]);

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % examples.length);
    setAutoPlay(false);
  };

  const prevExample = () => {
    setCurrentExample((prev) => (prev - 1 + examples.length) % examples.length);
    setAutoPlay(false);
  };

  const handleExampleClick = () => {
    setAutoPlay(false);
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-orange-500/20 animate-pulse"></div>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50">
  <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <Sparkles className="w-8 h-8 text-purple-500" />
      <span className="text-2xl font-bold">Provador Mágico</span>
    </div>
    <div className="hidden md:flex items-center gap-8">
      <a href="#como-funciona" className="text-gray-300 hover:text-white transition-colors">Como Funciona</a>
      <a href="#beneficios" className="text-gray-300 hover:text-white transition-colors">Benefícios</a>
      <a href="#depoimentos" className="text-gray-300 hover:text-white transition-colors">Depoimentos</a>
      <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
      <a href="#precos" className="text-gray-300 hover:text-white transition-colors">Preços</a>
    </div>
    <div className="flex items-center gap-4">
      <Link href="/login" className="text-gray-300 hover:text-white transition-colors font-semibold">
  Login
</Link>
      <Link href="/register" className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105">
        Começar Grátis
      </Link>
    </div>
  </div>
</nav>

        <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Experimente roupas{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-400">
                  virtualmente
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                Resultado realista, rápido e sem complicações. Veja como qualquer peça fica no corpo antes de comprar ou apresentar ao cliente.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/50">
                  Testar Agora
                </button>
                <button className="border-2 border-white/20 hover:border-white/40 px-8 py-4 rounded-full font-semibold transition-all duration-300">
                  Ver Demonstração
                </button>
              </div>
              <div className="flex gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Sem instalação</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Resultados em segundos</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-orange-500 blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl border border-purple-500/20">
                <div className="grid grid-cols-2 gap-24 mb-6">
                  {/* ANTES */}
                  <div className="flex items-center justify-center">
                    <span className="inline-block bg-gradient-to-r from-purple-600 to-orange-500 text-white px-6 py-2 rounded-full font-semibold text-lg shadow-lg">  
                      Antes
                    </span>
                  </div>

                  {/* DEPOIS */}
                  <div className="flex items-center justify-center">
                    <span className="inline-block bg-gradient-to-r from-purple-600 to-orange-500 text-white px-6 py-2 rounded-full font-semibold text-lg shadow-lg">
                      Depois
                    </span>
                  </div>
                </div>

                {/* Container limpo APENAS para as imagens + símbolos */}
                <div className="relative" onClick={handleExampleClick}>
                  <div className="grid grid-cols-2 gap-24">
                    {/* Foto ANTES */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center border-2 border-gray-600 overflow-hidden">
                      <img 
                        src={examples[currentExample].model} 
                        alt="Modelo" 
                        className="w-full h-full object-cover transition-opacity duration-500"
                      />
                    </div>

                    {/* Foto DEPOIS */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-purple-600/40 to-orange-500/40 rounded-xl overflow-hidden border-2 border-orange-400/50">
                      <img 
                        src={examples[currentExample].result} 
                        alt="Resultado" 
                        className="w-full h-full object-cover transition-opacity duration-500"
                      />
                    </div>
                  </div>

                  {/* Símbolo + Roupa = (CENTRALIZADO NO CONTAINER DAS IMAGENS) */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
                    {/* Símbolo + */}
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-orange-500/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border/10 leading-none font-mono">
                      <span className="text-black text-2xl font-bold">+</span>
                    </div>
                    
                    {/* Foto da Roupa */}
                    <div className="w-32 h-40 rounded-xl shadow-2xl border-2 border-white/30 overflow-hidden bg-white/10 backdrop-blur-sm">
                      <img 
                        src={examples[currentExample].clothes} 
                        alt="Roupa" 
                        className="w-full h-full object-contain transition-opacity duration-500"
                      />
                    </div>

                    {/* Símbolo = */}
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-orange-500/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border/10 leading-none font-mono">
                      <span className="text-black text-2xl font-bold">=</span>
                    </div>
                  </div>
                </div>

                {/* Controles do Carrossel */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={prevExample}
                    className="bg-gray-700/50 hover:bg-gray-600/50 p-2 rounded-full transition-colors"
                    aria-label="Exemplo anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Indicadores */}
                  <div className="flex gap-2">
                    {examples.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentExample(idx);
                          setAutoPlay(false);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === currentExample 
                            ? 'bg-purple-500 w-8' 
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                        aria-label={`Ir para exemplo ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextExample}
                    className="bg-gray-700/50 hover:bg-gray-600/50 p-2 rounded-full transition-colors"
                    aria-label="Próximo exemplo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Como <span className="text-purple-500">Funciona</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Upload, title: '1. Envie as Fotos', desc: 'Faça upload da foto da pessoa e da peça de roupa que deseja testar' },
              { icon: Zap, title: '2. Processamento Inteligente', desc: 'Nossa IA ajusta automaticamente modelagem, cores e caimento' },
              { icon: Sparkles, title: '3. Visualize o Resultado', desc: 'Veja como a roupa fica no corpo em segundos, de forma realista' }
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                  <step.icon className="w-12 h-12 text-purple-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Antes e Depois */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-12 border border-purple-500/20">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Resultados <span className="text-orange-400">Impressionantes</span>
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg">Veja a mágica acontecer em tempo real</p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
              {/* ANTES */}
              <div className="flex flex-col items-center space-y-6">
                <div className="text-center">
                  <span className="inline-block bg-gray-700 text-white px-6 py-2 rounded-full font-semibold text-lg">
                    Antes
                  </span>
                </div>
                
                <div className="w-full max-w-sm aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center border-2 border-gray-600 overflow-hidden">
                  <img src="/model.png" alt="Pessoa" className="w-full h-full object-cover" />
                </div>

                <div className="w-full max-w-sm bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <p className="text-sm text-gray-400 text-center">
                    <strong className="text-white">Passo 1:</strong> Envie a foto da pessoa
                  </p>
                </div>
              </div>

              {/* FOTO DA ROUPA (MEIO) */}
              <div className="flex items-center justify-center gap-8">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold shadow-lg border border-white/20 leading-none font-mono">
                  +
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-32 h-40 md:w-40 md:h-52 rounded-xl shadow-2xl border-2 border-white/30 overflow-hidden bg-white/10 backdrop-blur-sm">
                    <img src="/clothes.png" alt="Roupa" className="w-full h-full object-cover" />
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700">
                    <p className="text-sm text-gray-400 text-center">
                      <strong className="text-white">+</strong> foto da roupa
                    </p>
                  </div>
                </div>

                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold shadow-lg border border-white/20 leading-none font-mono">
                  =
                </div>
              </div>

              {/* DEPOIS */}
              <div className="flex flex-col items-center space-y-6">
                <div className="text-center">
                  <span className="inline-block bg-gray-700 text-white px-6 py-2 rounded-full font-semibold text-lg">
                    Depois
                  </span>
                </div>

                <div className="w-full max-w-sm aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center border-2 border-gray-600 overflow-hidden">
                  <img src="/result.png" alt="Resultado Final" className="w-full h-full object-cover" />
                </div>

                <div className="w-full max-w-sm bg-gradient-to-r from-purple-900/30 to-orange-900/30 rounded-xl p-4 border border-purple-500/50">
                  <p className="text-sm text-gray-300 text-center">
                    <strong className="text-white">Passo 2:</strong> Visualize como a roupa fica no corpo
                  </p>
                </div>
              </div>
            </div>

            {/* Instruções de Upload */}
            <div className="mt-12 text-center">
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/50 inline-flex items-center gap-3">
                <Upload className="w-5 h-5" />
                Experimentar Agora com Suas Fotos
              </button>
              <p className="text-gray-400 text-sm mt-4">Sem cadastro necessário • Resultado em segundos</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefícios */}
      <section id="beneficios" className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Por que escolher o <span className="text-purple-500">Provador Mágico</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: 'Economia de Tempo', desc: 'Teste dezenas de looks em minutos' },
              { icon: Palette, title: 'Teste de Cores', desc: 'Experimente diferentes paletas instantaneamente' },
              { icon: Users, title: 'Para Todo Mundo', desc: 'Lojas, consultores, influencers e compradores' },
              { icon: Zap, title: 'Resultados Rápidos', desc: 'Processamento em segundos' }
            ].map((benefit, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                <benefit.icon className="w-10 h-10 text-orange-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            O que dizem sobre nós
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Marina Silva', role: 'Consultora de Moda', text: 'Revolucionou minha forma de trabalhar. Agora consigo mostrar aos clientes exatamente como as peças ficam antes de comprar.' },
              { name: 'Lucas Tavares', role: 'E-commerce de Moda', text: 'Nossas vendas aumentaram 40% depois que implementamos o provador virtual. Os clientes amam!' },
              { name: 'Ana Costa', role: 'Influenciadora Digital', text: 'Perfeito para criar conteúdo! Consigo testar vários looks rapidamente e mostrar aos seguidores.' }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-purple-500/20">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-black/50">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {[
              { q: 'Como funciona o provador virtual?', a: 'Você envia uma foto da pessoa e da roupa. Nossa IA processa as imagens e gera uma visualização realista de como a peça ficaria no corpo.' },
              { q: 'Quanto tempo leva para ver o resultado?', a: 'O processamento é extremamente rápido, geralmente leva apenas alguns segundos para gerar a visualização completa.' },
              { q: 'Posso testar diferentes cores?', a: 'Sim! Nossa plataforma permite experimentar diferentes paletas de cores na mesma peça instantaneamente.' },
              { q: 'Funciona com qualquer tipo de roupa?', a: 'Sim, suportamos todos os tipos de roupas: camisetas, vestidos, calças, casacos e muito mais.' }
            ].map((faq, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-purple-500/20 overflow-hidden">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-6 flex justify-between items-center text-left hover:bg-purple-500/10 transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <ChevronDown className={`w-6 h-6 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-6 text-gray-400">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-3xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para transformar sua experiência de compra?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Comece a usar o Provador Mágico hoje e veja a diferença
            </p>
            <button className="bg-white text-purple-700 hover:bg-gray-100 px-12 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl">
              Testar Agora Grátis
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-purple-500" />
                <span className="text-xl font-bold">Provador Mágico</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transformando a forma como você experimenta roupas online.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Provador Mágico. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}