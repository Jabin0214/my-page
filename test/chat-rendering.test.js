import test from 'node:test'
import assert from 'node:assert/strict'
import { tokenizeChatInlineText } from '../src/lib/chat-rendering.js'

test('tokenizeChatInlineText identifies URLs and email addresses', () => {
  const tokens = tokenizeChatInlineText(
    'GitHub: https://github.com/Jabin0214 and email jabinchen0214@gmail.com.'
  )

  assert.deepEqual(tokens, [
    { type: 'text', value: 'GitHub: ' },
    {
      type: 'link',
      value: 'https://github.com/Jabin0214',
      href: 'https://github.com/Jabin0214',
    },
    { type: 'text', value: ' and email ' },
    {
      type: 'link',
      value: 'jabinchen0214@gmail.com',
      href: 'mailto:jabinchen0214@gmail.com',
    },
    { type: 'text', value: '.' },
  ])
})

test('tokenizeChatInlineText keeps trailing punctuation outside links', () => {
  const tokens = tokenizeChatInlineText('Portfolio: https://jabinchen.com/chat.')

  assert.deepEqual(tokens, [
    { type: 'text', value: 'Portfolio: ' },
    {
      type: 'link',
      value: 'https://jabinchen.com/chat',
      href: 'https://jabinchen.com/chat',
    },
    { type: 'text', value: '.' },
  ])
})
