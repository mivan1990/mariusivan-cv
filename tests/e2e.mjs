// Teste E2E pentru CV (taskul F2 din vault/11-Taskuri.md).
//
// Ruleaza pe build-ul de productie, prin Chrome-ul instalat pe sistem:
//   npm run build && npm run preview     (intr-un terminal)
//   node tests/e2e.mjs                   (in altul)
//
// Verifica: randare, typing effect, numere animate, prezenta sectiunilor,
// accordion FAQ, comutarea EN/RO, focus vizibil la Tab, ancorele din navbar,
// cursor trail, meniul mobil, absenta scroll-ului orizontal, erorile din
// consola, si comportamentul cu prefers-reduced-motion.
//
// WebKit e sarit daca build-ul din cache nu se potriveste cu pachetul.

// Playwright nu e dependinta a proiectului — se ia de unde e instalat.
// Suprascrie cu PLAYWRIGHT_PATH daca e in alta parte.
const PW = process.env.PLAYWRIGHT_PATH
  ?? '/Users/mariusivan/.npm/_npx/a80a913f4f8f2557/node_modules/playwright/index.mjs'
const { chromium, webkit } = await import(PW)

const URL = 'http://localhost:4173/'
const OUT = process.env.SHOTS_DIR ?? './tests/shots'
const results = []

function log(name, ok, detail = '') {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`)
}

async function run(browserType, label, launchOpts = {}) {
  const browser = await browserType.launch(launchOpts)
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()

  const consoleErrors = []
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()) })
  page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message))

  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2500) // lasa animatiile sa porneasca

  // --- randare de baza ---
  const h1 = (await page.locator('h1').first().innerText()).trim()
  log(`${label}: pagina randeaza`, h1.length > 0, `h1 = "${h1}"`)

  // --- typing effect: linia rolului trebuie sa se completeze ---
  const roleLine = page.locator('h1 + p').first()
  const roleText = (await roleLine.innerText()).trim()
  log(`${label}: typing effect s-a completat`, roleText.length > 3, `"${roleText}"`)

  // --- numere animate: valorile finale ---
  const stats = await page.locator('.font-mono-code.text-2xl').allInnerTexts()
  const statTxt = stats.map((s) => s.trim()).join(' | ')
  log(`${label}: numere animate au ajuns la final`, /2023/.test(statTxt) && /82/.test(statTxt), statTxt)

  // --- sectiuni prezente ---
  for (const id of ['hero', 'experience', 'projects', 'skills', 'contact', 'faq']) {
    const n = await page.locator(`#${id}`).count()
    log(`${label}: sectiunea #${id}`, n > 0)
  }

  await page.screenshot({ path: `${OUT}/${label}-01-hero.png` })

  // --- FAQ accordion se deschide ---
  await page.locator('#faq').scrollIntoViewIfNeeded()
  await page.waitForTimeout(900)
  const trigger = page.locator('#faq button').first()
  const qText = (await trigger.innerText()).trim()
  await trigger.click()
  await page.waitForTimeout(600)
  const expanded = await trigger.getAttribute('aria-expanded')
  log(`${label}: FAQ accordion se deschide`, expanded === 'true', `aria-expanded=${expanded}, intrebare: "${qText.slice(0, 45)}"`)
  await page.screenshot({ path: `${OUT}/${label}-02-faq.png` })

  // --- toggle EN/RO ---
  const before = (await page.locator('nav button').nth(2).innerText()).trim()
  const toggle = page.locator('nav button').filter({ hasText: /^(RO|EN)$/ }).first()
  const toggleLabel = await toggle.getAttribute('aria-label')
  await toggle.click()
  await page.waitForTimeout(2200)
  const after = (await page.locator('nav button').nth(2).innerText()).trim()
  log(`${label}: toggle EN/RO schimba textul`, before !== after, `"${before}" -> "${after}" (aria-label: "${toggleLabel}")`)
  await page.screenshot({ path: `${OUT}/${label}-03-ro.png` })
  await toggle.click()
  await page.waitForTimeout(1500)

  // --- navigare cu tastatura: focus vizibil ---
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  const focused = await page.evaluate(() => {
    const el = document.activeElement
    if (!el || el === document.body) return null
    const cs = getComputedStyle(el)
    return { tag: el.tagName, outline: cs.outlineWidth, ring: cs.boxShadow.slice(0, 40) }
  })
  const hasFocusRing = focused && (parseFloat(focused.outline) > 0 || (focused.ring && focused.ring !== 'none'))
  log(`${label}: focus vizibil la Tab`, !!hasFocusRing, focused ? `${focused.tag}, outline=${focused.outline}` : 'nimic focusat')

  // --- ancorele din navbar ---
  const navBtn = page.locator('nav button').nth(3)
  await navBtn.click()
  await page.waitForTimeout(1200)
  const scrolled = await page.evaluate(() => window.scrollY)
  log(`${label}: ancorele din navbar deruleaza`, scrolled > 100, `scrollY = ${Math.round(scrolled)}`)

  // --- cursor trail apare la miscarea mouse-ului ---
  await page.mouse.move(400, 400)
  await page.mouse.move(700, 500)
  await page.waitForTimeout(400)
  const trailOpacity = await page.evaluate(() => {
    const el = document.querySelector('.pointer-events-none.fixed.inset-0.z-40')
    return el ? getComputedStyle(el).opacity : null
  })
  log(`${label}: cursor trail se aprinde`, trailOpacity === '1', `opacity = ${trailOpacity}`)

  // --- mobil ---
  await page.setViewportSize({ width: 390, height: 844 })
  await page.waitForTimeout(800)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(500)
  const burger = page.locator('nav button[aria-controls="mobile-menu"]')
  const burgerVisible = await burger.isVisible()
  log(`${label}: hamburger apare pe mobil`, burgerVisible)
  if (burgerVisible) {
    await burger.click()
    await page.waitForTimeout(600)
    const menuOpen = await page.locator('#mobile-menu').isVisible()
    const ariaExp = await burger.getAttribute('aria-expanded')
    log(`${label}: meniul mobil se deschide`, menuOpen && ariaExp === 'true', `aria-expanded=${ariaExp}`)
  }
  await page.screenshot({ path: `${OUT}/${label}-04-mobil.png` })

  // --- scroll orizontal pe mobil (bug clasic) ---
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  log(`${label}: fara scroll orizontal pe mobil`, overflow <= 1, `overflow = ${overflow}px`)

  log(`${label}: fara erori in consola`, consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' / ') || 'niciuna')

  await browser.close()
}

