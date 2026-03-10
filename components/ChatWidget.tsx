"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text || "I'm sorry, I couldn't generate a response.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I couldn't connect to the server right now. Please test your network.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-[380px] h-[600px] max-h-[80vh] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-50 font-sans"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-zinc-900 dark:bg-black text-white flex items-center justify-between shadow-sm relative z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-inner">
                  <Sparkles size={20} className="text-blue-100" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-white mb-0.5">TripNE Concierge</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-zinc-400 font-medium">Powered by Groq</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white group"
                aria-label="Close Chat"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto max-h-[400px] p-6 space-y-6 bg-zinc-50 dark:bg-zinc-950" data-lenis-prevent>
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shadow-inner">
                    <Sparkles size={32} className="text-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Hi, I'm your NE Travel Expert!</p>
                    <p className="text-xs text-zinc-500 max-w-[220px] mx-auto leading-relaxed">Ask me about the best times to visit Meghalaya, hidden gems in Arunachal, or anything else about the Seven Sisters.</p>
                  </div>
                </div>
              ) : (
                messages.map((m: Message) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                      m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-black dark:bg-zinc-800 text-blue-400'
                    }`}>
                      {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed max-w-[80%] ${
                      m.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-sm shadow-md shadow-blue-600/10' 
                        : 'bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-sm shadow-sm whitespace-pre-wrap'
                    }`}>
                      {m.role === 'assistant' ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:pl-5 [&>ul]:mb-2 [&>ul]:list-disc [&>ul>li]:mb-1 [&>ol]:pl-5 [&>ol]:mb-2 [&>ol]:list-decimal [&>ol>li]:mb-1 [&>*:last-child]:mb-0">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        m.content
                      )}
                    </div>
                  </motion.div>
                ))
              )}
              {isLoading && (
                 <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex gap-3"
                 >
                    <div className="w-8 h-8 rounded-full bg-black dark:bg-zinc-800 text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                      <Bot size={16} />
                    </div>
                    <div className="px-5 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                       <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-80" />
                       <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-60" />
                       <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-40" />
                    </div>
                 </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
              <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
                <div className="relative flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all overflow-hidden shadow-inner">
                  <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about Northeast India..."
                    disabled={isLoading}
                    className="w-full bg-transparent px-4 py-3.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 text-white transition-all shadow-md shadow-blue-500/20 active:scale-95 shrink-0"
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={18} className="translate-x-0.5" />}
                </button>
              </form>
              <div className="text-center mt-3">
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">AI can make mistakes. Consider verifying travel info.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-600/30 z-50 group"
        title="Chat with TripNE AI"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare size={24} className="group-hover:animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
