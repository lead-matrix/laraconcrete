import React, { useState } from 'react';
import { X, Send, Sparkles, Globe, User, Bot, Minimize2 } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

export const BilingualAIChatbot: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    chatMessages,
    sendChatMessage,
    language,
    setLanguage,
    openEstimateModal,
    companyDetails
  } = useCMS();
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  return (
    <>
      {/*
        Chat toggle button:
        - Mobile (<lg): bottom-[116px] to clear the redesigned 2-row FloatingBar (~108px tall)
        - Desktop (lg+): bottom-6
      */}
      <div className="fixed bottom-16 right-3 lg:bottom-6 lg:right-6 z-40">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`flex items-center gap-2 px-3 py-2.5 lg:px-4 lg:py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-[#F58220]/40 ${
            isChatOpen
              ? 'bg-[#1F2937] text-white ring-2 ring-[#F58220]'
              : 'bg-gradient-to-r from-[#F58220] to-[#E07110] text-white glow-orange'
          }`}
          aria-label={isChatOpen ? 'Minimize live chat' : 'Open live chat support'}
          aria-expanded={isChatOpen}
        >
          <div className="relative flex items-center justify-center">
            {isChatOpen ? (
              <Minimize2 className="w-5 h-5 text-[#F58220]" aria-hidden="true" />
            ) : (
              <Bot className="w-5 h-5 text-white animate-bounce" aria-hidden="true" />
            )}
            <span
              className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#1A1A1A] animate-ping"
              aria-hidden="true"
            />
          </div>
          {/* Label: visible on desktop, hidden on small mobile to keep button compact */}
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-black tracking-wide leading-none">
              {isChatOpen
                ? language === 'ES'
                  ? 'Cerrar Chat'
                  : 'Minimize Chat'
                : language === 'ES'
                  ? 'Asistente 24/7'
                  : 'Support Chat'}
            </span>
            {!isChatOpen && (
              <span className="text-[9px] font-bold opacity-90 uppercase tracking-widest leading-tight mt-0.5">
                {language === 'ES' ? 'En línea ahora' : 'Online Now'}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Chat Modal Panel */}
      {isChatOpen && (
        <div
          className={[
            // Position: above toggle button + FloatingBar on mobile, bottom-right on desktop
            'fixed right-3 z-50',
            'bottom-24 lg:bottom-24 lg:right-6',
            // Sizing
            'w-[calc(100vw-1.5rem)] max-w-sm sm:max-w-md',
            // Max-height: never exceed viewport minus safe zones
            'max-h-[calc(100vh-120px)] lg:max-h-[500px]',
            // Appearance
            'bg-[#1A1A1A] text-white rounded-2xl border border-white/20 shadow-2xl',
            'overflow-hidden flex flex-col',
            'animate-fadeIn'
          ].join(' ')}
          role="dialog"
          aria-modal="true"
          aria-label="Live chat support window"
        >
          {/* Header */}
          <div className="bg-[#2D2D2D] p-3.5 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F58220] text-white flex items-center justify-center font-bold text-sm shadow">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-xs sm:text-sm text-white">Support Chat</h4>
                  <span className="text-[8px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30 uppercase">
                    ONLINE 24/7
                  </span>
                </div>
                <p className="text-[9px] text-gray-400">Bilingual Advisor &amp; Estimator</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage(language === 'EN' ? 'ES' : 'EN')}
                className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-gray-200 font-bold flex items-center gap-1"
                aria-label={`Switch to ${language === 'EN' ? 'Spanish' : 'English'}`}
              >
                <Globe className="w-3 h-3 text-[#F58220]" aria-hidden="true" />
                <span>{language === 'EN' ? 'ES' : 'EN'}</span>
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Quick Action Chips */}
          <div
            className="bg-[#222222] px-3 py-2 border-b border-white/10 flex gap-2 overflow-x-auto no-scrollbar text-[10px] shrink-0"
            role="group"
            aria-label="Quick question shortcuts"
          >
            <button
              onClick={() => sendChatMessage('How much does a driveway cost?')}
              className="bg-[#2D2D2D] hover:bg-[#F58220]/20 text-gray-200 px-2.5 py-1 rounded-full border border-white/10 whitespace-nowrap"
            >
              💰 Driveway Pricing
            </button>
            <button
              onClick={() => sendChatMessage('What thickness do I need for my patio?')}
              className="bg-[#2D2D2D] hover:bg-[#F58220]/20 text-gray-200 px-2.5 py-1 rounded-full border border-white/10 whitespace-nowrap"
            >
              📏 Slab Thickness
            </button>
            <button
              onClick={() => sendChatMessage('What is your warranty?')}
              className="bg-[#2D2D2D] hover:bg-[#F58220]/20 text-gray-200 px-2.5 py-1 rounded-full border border-white/10 whitespace-nowrap"
            >
              🛡️ 10-Yr Warranty
            </button>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#121212] text-xs overscroll-contain"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div
                    className="w-6 h-6 rounded-lg bg-[#F58220] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]"
                    aria-hidden="true"
                  >
                    AI
                  </div>
                )}
                <div
                  className={`p-2.5 rounded-xl max-w-[82%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#F58220] text-white font-medium'
                      : 'bg-[#2D2D2D] text-gray-200 border border-white/10'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[9px] opacity-70 block text-right mt-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
                {msg.sender === 'user' && (
                  <div
                    className="w-6 h-6 rounded-lg bg-[#2D2D2D] text-gray-300 flex items-center justify-center shrink-0 mt-0.5 border border-white/10"
                    aria-hidden="true"
                  >
                    <User className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Quote CTA Banner */}
          <div className="p-2 bg-[#2D2D2D] border-t border-white/10 flex justify-between items-center text-xs px-3 shrink-0">
            <span className="text-[10px] text-gray-300 font-medium truncate pr-1">
              Direct Line: {companyDetails.phone1}
            </span>
            <button
              onClick={() => {
                setIsChatOpen(false);
                openEstimateModal();
              }}
              className="bg-[#F58220] hover:bg-[#FF8E2B] text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-lg shrink-0"
            >
              Book Estimate
            </button>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-2.5 bg-[#1A1A1A] border-t border-white/10 flex gap-2 shrink-0"
          >
            <label htmlFor="chat-input" className="sr-only">
              Type your message
            </label>
            <input
              id="chat-input"
              type="text"
              placeholder={
                language === 'ES' ? 'Escriba su pregunta...' : 'Type concrete question...'
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#2D2D2D] border border-white/10 text-white rounded-xl px-3 py-2 text-xs focus:border-[#F58220] focus:outline-none"
              style={{ fontSize: '16px' }}
              autoComplete="off"
            />
            <button
              type="submit"
              className="bg-[#F58220] hover:bg-[#FF8E2B] text-white p-2 rounded-xl flex items-center justify-center shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