// --- reduced motion, doar pe chromium ---
async function runReducedMotion() {
  const browser = await chromium.launch({ channel: 'chrome' })
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  const role = (await page.locator('h1 + p').first().innerText()).trim()
  log('reduced-motion: textul rolului e complet imediat', role.length > 3, `"${role}"`)

  const stats = (await page.locator('.font-mono-code.text-2xl').allInnerTexts()).map((s) => s.trim()).join(' | ')
  log('reduced-motion: numerele sunt la valoarea finala', /2023/.test(stats), stats)

  await page.mouse.move(500, 500)
  await page.waitForTimeout(400)
  const trail = await page.evaluate(() => document.querySelector('.pointer-events-none.fixed.inset-0.z-40'))
  log('reduced-motion: cursor trail NU e randat', trail === null)

  await page.screenshot({ path: `${OUT}/reduced-motion.png` })
  await browser.close()
}

await run(chromium, 'chrome', { channel: 'chrome' })
try {
  await run(webkit, 'webkit')
} catch (e) {
  console.log('SKIP  webkit — ' + String(e).split('\n')[0].slice(0, 90))
}
await runReducedMotion()

const failed = results.filter((r) => !r.ok)
console.log(`\n=== ${results.length - failed.length}/${results.length} au trecut ===`)
if (failed.length) {
  console.log('PICATE:')
  for (const f of failed) console.log(`  - ${f.name}: ${f.detail}`)
}
