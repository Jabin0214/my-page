'use client';

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowLeft, Bot, BrainCircuit, Check, Copy, Database, FileText, RotateCcw, RefreshCw, Search, Send, Sparkles, Square } from 'lucide-react'

const MAX_INPUT_LENGTH = 2000
const CHAR_WARN_THRESHOLD = 1700
const SCROLL_STICK_THRESHOLD = 80
import { streamChatMessage } from '../../../src/lib/chat-api'
import { tokenizeChatInlineText } from '../../../src/lib/chat-rendering'
import { useLanguage } from '../../../src/hooks/useLanguage'
import { usePortfolioContent } from '../../../src/hooks/usePortfolioContent'

// ── Inline markdown renderer ────────────────────────────────────────────────

function renderInline(text, keyPrefix) {
  const result = []
  const pattern = /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g
  let lastIndex = 0
  let idx = 0
  let match

  function pushLinkedText(value, key) {
    tokenizeChatInlineText(value).forEach((token, tokenIndex) => {
      if (token.type === 'link') {
        result.push(
          <a
            key={`${key}-l${tokenIndex}`}
            href={token.href}
            target={token.href.startsWith('http') ? '_blank' : undefined}
            rel={token.href.startsWith('http') ? 'noreferrer' : undefined}
            className="minimal-chat-link"
          >
            {token.value}
          </a>
        )
      } else {
        result.push(token.value)
      }
    })
  }

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) pushLinkedText(text.slice(lastIndex, match.index), `${keyPrefix}-t${idx}`)
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

  if (lastIndex < text.length) pushLinkedText(text.slice(lastIndex), `${keyPrefix}-t${idx}`)
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
    <div className="minimal-chat-typing" aria-label="Typing">
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

