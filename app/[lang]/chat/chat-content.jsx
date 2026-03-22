'use client';

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Bot, Check, Copy, RotateCcw, Send, Sparkles } from 'lucide-react'
import { sendChatMessage } from '../../../src/lib/chat-api'
import { useLanguage } from '../../../src/hooks/useLanguage'
import { usePortfolioContent } from '../../../src/hooks/usePortfolioContent'

// ── Inline markdown renderer ────────────────────────────────────────────────

function renderInline(text, keyPrefix) {
  const result = []
  const pattern = /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g
  let lastIndex = 0
  let idx = 0
  let match

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) result.push(text.slice(lastIndex, match.index))
    const t = match[0]
    const k = `${keyPrefix}-i${idx++}`
    if (t.startsWith('**')) {
      result.push(<strong key={k} className="font-semibold">{t.slice(2, -2)}</strong>)
    } else if (t.startsWith('*')) {
      result.push(<em key={k}>{t.slice(1, -1)}</em>)
    } else {
      result.push(
        <code key={k} className="rounded bg-[var(--accent-soft)] px-[5px] py-[2px] font-mono text-[0.82em] text-[var(--accent-strong)]">
          {t.slice(1, -1)}
        </code>
      )
    }
    lastIndex = match.index + t.length
  }

  if (lastIndex < text.length) result.push(text.slice(lastIndex))
  return result
}

function renderContent(text) {
  const blocks = text.split(/\n{2,}/).filter(b => b.trim())
  return blocks.map((block, bi) => {
    const lines = block.split('\n').filter(l => l.trim())
    if (!lines.length) return null

    const isOrdered = lines.every(l => /^\d+[.)]\s/.test(l.trim()))
    const isBullet = lines.every(l => /^[-•*]\s/.test(l.trim()))

    if (isOrdered) return (
      <ol key={bi} className={`list-decimal space-y-1 pl-5 marker:text-[var(--muted)] ${bi > 0 ? 'mt-3' : ''}`}>
        {lines.map((line, i) => (
          <li key={i}>{renderInline(line.replace(/^\d+[.)]\s/, ''), `${bi}-${i}`)}</li>
        ))}
      </ol>
    )

    if (isBullet) return (
      <ul key={bi} className={`list-disc space-y-1 pl-5 marker:text-[var(--muted)] ${bi > 0 ? 'mt-3' : ''}`}>
        {lines.map((line, i) => (
          <li key={i}>{renderInline(line.replace(/^[-•*]\s/, ''), `${bi}-${i}`)}</li>
        ))}
      </ul>
    )

    return (
      <p key={bi} className={bi > 0 ? 'mt-3' : ''}>
        {lines.map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {renderInline(line, `${bi}-${i}`)}
          </span>
        ))}
      </p>
    )
  }).filter(Boolean)
}

