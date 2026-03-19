'use client';

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Bot, Lightbulb, Loader2, MessageCircleMore, Send, Sparkles, User } from 'lucide-react'
import { sendChatMessage } from '../lib/chat-api'
import { usePortfolioContent } from '../hooks/usePortfolioContent'

const suggestedQuestions = [
  'Tell me about yourself.',
  'What are the strongest projects you would highlight in an interview?',
  'How would you describe your experience with cloud deployment?',
  'What is your background in AI-related projects?',
  'Why are you a strong fit for a full-stack role?',
  'Can you walk me through Medimate and your impact there?',
]

export default function Chat() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatLog, setChatLog] = useState([])
  const chatEndRef = useRef(null)
  const inputRef = useRef(null)
  const textareaRef = useRef(null)
  const content = usePortfolioContent()
  const chatContent = content.chat

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    inputRef.current?.focus()
  }, [chatLog, loading])

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) {
      return
    }

    textarea.style.height = '0px'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
  }, [input])

  async function handleSendMessage() {
    const trimmedInput = input.trim()
    if (!trimmedInput || loading) {
      return
    }

    const history = chatLog
      .filter((item) => item.role === 'user' || item.role === 'assistant')
      .map((item) => ({
        role: item.role,
        content: item.content,
      }))

    setLoading(true)
    setChatLog((previous) => [...previous, { role: 'user', content: trimmedInput }])
    setInput('')

    try {
      const result = await sendChatMessage(trimmedInput, history)
      setChatLog((previous) => [...previous, { role: 'assistant', content: result.reply }])
    } catch {
      setChatLog((previous) => [
        ...previous,
        {
          role: 'system',
          content: chatContent.unavailable,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  function handleClearChat() {
    setChatLog([])
    setInput('')
    inputRef.current?.focus()
  }

  return (
    <main className="page-shell pb-16 pt-16">
      <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <section className="surface-card-strong order-1 flex min-h-[72vh] flex-col overflow-hidden">
          <div className="border-b border-[var(--line)] px-6 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="eyebrow">{chatContent.liveEyebrow}</span>
                <h1 className="mt-4 text-3xl font-semibold md:text-4xl">{chatContent.liveTitle}</h1>
              </div>
              <button
                type="button"
                onClick={handleClearChat}
                className="button-secondary w-fit text-sm"
              >
                {chatContent.clearChatLabel}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {chatLog.length === 0 ? (
              <div className="flex h-full min-h-[26rem] flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                  <Bot className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-semibold">{chatContent.emptyTitle}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-8 text-[#526072]">{chatContent.emptyDescription}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {chatLog.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[1.4rem] px-4 py-3 text-sm leading-7 shadow-[0_10px_24px_rgba(15,23,42,0.06)] ${
                        message.role === 'user'
                          ? 'rounded-br-md bg-[#101828] text-white'
                          : message.role === 'system'
                          ? 'border border-[#fed7aa] bg-[#fff7ed] text-[#9a3412]'
                          : 'border border-[var(--line)] bg-white text-[#101828]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {message.role !== 'user' && (
                          <div className="mt-1 text-[#0f766e]">
                            {message.role === 'assistant' ? <Bot className="h-4 w-4" /> : <span className="text-xs">!</span>}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.role === 'user' && (
                          <div className="mt-1 text-white">
                            <User className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-[1.4rem] border border-[var(--line)] bg-white px-4 py-3 text-sm text-[#526072] shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{chatContent.thinking}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          <div className="border-t border-[var(--line)] bg-white/70 px-6 py-4">
            <div className="flex items-end gap-3">
              <textarea
                ref={(element) => {
                  textareaRef.current = element
                  inputRef.current = element
                }}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={loading}
                placeholder={chatContent.placeholder}
                className="field-surface min-h-12 max-h-32 flex-1 resize-none px-4 py-3 text-sm text-[#101828] outline-none focus:border-[rgba(15,118,110,0.35)]"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={loading || input.trim() === ''}
                aria-label="Send message"
                className="button-primary h-12 w-12 rounded-[1.1rem] p-0 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-3 flex flex-col gap-1 text-xs text-[#667085] sm:flex-row sm:items-center sm:justify-between">
              <p>{chatContent.footerHintPrimary}</p>
              <p>{chatContent.footerHintSecondary}</p>
            </div>
          </div>
        </section>

        <aside className="order-2 space-y-6">
          <section className="surface-card p-6">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              {chatContent.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-semibold">{chatContent.title}</h2>
            <p className="mt-4 text-base leading-8 text-[#526072]">{chatContent.description}</p>

            <div className="mt-6 space-y-3">
              <div className="surface-subtle px-4 py-4">
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                  <Lightbulb className="h-3.5 w-3.5" />
                  {chatContent.goodPromptsLabel}
                </p>
                <p className="text-sm leading-7 text-[#526072]">{chatContent.goodPromptsText}</p>
              </div>
              <div className="surface-subtle px-4 py-4">
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                  <MessageCircleMore className="h-3.5 w-3.5" />
                  {chatContent.bestUseLabel}
                </p>
                <p className="text-sm leading-7 text-[#526072]">{chatContent.bestUseText}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="tag-pill">{chatContent.chipFirstPerson}</span>
              <span className="tag-pill">{chatContent.chipGrounded}</span>
            </div>
          </section>

          <section className="surface-card p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="eyebrow">{chatContent.startersLabel}</span>
                <p className="mt-4 text-sm leading-7 text-[#526072]">{chatContent.startersDescription}</p>
              </div>
              <Link href="/" className="button-secondary text-sm">
                <ArrowLeft className="h-4 w-4" />
                {chatContent.backLabel}
              </Link>
            </div>

            <div className="mt-6 space-y-3">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => setInput(question)}
                  className="surface-subtle block w-full px-4 py-4 text-left hover:border-[rgba(15,118,110,0.24)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                    {chatContent.starterPrefix} {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#101828]">{question}</p>
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  )
}
