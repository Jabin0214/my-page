'use client';

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Bot, Loader2, Send, User } from 'lucide-react'
import { sendChatMessage } from '../lib/chat-api'

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
          content: 'The assistant is temporarily unavailable. Please try again in a moment.',
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
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 pb-10 pt-24">
      <section className="mb-4 rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-cyan-200/70">
              Interview Mode
            </p>
            <h1 className="text-3xl font-bold text-white">Chat with Jabin Chen</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Ask interview-style questions and get answers written as if Jabin is
              responding directly in a real conversation. The focus is on clear, confident,
              evidence-backed answers that feel natural rather than robotic.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-0.5"
          >
            Back to Portfolio
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/50">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            First-person answers
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            Interview-ready responses
          </span>
          <button
            type="button"
            onClick={handleClearChat}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            Clear chat
          </button>
        </div>
      </section>

      <section className="flex flex-1 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-2xl backdrop-blur-xl">
        <div className="flex-1 overflow-y-auto p-5">
          {chatLog.length === 0 ? (
            <div className="flex h-full min-h-[24rem] flex-col items-center justify-center px-4 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-200">
                <Bot className="h-8 w-8" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-white">Ask anything about Jabin</h2>
              <p className="max-w-xl text-sm text-white/60">
                Ask the kinds of questions a recruiter, interviewer, or hiring manager would
                ask. The reply is tuned to sound like a strong candidate speaking from real
                experience, not like a resume search tool.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {chatLog.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-lg ${
                      message.role === 'user'
                        ? 'rounded-br-md bg-cyan-400 text-slate-950'
                        : message.role === 'system'
                        ? 'bg-red-500/15 text-red-100'
                        : 'rounded-bl-md bg-white/10 text-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {message.role !== 'user' && (
                        <div className="mt-0.5 text-cyan-200">
                          {message.role === 'assistant' ? (
                            <Bot className="h-4 w-4" />
                          ) : (
                            <span className="text-xs">!</span>
                          )}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="whitespace-pre-wrap leading-6">{message.content}</p>
                      </div>

                      {message.role === 'user' && (
                        <div className="mt-0.5 text-slate-950">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 text-white shadow-lg">
                    <div className="flex items-center gap-3 text-sm text-white/70">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => setInput(question)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                {question}
              </button>
            ))}
          </div>

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
              placeholder="Ask an interview-style question about Jabin Chen..."
              className="min-h-12 max-h-32 flex-1 resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/40"
            />

            <button
              type="button"
              onClick={handleSendMessage}
              disabled={loading || input.trim() === ''}
              aria-label="Send message"
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>

          <p className="mt-2 text-right text-xs text-white/40">
            Press Enter to send, Shift+Enter for a new line
          </p>
        </div>
      </section>
    </main>
  )
}
