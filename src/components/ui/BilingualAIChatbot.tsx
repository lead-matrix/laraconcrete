import React, { useState } from 'react';
import { X, Send, Sparkles, Globe, User, Bot } from 'lucide-react';
import { useCMS } from '../../cms/useCMS';

export const BilingualAIChatbot: React.FC = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    chatMessages,
    sendChatMessage,
    language,
    setLanguage,
    openEstimateModal
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
      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40 bg-[#F58220] hover:bg-[#FF8E2B] text-white p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center gap-2 group hover:scale-110 transition-all border-2 border-white"
          aria-label="Open Lara Concrete Chat"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-1 -right-1 border border-[#F58220] animate-ping"></span>
          </div>
          <span className="hidden sm:inline font-extrabold text-xs tracking-wider uppercase pr-1">
            {language === 'ES' ? 'Asistente Lara' : 'Lara Concrete Chat'}
          </span>
        </button>
      )}

      {/* Floating Chat Window Drawer */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md bg-[#1A1A1A] text-white rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col h-[480px] sm:h-[520px] animate-fadeIn">
          
          {/* Header */}
          <div className="bg-[#2D2D2D] p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F58220] text-white flex items-center justify-center font-bold text-sm shadow">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm text-white">Lara Concrete Expert</h4>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30 uppercase">
                    ONLINE 24/7
                  </span>
                </div>
                <p className="text-[10px] text-gray-400">Bilingual Concrete Advisor & Estimator</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage(language === 'EN' ? 'ES' : 'EN')}
                className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-gray-200 font-bold flex items-center gap-1"
              >
                <Globe className="w-3 h-3 text-[#F58220]" />
                <span>{language === 'EN' ? 'ES' : 'EN'}</span>
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Action Chips */}
          <div className="bg-[#222222] px-3 py-2 border-b border-white/10 flex gap-2 overflow-x-auto no-scrollbar text-[10px]">
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
              📏 Slab Thickness Advice
            </button>
            <button
              onClick={() => sendChatMessage('What is your warranty?')}
              className="bg-[#2D2D2D] hover:bg-[#F58220]/20 text-gray-200 px-2.5 py-1 rounded-full border border-white/10 whitespace-nowrap"
            >
              🛡️ 10-Yr Warranty
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#121212] text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-[#F58220] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    LC
                  </div>
                )}
                <div
                  className={`p-3 rounded-xl max-w-[80%] leading-relaxed ${
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
                  <div className="w-7 h-7 rounded-lg bg-[#2D2D2D] text-gray-300 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Quote CTA Banner inside Chat */}
          <div className="p-2 bg-[#2D2D2D] border-t border-white/10 flex justify-between items-center text-xs px-4">
            <span className="text-[11px] text-gray-300 font-medium">Ready for an on-site visit?</span>
            <button
              onClick={() => {
                setIsChatOpen(false);
                openEstimateModal();
              }}
              className="bg-[#F58220] hover:bg-[#FF8E2B] text-white font-extrabold text-[10px] uppercase px-3 py-1.5 rounded-lg"
            >
              Book Estimate
            </button>
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-3 bg-[#1A1A1A] border-t border-white/10 flex gap-2">
            <input
              type="text"
              placeholder={language === 'ES' ? 'Escriba su pregunta sobre concreto...' : 'Type concrete question...'}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#2D2D2D] border border-white/10 text-white rounded-xl px-3 py-2 text-xs focus:border-[#F58220] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#F58220] hover:bg-[#FF8E2B] text-white p-2.5 rounded-xl flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
