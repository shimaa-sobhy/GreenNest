import puppeteer from "puppeteer"

const PROD_URL = "https://green-nest-me9y3iaqa-shimaa.vercel.app"

const VIEWPORTS = [320, 360, 375, 390]
const SELECTORS = {
  Search: 'button[aria-label="Search"]',
  Compare: 'a[aria-label="Compare"]',
  Wishlist: 'a[aria-label="Wishlist"]',
  Cart: 'a[aria-label="Cart"]',
  Menu: 'button[aria-label="Toggle menu"]',
}

const browser = await puppeteer.launch({
  headless: true,
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  args: ["--no-sandbox", "--disable-gpu"],
})

const page = await browser.newPage()

// Block fonts/media to speed up
await page.setRequestInterception(true)
page.on("request", (req) => {
  if (req.resourceType() === "font" || req.resourceType() === "media") {
    req.abort()
  } else {
    req.continue()
  }
})

console.log(`Navigating to ${PROD_URL}...`)
try {
  await page.goto(PROD_URL, { waitUntil: "networkidle0", timeout: 30000 })
} catch (e) {
  console.log(`Initial load error: ${e.message}`)
}
await new Promise(r => setTimeout(r, 3000))

// Check if we got redirected to Vercel login
const pageTitle = await page.title()
const pageUrl = page.url()
console.log(`Page title: "${pageTitle}"`)
console.log(`Final URL: ${pageUrl}`)

if (pageUrl.includes("vercel.com") || pageTitle.includes("Vercel") || pageTitle.includes("Log in")) {
  console.log("WARNING: Redirected to Vercel login. Production URL requires auth.")
  
  // Try to see what the page actually contains
  const bodyText = await page.evaluate(() => document.body?.innerText?.substring(0, 500))
  console.log(`Body text: ${bodyText}`)
  
  // Try the vercel.app URL directly - maybe need www subdomain
  const altUrls = [
    "https://green-nest.vercel.app",
    "https://www.green-nest.vercel.app",
  ]
  
  for (const altUrl of altUrls) {
    console.log(`\nTrying ${altUrl}...`)
    try {
      await page.goto(altUrl, { waitUntil: "networkidle0", timeout: 15000 })
    } catch (e) {}
    await new Promise(r => setTimeout(r, 2000))
    
    const altTitle = await page.title()
    const altUrl2 = page.url()
    console.log(`  Title: "${altTitle}", URL: ${altUrl2}`)
    
    if (!altUrl2.includes("vercel.com") && !altTitle.includes("Vercel") && !altTitle.includes("Log in")) {
      console.log(`  Found working URL: ${altUrl2}`)
      break
    }
  }
}

await new Promise(r => setTimeout(r, 1000))

// Check if we're on an actual page (not Vercel login)
const currentUrl = page.url()
if (!currentUrl.includes("vercel.com") && !currentUrl.includes("Vercel")) {
  for (const width of VIEWPORTS) {
    await page.setViewport({ width, height: 600 })
    await new Promise(r => setTimeout(r, 1000))

    const results = await page.evaluate((w) => {
      const selectors = {
        Search: 'button[aria-label="Search"]',
        Compare: 'a[aria-label="Compare"]',
        Wishlist: 'a[aria-label="Wishlist"]',
        Cart: 'a[aria-label="Cart"]',
        Menu: 'button[aria-label="Toggle menu"]',
      }

      const entries = Object.entries(selectors).map(([name, sel]) => {
        const el = document.querySelector(sel)
        if (!el) return { name, found: false }

        const rect = el.getBoundingClientRect()
        const inViewport = rect.left >= 0 && rect.left + rect.width <= w && rect.top >= 0

        const style = window.getComputedStyle(el)
        const svg = el.querySelector("svg")
        const svgStyle = svg ? window.getComputedStyle(svg) : null

        return {
          name,
          found: true,
          inViewport,
          rect: { l: Math.round(rect.left), t: Math.round(rect.top), w: Math.round(rect.width), h: Math.round(rect.height) },
          color: style.color,
          display: style.display,
          opacity: style.opacity,
          visibility: style.visibility,
          overflow: style.overflow,
          svgDisplay: svgStyle?.display,
          svgOpacity: svgStyle?.opacity,
        }
      })

      return { width: w, entries }
    }, width)

    console.log(`\n==== PRODUCTION ${width}px ====`)
    for (const r of results.entries) {
      const status = r.found ? (r.inViewport ? "✓ VISIBLE" : "✗ OUTSIDE") : "✗ NOT FOUND"
      console.log(`  ${r.name}: ${status} ${r.found ? `rect=(${r.rect.l},${r.rect.t}) ${r.rect.w}x${r.rect.h}` : ""}`)
      if (r.found) console.log(`    style: color=${r.color} display=${r.display} opacity=${r.opacity}`)
    }

    await page.screenshot({ path: `prod-${width}.png`, fullPage: false })
    console.log(`  Screenshot: prod-${width}.png`)
  }
} else {
  console.log("\nCannot access production URL directly. Taking screenshot of what we see.")
}

await page.screenshot({ path: "prod-current.png", fullPage: false })
console.log("Current page screenshot: prod-current.png")

// Now let's also check what the actual deployed HTML says
// Check if there's a version hash or build identifier
if (!currentUrl.includes("vercel.com")) {
  const htmlInfo = await page.evaluate(() => {
    const scripts = document.querySelectorAll("script[src]")
    const scriptSrcs = Array.from(scripts).map(s => s.src)
    return {
      scripts: scriptSrcs,
      assets: scriptSrcs.filter(s => s.includes("assets/")),
      hasServiceWorker: "serviceWorker" in navigator,
    }
  })
  console.log("\nBuild info:", JSON.stringify(htmlInfo, null, 2))
}

await browser.close()
console.log("\nDone")
