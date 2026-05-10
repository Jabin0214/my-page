const LINK_PATTERN = /(https?:\/\/[^\s<>()]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/gi
const TRAILING_PUNCTUATION = /[.,!?;:)]$/

function splitTrailingPunctuation(value) {
  let linkValue = value
  let trailing = ''

  while (TRAILING_PUNCTUATION.test(linkValue)) {
    trailing = `${linkValue.at(-1)}${trailing}`
    linkValue = linkValue.slice(0, -1)
  }

  return { linkValue, trailing }
}

export function tokenizeChatInlineText(text) {
  if (!text) return []

  const tokens = []
  let lastIndex = 0
  let match

  LINK_PATTERN.lastIndex = 0

  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: text.slice(lastIndex, match.index) })
    }

    const { linkValue, trailing } = splitTrailingPunctuation(match[0])
    const href = linkValue.includes('@') && !linkValue.startsWith('http')
      ? `mailto:${linkValue}`
      : linkValue

    tokens.push({ type: 'link', value: linkValue, href })

    if (trailing) {
      tokens.push({ type: 'text', value: trailing })
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return tokens
}
