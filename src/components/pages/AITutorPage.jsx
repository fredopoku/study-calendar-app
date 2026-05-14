import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SUGGESTED_PROMPTS, GREETING_MESSAGES } from '../../data/mockAI';
import { IconBrain, IconSend } from '../ui/Icons';

function AIAvatar() {
  return (
    <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-violet-500 to-brand-600">
      <IconBrain className="w-4 h-4 text-white" />
    </div>
  );
}

function UserAvatar({ name }) {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';
  return (
    <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center bg-brand-600 text-white text-xs font-bold">
      {initials}
    </div>
  );
}

function MessageBubble({ msg, userName }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {isUser ? <UserAvatar name={userName} /> : <AIAvatar />}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-brand-600 text-white rounded-tr-sm'
            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700 rounded-tl-sm shadow-sm'
        }`}>
          {msg.content}
        </div>
        <span className="text-[10px] text-slate-400 px-1">
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <AIAvatar />
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
        <div className="flex gap-1 items-center h-4">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

export default function AITutorPage() {
  const { aiChats, sendAIMessage, clearAIChats, aiMessagesLeft, isPro, setActiveTab, currentTrack, userProfile } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [greeting] = useState(() => GREETING_MESSAGES[Math.floor(Date.now() / 10000) % GREETING_MESSAGES.length]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiChats, isTyping]);

  const handleSend = async () => {
    const msg = input.trim();
    if (!msg) return;
    if (aiMessagesLeft === 0) return;

    setInput('');
    setIsTyping(true);

    const success = sendAIMessage(msg);
    if (!success) {
      setIsTyping(false);
      return;
    }

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    setIsTyping(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const name = userProfile?.name || 'there';

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-4rem)] -m-4 lg:-m-6">
      {/* Header */}
      <div className="flex-shrink-0 bg-gradient-to-r from-brand-600 to-violet-600 text-white px-4 lg:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <IconBrain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-none">AI Learning Tutor</h2>
              <p className="text-brand-200 text-xs mt-0.5">
                Powered by LearnForge AI • Focused on {currentTrack?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isPro && (
              <div className="text-center">
                <div className={`text-lg font-bold leading-none ${aiMessagesLeft === 0 ? 'text-red-300' : 'text-white'}`}>
                  {aiMessagesLeft}/3
                </div>
                <div className="text-[10px] text-brand-200">daily msgs</div>
              </div>
            )}
            {isPro && (
              <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full">
                PRO ∞
              </span>
            )}
            {aiChats.length > 0 && (
              <button
                onClick={clearAIChats}
                className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-colors"
              >
                Clear chat
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 px-4 lg:px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Greeting */}
          <div className="flex gap-3">
            <AIAvatar />
            <div className="max-w-[80%]">
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
                {greeting.replace('Hey there', `Hey ${name}`).replace('Hi!', `Hi ${name}!`)}
              </div>
            </div>
          </div>

          {/* Chat history */}
          {aiChats.map(msg => (
            <MessageBubble key={msg.id} msg={msg} userName={userProfile?.name} />
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested prompts */}
      {aiChats.length === 0 && !isTyping && (
        <div className="flex-shrink-0 bg-slate-50 dark:bg-slate-950 px-4 lg:px-6 pb-3">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-medium text-slate-400 mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.slice(0, 4).map(p => (
                <button
                  key={p}
                  onClick={() => handleSuggestion(p)}
                  className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="flex-shrink-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 lg:px-6 py-4">
        <div className="max-w-4xl mx-auto">
          {aiMessagesLeft === 0 && !isPro ? (
            <div className="text-center py-3">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                Daily free limit reached. Upgrade to Pro for unlimited AI conversations.
              </p>
              <button
                onClick={() => setActiveTab('pricing')}
                className="btn bg-gradient-to-r from-brand-600 to-violet-600 text-white px-6 py-2.5 text-sm"
              >
                Upgrade to Pro — $9.99/mo →
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your studies... (Enter to send)"
                className="input flex-1 resize-none min-h-[44px] max-h-32 py-2.5"
                rows={1}
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="btn bg-brand-600 hover:bg-brand-700 text-white w-11 h-11 p-0 flex-shrink-0 disabled:opacity-40 flex items-center justify-center"
              >
                <IconSend className="w-5 h-5" />
              </button>
            </div>
          )}
          {!isPro && aiMessagesLeft > 0 && (
            <div className="flex items-center justify-between mt-2">
              <p className="text-[10px] text-slate-400">
                {aiMessagesLeft} free message{aiMessagesLeft !== 1 ? 's' : ''} remaining today
              </p>
              <button onClick={() => setActiveTab('pricing')} className="text-[10px] text-brand-500 hover:underline">
                Upgrade for unlimited →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
