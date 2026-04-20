import test from 'node:test'
import assert from 'node:assert/strict'
import sitemap from '../app/sitemap.js'

test('sitemap contains only valid jabinchen.com URLs', () => {
  const entries = sitemap()
  const urls = entries.map((entry) => entry.url)

  assert.ok(urls.includes('https://jabinchen.com/'))
  assert.ok(urls.includes('https://jabinchen.com/en'))
  assert.ok(urls.includes('https://jabinchen.com/zh'))
  assert.ok(urls.includes('https://jabinchen.com/en/projects'))
  assert.ok(urls.includes('https://jabinchen.com/zh/contact'))

  for (const url of urls) {
    assert.equal(new URL(url).hostname, 'jabinchen.com')
    assert.equal(url.includes('[object Object]'), false)
  }
})
