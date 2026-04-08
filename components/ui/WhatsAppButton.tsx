'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { sendToN8N } from '@/lib/n8n'

const WHATSAPP_NUMBER = '919217103413'

interface ChatMessage {
  id: number
  text: string
  sender: 'user' | 'bot'
}

type ActiveTab = 'chat' | 'whatsapp'

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat')
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
        { id: Date.now() + 1, text: "Thanks! Could you share your name and email so I can assist you better?", sender: 'bot' },
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
          ? "Got it! We'll get back to you shortly. You can also switch to WhatsApp for a faster response."
          : "Something went wrong. Please try WhatsApp instead.",
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
      {/* Ask Soul Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 sm:bottom-28 right-3 sm:right-6 left-3 sm:left-auto z-[60] sm:w-96 bg-soul-card border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header with SS Logo */}
            <div className="bg-gradient-to-r from-soul-orange to-amber-500 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-white/50 flex-shrink-0">
                  <Image
                    src="/images/ss-logo.png"
                    alt="Soul Stretch"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain p-0.5"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-soul-black">Ask Soul</p>
                  <p className="text-xs text-soul-black/60">Soul Stretch Support</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-soul-black/50 hover:text-soul-black transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tab Switcher */}
            <div className="flex border-b border-white/[0.06]">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-colors ${
                  activeTab === 'chat'
                    ? 'text-soul-orange border-b-2 border-soul-orange bg-soul-orange/[0.05]'
                    : 'text-soul-gray hover:text-soul-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat
              </button>
              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold transition-colors ${
                  activeTab === 'whatsapp'
                    ? 'text-[#25D366] border-b-2 border-[#25D366] bg-[#25D366]/[0.05]'
                    : 'text-soul-gray hover:text-soul-white'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                WhatsApp
              </button>
            </div>

            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <>
                {/* Messages */}
                <div className="h-64 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-white flex-shrink-0 mb-0.5">
                          <Image
                            src="/images/ss-logo.png"
                            alt="SS"
                            width={24}
                            height={24}
                            className="w-full h-full object-contain p-0.5"
                          />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-soul-orange text-soul-black rounded-br-sm'
                            : 'bg-white/[0.06] text-soul-white rounded-bl-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isSending && (
                    <div className="flex items-end gap-2 justify-start">
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-white flex-shrink-0 mb-0.5">
                        <Image src="/images/ss-logo.png" alt="SS" width={24} height={24} className="w-full h-full object-contain p-0.5" />
                      </div>
                      <div className="bg-white/[0.06] text-soul-gray rounded-2xl rounded-bl-sm px-4 py-3 text-sm">
                        <span className="inline-flex gap-1">
                          <span className="w-1.5 h-1.5 bg-soul-gray/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-soul-gray/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-soul-gray/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
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
                        className="w-full px-3 py-2 bg-soul-black border border-white/10 rounded-lg text-soul-white text-sm placeholder-soul-gray focus:border-soul-orange focus:outline-none"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        className="w-full px-3 py-2 bg-soul-black border border-white/10 rounded-lg text-soul-white text-sm placeholder-soul-gray focus:border-soul-orange focus:outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && handleDetailsSubmit()}
                      />
                      <button
                        onClick={handleDetailsSubmit}
                        disabled={!name.trim() || !email.trim()}
                        className="w-full py-2 bg-soul-orange text-soul-black font-bold text-sm rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
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
                        className="flex-1 px-3 py-2 bg-soul-black border border-white/10 rounded-lg text-soul-white text-sm placeholder-soul-gray focus:border-soul-orange focus:outline-none"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isSending}
                        className="px-3 py-2 bg-soul-orange text-soul-black rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* WhatsApp Tab */}
            {activeTab === 'whatsapp' && (
              <div className="p-5 space-y-4">
                {/* WhatsApp Info */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-soul-white">Chat on WhatsApp</p>
                    <p className="text-xs text-soul-gray mt-1 leading-relaxed">
                      Get instant support from our team. We typically reply within minutes.
                    </p>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06]">
                  <p className="text-xs text-soul-gray mb-1">Phone Number</p>
                  <p className="text-sm text-soul-white font-medium">+91 92171 03413</p>
                </div>

                {/* Quick Message Options */}
                <div className="space-y-2">
                  <p className="text-xs text-soul-gray">Quick Messages</p>
                  {[
                    'I want to know about your products',
                    'I need help with my order',
                    'Bulk order inquiry',
                  ].map((msg) => (
                    <a
                      key={msg}
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-left px-3 py-2 bg-white/[0.04] hover:bg-[#25D366]/10 border border-white/[0.06] hover:border-[#25D366]/30 rounded-lg text-sm text-soul-gray hover:text-[#25D366] transition-all"
                      onClick={() => {
                        sendToN8N({
                          source: 'whatsapp_click',
                          message: msg,
                          name: name || undefined,
                          email: email || undefined,
                          timestamp: new Date().toISOString(),
                          page: typeof window !== 'undefined' ? window.location.pathname : '/',
                        })
                      }}
                    >
                      {msg}
                    </a>
                  ))}
                </div>

                {/* Main CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl transition-colors text-sm touch-manipulation"
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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  Open WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
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
            isOpen ? 'bg-soul-black border border-soul-orange/30' : 'bg-white'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <svg className="w-6 h-6 text-soul-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
              <Image
                src="/images/ss-logo.png"
                alt="Ask Soul"
                width={56}
                height={56}
                className="w-full h-full object-contain p-1"
              />
            </div>
          )}
        </motion.button>
      </motion.div>
    </>
  )
}
