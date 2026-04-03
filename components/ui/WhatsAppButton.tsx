'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { sendToN8N } from '@/lib/n8n'

const WHATSAPP_NUMBER = '919217103413'

interface ChatMessage {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, text: "Hey! 👋 I'm Ask Soul. How can I help you today?", sender: 'bot' },
  ])
  const [input, setInput] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<'chat' | 'details'>('chat')
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in Soul Stretch products")}`

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMsg: ChatMessage = { id: Date.now(), text: input.trim(), sender: 'user' }
    setMessages((prev) => [...prev, userMsg])
    const userText = input.trim()
    setInput('')

    if (step === 'chat' && !name) {
      setStep('details')
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: "Thanks! Could you share your name and email so we can assist you better?", sender: 'bot' },
      ])
      return
    }

    setIsSending(true)
    const success = await sendToN8N({
      source: 'chat_message',
      name: name || undefined,
      email: email || undefined,
      message: userText,
      timestamp: new Date().toISOString(),
      page: typeof window !== 'undefined' ? window.location.pathname : '/',
    })

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        text: success
          ? "Got it! We'll get back to you shortly. For a faster response, chat with us on WhatsApp."
          : "Something went wrong. Please try reaching us on WhatsApp instead.",
        sender: 'bot',
      },
    ])
    setIsSending(false)
  }

  const handleDetailsSubmit = async () => {
    if (!name.trim() || !email.trim()) return

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: `${name} - ${email}`, sender: 'user' },
    ])
    setStep('chat')
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, text: `Thanks ${name}! What can I help you with?`, sender: 'bot' },
    ])
  }

  return (
    <>
      {/* Ask Soul Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 sm:bottom-28 right-3 sm:right-6 left-3 sm:left-auto z-[60] sm:w-96 bg-soul-card border border-soul-orange/20 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Ask Soul</p>
                  <p className="text-xs text-white/70">Usually replies within minutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#25D366] text-white rounded-br-sm'
                        : 'bg-soul-black/50 text-soul-white rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="bg-soul-black/50 text-soul-gray rounded-2xl rounded-bl-sm px-4 py-2 text-sm">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-soul-gray rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-soul-gray rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-soul-gray rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/[0.06] p-3">
              {step === 'details' ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3 py-2 bg-soul-black border border-white/10 rounded-lg text-soul-white text-sm placeholder-soul-gray focus:border-[#25D366] focus:outline-none"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full px-3 py-2 bg-soul-black border border-white/10 rounded-lg text-soul-white text-sm placeholder-soul-gray focus:border-[#25D366] focus:outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && handleDetailsSubmit()}
                  />
                  <button
                    onClick={handleDetailsSubmit}
                    disabled={!name.trim() || !email.trim()}
                    className="w-full py-2 bg-[#25D366] text-white font-bold text-sm rounded-lg hover:bg-[#20bd5a] transition-colors disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-soul-black border border-white/10 rounded-lg text-soul-white text-sm placeholder-soul-gray focus:border-[#25D366] focus:outline-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isSending}
                    className="px-3 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20bd5a] transition-colors disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              )}

              {/* WhatsApp Fallback */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 mt-2 text-xs text-[#25D366] hover:text-[#20bd5a] transition-colors"
                onClick={() => {
                  sendToN8N({
                    source: 'whatsapp_click',
                    name: name || undefined,
                    email: email || undefined,
                    timestamp: new Date().toISOString(),
                    page: typeof window !== 'undefined' ? window.location.pathname : '/',
                  })
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                Or chat directly on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        className="fixed bottom-6 sm:bottom-8 right-4 sm:right-6 z-[60]"
      >
        {/* Label tooltip */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-soul-card border border-soul-orange/20 text-soul-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg pointer-events-none"
            >
              Ask Soul
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg hover:shadow-xl transition-all touch-manipulation ${
            isOpen ? 'bg-soul-black/80 border border-soul-orange/30' : 'bg-[#25D366] hover:bg-[#20bd5a]'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <svg className="w-6 h-6 text-soul-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785C6.036 21.785 2 17.748 2 12.785 2 7.267 6.477 2.79 11.995 2.79c2.67 0 5.15 1.04 7.027 2.926A9.862 9.862 0 0122 12.785c0 5.508-4.477 9.985-9.995 9.985z" />
            </svg>
          )}
        </motion.button>
      </motion.div>
    </>
  )
}