// ── Typing indicator ─────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-[5px] py-0.5">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="typing-dot h-2 w-2 rounded-full bg-[#94a3b8]"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Chat() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatLog, setChatLog] = useState([])
  const [copiedId, setCopiedId] = useState(null)

  const chatEndRef = useRef(null)
  const textareaRef = useRef(null)
  const activeRequestRef = useRef(null)
  const requestIdRef = useRef(0)
  const messageIdRef = useRef(0)

  const content = usePortfolioContent()
  const { localizePath } = useLanguage()
  const chatContent = content.chat
  const suggestedQuestions = chatContent.suggestedQuestions || []

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatLog, loading])

  // Restore focus after response
  useEffect(() => {
    if (!loading) textareaRef.current?.focus()
  }, [loading])

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = '0px'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [input])

  // Abort on unmount
  useEffect(() => () => { activeRequestRef.current?.abort() }, [])

  async function handleSendMessage(messageOverride) {
    const text = typeof messageOverride === 'string' ? messageOverride.trim() : input.trim()
    if (!text || loading) return

    const history = chatLog
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role, content: m.content }))

    const controller = new AbortController()
    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId
    activeRequestRef.current = controller

    setLoading(true)
    setChatLog(prev => [...prev, { id: `u${++messageIdRef.current}`, role: 'user', content: text }])
    setInput('')

    try {
      const result = await sendChatMessage(text, history, { signal: controller.signal })
      if (requestId !== requestIdRef.current) return
      setChatLog(prev => [...prev, { id: `a${++messageIdRef.current}`, role: 'assistant', content: result.reply }])
    } catch (error) {
      if (error?.name === 'AbortError' || requestId !== requestIdRef.current) return
      setChatLog(prev => [...prev, {
        id: `e${++messageIdRef.current}`,
        role: 'system',
        content: error?.message || chatContent.unavailable,
      }])
    } finally {
      if (requestId === requestIdRef.current) {
        activeRequestRef.current = null
        setLoading(false)
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  function handleClearChat() {
    requestIdRef.current += 1
    activeRequestRef.current?.abort()
    activeRequestRef.current = null
    setLoading(false)
    setChatLog([])
    setInput('')
    textareaRef.current?.focus()
  }

  async function handleCopy(message) {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopiedId(message.id)
      setTimeout(() => setCopiedId(prev => prev === message.id ? null : prev), 2000)
    } catch {
      // clipboard access denied — fail silently
    }
  }

  return (
    <main className="page-shell pb-16 pt-16">
      <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">

        {/* ── Chat window ── */}
        <section className="surface-card-strong order-1 flex h-[72svh] min-h-[34rem] flex-col overflow-hidden xl:h-[calc(100svh-8rem)]">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)]">
                <Bot className="h-4 w-4 text-[var(--accent-strong)]" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight text-[var(--text)]">{chatContent.liveTitle}</p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <p className="text-[11px] text-[var(--muted)]">{chatContent.liveEyebrow}</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClearChat}
              disabled={chatLog.length === 0 && !loading}
              title={chatContent.clearChatLabel}
              aria-label={chatContent.clearChatLabel}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-transparent text-[var(--muted)] transition-all hover:border-[rgba(15,23,42,0.2)] hover:bg-white hover:text-[var(--text)] disabled:pointer-events-none disabled:opacity-25"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Message list */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 scrollbar-hide">
            {chatLog.length === 0 && !loading ? (

              /* Empty state */
              <div className="flex h-full min-h-[26rem] flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)]">
                  <Sparkles className="h-6 w-6 text-[var(--accent-strong)]" />
                </div>
                <h2 className="text-xl font-semibold">{chatContent.emptyTitle}</h2>
                <p className="mt-2 max-w-[22rem] text-sm leading-7 text-[var(--muted)]">
                  {chatContent.emptyDescription}
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-2 px-2">
                  {suggestedQuestions.slice(0, 3).map(q => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleSendMessage(q)}
                      className="rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-xs font-medium text-[var(--text)] shadow-sm transition-all hover:border-[rgba(15,118,110,0.3)] hover:bg-white hover:shadow-md"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

            ) : (
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {chatLog.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'system' ? (
                        <div className="max-w-[90%] rounded-2xl border border-[#fed7aa] bg-[#fff7ed] px-4 py-3 text-sm leading-7 text-[#9a3412]">
                          {message.content}
                        </div>
                      ) : message.role === 'user' ? (
                        <div className="max-w-[80%] rounded-[1.4rem] rounded-br-sm bg-[#101828] px-4 py-3 text-sm leading-7 text-white">
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      ) : (
                        /* Assistant bubble with hover copy */
                        <div className="group relative max-w-[85%]">
                          <div className="rounded-[1.4rem] rounded-bl-sm border border-[var(--line)] bg-white px-4 py-3 text-sm leading-7 text-[var(--text)] shadow-sm">
                            {renderContent(message.content)}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(message)}
                            aria-label="Copy message"
                            className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--muted)] shadow-sm transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:text-[var(--text)]"
                          >
                            {copiedId === message.id
                              ? <Check className="h-3 w-3 text-emerald-500" />
                              : <Copy className="h-3 w-3" />
                            }
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {loading && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="flex justify-start"
                    >
                      <div className="rounded-[1.4rem] rounded-bl-sm border border-[var(--line)] bg-white px-4 py-3 shadow-sm">
                        <TypingDots />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="border-t border-[var(--line)] bg-white/50 px-5 py-4">
            <div className="flex items-end gap-2.5">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={loading}
                placeholder={chatContent.placeholder}
                className="field-surface min-h-[48px] max-h-40 flex-1 resize-none px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[rgba(15,118,110,0.4)] disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={loading || !input.trim()}
                aria-label={chatContent.sendLabel}
                className="button-primary h-12 w-12 flex-shrink-0 rounded-[1.1rem] p-0 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-[var(--muted)]">{chatContent.footerHintPrimary}</p>
          </div>
        </section>

        {/* ── Sidebar ── */}
        <aside className="order-2 space-y-5">

          {/* About this chat */}
          <section className="surface-card p-6">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              {chatContent.eyebrow}
            </span>
            <h2 className="mt-4 text-2xl font-semibold">{chatContent.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{chatContent.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="tag-pill">{chatContent.chipFirstPerson}</span>
              <span className="tag-pill">{chatContent.chipGrounded}</span>
            </div>
          </section>

          {/* Suggested questions */}
          <section className="surface-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow">{chatContent.startersLabel}</span>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{chatContent.startersDescription}</p>
              </div>
              <Link href={localizePath('/')} className="button-secondary flex-shrink-0 py-2 text-xs">
                <ArrowLeft className="h-3.5 w-3.5" />
                {chatContent.backLabel}
              </Link>
            </div>
            <div className="mt-5 space-y-2">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="surface-subtle block w-full px-4 py-3.5 text-left transition-all hover:border-[rgba(15,118,110,0.24)] hover:bg-white/90"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                    {chatContent.starterPrefix} {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--text)]">{q}</p>
                </button>
              ))}
            </div>
          </section>

        </aside>
      </div>
    </main>
  )
}
