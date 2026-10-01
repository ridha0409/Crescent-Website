import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import crescentMark from '../assets/logos/crescent-mark.png'

// ---- 1. Knowledge base -----------------------------------------------
// Edit these to match your real programmes / fees / contact details.
const KNOWLEDGE_BASE = [
  {
    keywords: ['mba', 'business administration'],
    reply:
      'The MBA is a 2-year AICTE/UGC approved programme, ₹75,000/year. Want me to point you to the application page?',
  },
  {
    keywords: ['mca', 'computer application'],
    reply:
      'The MCA is a 2-year AICTE/UGC approved programme, ₹75,000/year. Want me to point you to the application page?',
  },
  {
    keywords: ['islamic', 'ba islamic', 'islamic studies'],
    reply:
      'BA Islamic Studies is a 3-year UGC entitled programme, ₹30,000/year.',
  },
  {
    keywords: ['fee', 'fees', 'cost', 'price'],
    reply:
      'Fees are ₹75,000/year for MBA & MCA, and ₹30,000/year for BA Islamic Studies.',
  },
  {
    keywords: ['duration', 'how long', 'years'],
    reply: 'MBA and MCA run for 2 years. BA Islamic Studies runs for 3 years.',
  },
  {
    keywords: ['placement', 'job', 'career'],
    reply:
      'Yes — dedicated placement support is provided to all enrolled students across every programme.',
  },
  {
    keywords: ['admission', 'apply', 'enroll', 'enrol', 'join'],
    reply:
      'You can apply online any time using any "Apply Now" button — it opens the Institute admission portal, where you register, fill the form and pay the ₹1,000 application fee. Prefer to talk? Call MBA +91 97909 53750, MCA +91 94444 37309 or BA Islamic Studies +91 86675 30226.',
  },
  {
    keywords: ['contact', 'phone', 'email', 'call', 'reach'],
    reply:
      'You can reach admissions at MBA +91 97909 53750, MCA +91 94444 37309, BA Islamic Studies +91 86675 30226, or email cdoesupport@crescent.education.',
  },
  {
    keywords: ['facility', 'facilities', 'lms', 'studio', 'datacenter'],
    reply:
      'We have a dedicated content studio, an advanced LMS accessible 24/7, and a secure datacenter powering all online learning.',
  },
  {
    keywords: ['ugc', 'approved', 'recognized', 'recognised', 'aicte'],
    reply:
      'All our online programmes are UGC entitled, and the MBA/MCA are additionally AICTE approved.',
  },
  {
    keywords: ['hi', 'hello', 'hey'],
    reply: "Hi there! 👋 Ask me about our programmes, fees, admissions, or placements.",
  },
]

const FALLBACK_REPLY =
  "I don't have an answer for that yet — for anything specific, please call +91 97909 53750 or email cdoesupport@crescent.education."

function getBotReply(userText) {
  const text = userText.toLowerCase()
  const match = KNOWLEDGE_BASE.find((entry) =>
    entry.keywords.some((k) => text.includes(k))
  )
  return match ? match.reply : FALLBACK_REPLY
}

const QUICK_REPLIES = ['Programme fees', 'Admissions process', 'Placement support']

// ---- 2. Widget ---------------------------------------------------------
export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Hi! I'm the Crescent Assistant. Ask me about programmes, fees, admissions, or placements.",
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return

    setMessages((prev) => [...prev, { from: 'user', text: trimmed }])
    setInput('')
    setTyping(true)

    // Simulated "thinking" delay — swap this block for a real API call (see notes below)
    setTimeout(() => {
      const reply = getBotReply(trimmed)
      setMessages((prev) => [...prev, { from: 'bot', text: reply }])
      setTyping(false)
    }, 600)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="floating-rail fixed safe-bottom right-4 sm:right-5 z-[60] flex flex-col items-end gap-3">
      {/* Chat panel — never taller than the viewport (landscape phones) and
          never wider than it (320px phones), so it always fits on screen. */}
      {open && (
        <div className="w-[min(22rem,calc(100vw-2rem))] sm:w-96 h-[min(28rem,calc(100dvh-7.5rem))] bg-white rounded-2xl shadow-2xl border border-navy-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-navy-900 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              {/* The Institute's own crescent mark, on white so the navy
                  emblem stays readable against the navy header. */}
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={crescentMark}
                  alt="Crescent"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">Crescent Assistant</p>
                <p className="text-[11px] text-white/60 mt-0.5">Usually replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/70 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.from === 'user'
                      ? 'bg-navy-900 text-white rounded-br-sm'
                      : 'bg-navy-50 text-navy-900 border border-navy-100 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-navy-50 border border-navy-100 rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-navy-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-navy-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-navy-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}

            {/* Quick replies — shown once, after the greeting */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs font-medium text-navy-800 bg-white border border-navy-200 rounded-full px-3 py-1.5 hover:bg-navy-50 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-navy-100 p-2.5 flex items-center gap-2 shrink-0 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 text-sm px-3 py-2 rounded-full bg-navy-50 text-navy-900 placeholder:text-navy-400 outline-none focus:ring-2 focus:ring-navy-800/20"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="w-9 h-9 rounded-full bg-navy-900 text-white flex items-center justify-center shrink-0 hover:bg-navy-800 transition-colors disabled:opacity-40"
              disabled={!input.trim()}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Launcher button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="w-14 h-14 rounded-full bg-navy-900 text-white shadow-xl border-2 border-white flex items-center justify-center hover:bg-navy-800 hover:scale-105 transition-all"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  )
}