function ChatMessage({
  message,
  chatContent,
  copiedId,
  loading,
  onCopy,
  onRetry,
  onRegenerate,
  isLastAssistant,
}) {
  if (message.role === 'user') {
    const failed = message.status === 'failed'

    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="minimal-chat-row minimal-chat-row--user"
      >
        <div className="minimal-chat-message-stack minimal-chat-message-stack--user">
          <div className={`minimal-chat-user-message ${failed ? 'minimal-chat-user-message--failed' : ''}`}>
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          {failed && (
            <button
              type="button"
              onClick={() => onRetry(message)}
              disabled={loading}
              className="minimal-chat-retry-button disabled:opacity-40"
            >
              <RefreshCw className="h-3 w-3" />
              {chatContent.retryLabel}
            </button>
          )}
        </div>
      </motion.div>
    )
  }

  const isStreaming = message.status === 'streaming'
  const isError = message.status === 'error'
  const showCopy = message.status === 'done' && message.content

  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="minimal-chat-row minimal-chat-row--assistant"
    >
      <div className="minimal-chat-message-stack minimal-chat-message-stack--assistant group">
        <div className={isError ? 'minimal-chat-system-message' : 'minimal-chat-message'}>
          {message.content
            ? renderContent(message.content)
            : isStreaming ? <TypingDots /> : null}
          {isError && message.errorMessage && (
            <p className={message.content ? 'mt-2 text-xs opacity-80' : ''}>
              {message.errorMessage}
            </p>
          )}
          {isStreaming && message.content && (
            <span className="minimal-chat-stream-caret" />
          )}
        </div>
        {showCopy && (
          <div className="minimal-chat-message-tools">
            <button
              type="button"
              onClick={() => onCopy(message)}
              aria-label={copiedId === message.id ? chatContent.copiedLabel : chatContent.copyLabel}
              title={copiedId === message.id ? chatContent.copiedLabel : chatContent.copyLabel}
              className="minimal-chat-tool-button"
            >
              {copiedId === message.id
                ? <Check className="h-3.5 w-3.5 text-emerald-400" />
                : <Copy className="h-3.5 w-3.5" />
              }
            </button>
            {isLastAssistant && onRegenerate && (
              <button
                type="button"
                onClick={() => onRegenerate(message)}
                disabled={loading}
                aria-label={chatContent.regenerateLabel}
                title={chatContent.regenerateLabel}
                className="minimal-chat-tool-button disabled:opacity-30 disabled:pointer-events-none"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function ChatComposer({
  input,
  loading,
  chatContent,
  textareaRef,
  onInputChange,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
  onSend,
  onStop,
}) {
  const length = input.length
  const remaining = MAX_INPUT_LENGTH - length
  const isOverLimit = remaining < 0
  const showCounter = length >= CHAR_WARN_THRESHOLD
  const canSend = input.trim().length > 0 && !isOverLimit && !loading

  return (
    <div className="minimal-chat-composer">
      <div className={`minimal-chat-composer-shell ${isOverLimit ? 'minimal-chat-composer-shell--over' : ''}`}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          rows={1}
          maxLength={MAX_INPUT_LENGTH + 200}
          placeholder={chatContent.placeholder}
          aria-label={chatContent.placeholder}
          className="minimal-chat-input"
        />
        <div className="minimal-chat-composer-action">
          <AnimatePresence mode="wait" initial={false}>
            {loading ? (
              <motion.button
                key="stop"
                type="button"
                onClick={onStop}
                aria-label={chatContent.stopLabel}
                title={chatContent.stopLabel}
                className="minimal-chat-send minimal-chat-send--stop"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
              >
                <Square className="h-3.5 w-3.5" fill="currentColor" />
              </motion.button>
            ) : (
              <motion.button
                key="send"
                type="button"
                onClick={onSend}
                disabled={!canSend}
                aria-label={chatContent.sendLabel}
                title={chatContent.sendLabel}
                className="minimal-chat-send disabled:cursor-not-allowed"
                data-active={canSend ? 'true' : 'false'}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
              >
                <Send className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="minimal-chat-composer-footer">
        <p className="minimal-chat-composer-hint">{chatContent.footerHintPrimary}</p>
        {showCounter && (
          <p className={`minimal-chat-char-count ${isOverLimit ? 'minimal-chat-char-count--over' : ''}`}>
            {isOverLimit ? `-${-remaining}` : `${remaining}`} {chatContent.charsLeftLabel}
          </p>
        )}
      </div>
    </div>
  )
}

function StarterPrompt({ question, index, chatContent, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(question)}
      className="minimal-chat-question"
    >
      <p className="minimal-chat-question-index">
        {chatContent.starterPrefix} {String(index + 1).padStart(2, '0')}
      </p>
      <p className="minimal-chat-question-text">{question}</p>
    </button>
  )
}

const TECH_STEP_ICONS = [FileText, Database, Search, BrainCircuit]

function TechExplainer({ chatContent }) {
  const steps = chatContent.techExplainerSteps || []

  return (
    <section className="minimal-chat-card minimal-chat-tech-card p-5 md:p-6">
      <span className="minimal-chat-eyebrow">{chatContent.techExplainerLabel}</span>
      <h2 className="mt-4 text-xl font-semibold">{chatContent.techExplainerTitle}</h2>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{chatContent.techExplainerIntro}</p>

      <div className="minimal-chat-tech-flow">
        {steps.map((step, index) => {
          const Icon = TECH_STEP_ICONS[index] || FileText
          return (
            <div className="minimal-chat-tech-step" key={step.title}>
              <div className="minimal-chat-tech-icon" aria-hidden="true">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="minimal-chat-tech-title">{step.title}</p>
                <p className="minimal-chat-tech-text">{step.text}</p>
              </div>
            </div>
          )
        })}
      </div>

      <p className="minimal-chat-tech-summary">{chatContent.techExplainerSummary}</p>
    </section>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Chat() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatLog, setChatLog] = useState([])
  const [copiedId, setCopiedId] = useState(null)

  const [isAtBottom, setIsAtBottom] = useState(true)

  const chatEndRef = useRef(null)
  const chatListRef = useRef(null)
  const textareaRef = useRef(null)
  const activeRequestRef = useRef(null)
  const requestIdRef = useRef(0)
  const messageIdRef = useRef(0)
  const isComposingRef = useRef(false)

  const content = usePortfolioContent()
  const { localizePath } = useLanguage()
  const chatContent = content.chat
  const suggestedQuestions = chatContent.suggestedQuestions || []

  const scrollToBottom = useCallback((behavior = 'smooth') => {
    const el = chatListRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior })
  }, [])

  useEffect(() => {
    const el = chatListRef.current
    if (!el) return
    const handleScroll = () => {
      const gap = el.scrollHeight - el.scrollTop - el.clientHeight
      setIsAtBottom(gap < SCROLL_STICK_THRESHOLD)
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => el.removeEventListener('scroll', handleScroll)
  }, [chatLog.length])

  useEffect(() => {
    if (isAtBottom) scrollToBottom('smooth')
  }, [chatLog, loading, isAtBottom, scrollToBottom])

  useEffect(() => {
    if (!loading) textareaRef.current?.focus()
  }, [loading])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [input])

  useEffect(() => () => { activeRequestRef.current?.abort() }, [])

  const runChat = useCallback(async (text, { historyOverride, retryUserId } = {}) => {
    if (!text || loading) return

    const controller = new AbortController()
    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId
    activeRequestRef.current = controller

    const userMsgId = retryUserId ?? `u${++messageIdRef.current}`
    const assistantMsgId = `a${++messageIdRef.current}`

    setLoading(true)
    setChatLog(prev => {
      const base = retryUserId
        // Drop any failed assistant message tied to the retried user message
        ? prev.filter(m => !(m.role === 'assistant' && m.replyTo === retryUserId && m.status === 'error'))
            .map(m => m.id === retryUserId ? { ...m, status: 'sent' } : m)
        : [...prev, { id: userMsgId, role: 'user', content: text, status: 'sent' }]
      return [...base, { id: assistantMsgId, role: 'assistant', content: '', status: 'streaming', replyTo: userMsgId }]
    })
    if (!retryUserId) setInput('')

    const history = (historyOverride ?? chatLog)
      .filter(m => (m.role === 'user' && m.status !== 'failed') || (m.role === 'assistant' && m.status === 'done'))
      .map(m => ({ role: m.role, content: m.content }))

    try {
      await streamChatMessage(text, history, {
        signal: controller.signal,
        onDelta: (delta) => {
          if (requestId !== requestIdRef.current) return
          setChatLog(prev => prev.map(m =>
            m.id === assistantMsgId ? { ...m, content: m.content + delta } : m
          ))
        },
      })

      if (requestId !== requestIdRef.current) return
      setChatLog(prev => prev.map(m =>
        m.id === assistantMsgId ? { ...m, status: 'done' } : m
      ))
    } catch (error) {
      if (requestId !== requestIdRef.current) return
      const aborted = error?.name === 'AbortError'
      setChatLog(prev => prev.map(m => {
        if (m.id === assistantMsgId) {
          if (aborted && m.content) return { ...m, status: 'done' }
          return {
            ...m,
            status: 'error',
            content: m.content,
            errorMessage: aborted ? null : (error?.message || chatContent.unavailable),
          }
        }
        if (m.id === userMsgId) return { ...m, status: aborted ? 'sent' : 'failed' }
        return m
      }))
      // Remove empty aborted assistant bubble entirely
      if (aborted) {
        setChatLog(prev => prev.filter(m => !(m.id === assistantMsgId && !m.content)))
      }
    } finally {
      if (requestId === requestIdRef.current) {
        activeRequestRef.current = null
        setLoading(false)
      }
    }
  }, [chatLog, loading, chatContent.unavailable])

  function handleSendMessage(messageOverride) {
    const text = typeof messageOverride === 'string' ? messageOverride.trim() : input.trim()
    if (!text) return
    if (text.length > MAX_INPUT_LENGTH) return
    runChat(text)
  }

  function handleStop() {
    activeRequestRef.current?.abort()
  }

  function handleRetry(userMessage) {
    if (loading) return
    const idx = chatLog.findIndex(m => m.id === userMessage.id)
    const historyOverride = idx >= 0 ? chatLog.slice(0, idx) : chatLog
    setChatLog(prev => prev.filter(m => !(m.role === 'assistant' && m.replyTo === userMessage.id)))
    runChat(userMessage.content, { historyOverride, retryUserId: userMessage.id })
  }

  function handleRegenerate(assistantMessage) {
    if (loading) return
    const userMessage = chatLog.find(m => m.id === assistantMessage.replyTo && m.role === 'user')
    if (!userMessage) return
    handleRetry(userMessage)
  }

  function handleKeyDown(e) {
    // Critical: don't send while IME is composing (Chinese/Japanese/Korean input)
    if (e.key === 'Enter' && !e.shiftKey) {
      if (isComposingRef.current || e.nativeEvent?.isComposing || e.keyCode === 229) return
      e.preventDefault()
      handleSendMessage()
      return
    }
    if (e.key === 'Escape') {
      if (input) {
        e.preventDefault()
        setInput('')
      } else {
        textareaRef.current?.blur()
      }
      return
    }
    // Up arrow on empty input: edit last user message
    if (e.key === 'ArrowUp' && !input && !loading) {
      const lastUser = [...chatLog].reverse().find(m => m.role === 'user' && m.status !== 'failed')
      if (lastUser) {
        e.preventDefault()
        setInput(lastUser.content)
        requestAnimationFrame(() => {
          const el = textareaRef.current
          if (el) {
            el.focus()
            const len = el.value.length
            el.setSelectionRange(len, len)
          }
        })
      }
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
    <main className="minimal-content-page minimal-chat-page">
      <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">

        {/* ── Chat window ── */}
        <section className="minimal-chat-card minimal-chat-window order-1 flex flex-col overflow-hidden">

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
              className="minimal-chat-icon-button disabled:pointer-events-none disabled:opacity-25"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="minimal-chat-window-body">
          <div ref={chatListRef} className="minimal-chat-list scrollbar-hide" aria-live="polite">
            {chatLog.length === 0 && !loading ? (
              <div className="minimal-chat-empty">
                <div className="minimal-chat-empty-icon">
                  <Sparkles className="h-6 w-6 text-[var(--accent-strong)]" />
                </div>
                <h2 className="text-xl font-semibold">{chatContent.emptyTitle}</h2>
                <p className="mt-2 max-w-[22rem] text-sm leading-7 text-[var(--muted)]">
                  {chatContent.emptyDescription}
                </p>
                <div className="minimal-chat-empty-prompts">
                  {suggestedQuestions.slice(0, 2).map((q, i) => (
                    <StarterPrompt
                      key={q}
                      question={q}
                      index={i}
                      chatContent={chatContent}
                      onSelect={handleSendMessage}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="minimal-chat-thread">
                <AnimatePresence initial={false}>
                  {chatLog.map((message, i) => {
                    const isLastAssistant = message.role === 'assistant'
                      && message.status === 'done'
                      && !chatLog.slice(i + 1).some(m => m.role === 'assistant')
                    return (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        chatContent={chatContent}
                        copiedId={copiedId}
                        loading={loading}
                        onCopy={handleCopy}
                        onRetry={handleRetry}
                        onRegenerate={handleRegenerate}
                        isLastAssistant={isLastAssistant}
                      />
                    )
                  })}
                </AnimatePresence>

                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          <AnimatePresence>
            {!isAtBottom && chatLog.length > 0 && (
              <motion.button
                key="jump"
                type="button"
                onClick={() => scrollToBottom('smooth')}
                aria-label={chatContent.jumpToBottomLabel}
                title={chatContent.jumpToBottomLabel}
                className="minimal-chat-jump-button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <ArrowDown className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
          </div>

          <ChatComposer
            input={input}
            loading={loading}
            chatContent={chatContent}
            textareaRef={textareaRef}
            onInputChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => { isComposingRef.current = true }}
            onCompositionEnd={() => { isComposingRef.current = false }}
            onSend={() => handleSendMessage()}
            onStop={handleStop}
          />
        </section>

        <aside className="minimal-chat-sidebar order-2 space-y-4 xl:space-y-5">
          <section className="minimal-chat-card minimal-chat-context-card p-5 md:p-6">
            <span className="minimal-chat-eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              {chatContent.eyebrow}
            </span>
            <h2 className="mt-4 text-2xl font-semibold">{chatContent.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{chatContent.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="minimal-chat-pill">{chatContent.chipFirstPerson}</span>
              <span className="minimal-chat-pill">{chatContent.chipGrounded}</span>
            </div>
          </section>

          <TechExplainer chatContent={chatContent} />

          <section className="minimal-chat-card minimal-chat-starters-card p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="minimal-chat-eyebrow">{chatContent.startersLabel}</span>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{chatContent.startersDescription}</p>
              </div>
              <Link href={localizePath('/')} className="minimal-chat-back-link">
                <ArrowLeft className="h-3.5 w-3.5" />
                {chatContent.backLabel}
              </Link>
            </div>
            <div className="mt-5 space-y-2">
              {suggestedQuestions.map((q, i) => (
                <StarterPrompt
                  key={q}
                  question={q}
                  index={i}
                  chatContent={chatContent}
                  onSelect={handleSendMessage}
                />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  )
}
