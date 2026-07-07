import puppeteer from "puppeteer"

const VIEWPORTS = [320, 360, 375, 390, 430]

const browser = await puppeteer.launch({
  headless: true,
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  args: ["--no-sandbox", "--disable-gpu"],
})

async function inspectAtWidth(page, width) {
  await page.setViewport({ width, height: 800 })
  await new Promise(r => setTimeout(r, 2000))

  // Wait for React to render the navbar
  await page.waitForSelector('nav a[href="/compare"]', { timeout: 5000 }).catch(() => {})

  const result = await page.evaluate(() => {
    const compareLink = document.querySelector('a[href="/compare"]')
    if (!compareLink) {
      // Try other selectors
      const allLinks = Array.from(document.querySelectorAll("a"))
      console.log("All links:", allLinks.map(l => l.href))
      return { exists: false }
    }

    const rect = compareLink.getBoundingClientRect()
    const style = window.getComputedStyle(compareLink)
    const parent = compareLink.parentElement
    const parentStyle = parent ? window.getComputedStyle(parent) : null
    const grandparent = parent ? parent.parentElement : null
    const gpStyle = grandparent ? window.getComputedStyle(grandparent) : null
    const container = document.querySelector('.flex.items-center.gap-0\\.5')
    const containerStyle = container ? window.getComputedStyle(container) : null
    const nav = document.querySelector('nav')
    const navStyle = nav ? window.getComputedStyle(nav) : null

    // Check parent chain for overflow hidden
    let overflowHidden = false
    let overflowEl = null
    let el = compareLink
    while (el && el !== document.body) {
      const s = window.getComputedStyle(el)
      if (s.overflow !== "visible" && s.overflow !== "clip") {
        overflowHidden = true
        overflowEl = el.tagName + (el.className && typeof el.className === "string" ? "." + el.className.split(" ").join(".") : "")
      }
      el = el.parentElement
    }

    // Check if another element covers it
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const topEl = document.elementFromPoint(centerX, centerY)

    // Check Framer Motion inline styles
    const motionDiv = compareLink.parentElement
    const motionDivStyle = motionDiv ? motionDiv.style.cssText : "null"

    // Check parent motion wrapper (if any)
    const outerMotion = motionDiv ? motionDiv.parentElement : null
    const outerMotionStyle = outerMotion && outerMotion.tagName === "DIV" ? outerMotion.style.cssText : "null"

    // Get all sibling elements in the action icons container
    const siblings = container ? Array.from(container.children).map((child, i) => {
      const cs = window.getComputedStyle(child)
      return {
        index: i,
        tag: child.tagName,
        classes: typeof child.className === "string" ? child.className : String(child.className),
        width: child.getBoundingClientRect().width,
        display: cs.display,
        flexShrink: cs.flexShrink,
        minWidth: cs.minWidth,
        hasCompareChild: !!child.querySelector('a[href="/compare"]'),
        hasScaleIcon: !!child.querySelector("svg")
      }
    }) : []

    return {
      exists: true,
      rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      computed: {
        display: style.display,
        width: style.width,
        height: style.height,
        minWidth: style.minWidth,
        opacity: style.opacity,
        visibility: style.visibility,
        transform: style.transform,
        overflow: style.overflow,
        flexShrink: style.flexShrink,
        position: style.position,
        zIndex: style.zIndex,
        marginLeft: style.marginLeft,
        marginRight: style.marginRight,
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
      },
      parentComputed: parentStyle ? {
        display: parentStyle.display,
        width: parentStyle.width,
        minWidth: parentStyle.minWidth,
        flexShrink: parentStyle.flexShrink,
        overflow: parentStyle.overflow,
        transform: parentStyle.transform,
        cssText: motionDivStyle,
      } : null,
      grandparentComputed: gpStyle ? {
        display: gpStyle.display,
        width: gpStyle.width,
        flexShrink: gpStyle.flexShrink,
        overflow: gpStyle.overflow,
        transform: gpStyle.transform,
        cssText: outerMotionStyle,
      } : null,
      containerComputed: containerStyle ? {
        display: containerStyle.display,
        width: containerStyle.width,
        minWidth: containerStyle.minWidth,
        overflow: containerStyle.overflow,
        justifyContent: containerStyle.justifyContent,
        gap: containerStyle.gap,
        flexWrap: containerStyle.flexWrap,
        flexShrink: containerStyle.flexShrink,
      } : null,
      navComputed: navStyle ? {
        width: navStyle.width,
        display: navStyle.display,
        justifyContent: navStyle.justifyContent,
        overflow: navStyle.overflow,
        paddingLeft: navStyle.paddingLeft,
        paddingRight: navStyle.paddingRight,
      } : null,
      overflowHidden,
      overflowElement: overflowEl,
      topElement: topEl ? topEl.tagName + (topEl.className && typeof topEl.className === "string" ? "." + topEl.className.split(" ").join(".") : "") : "null",
      isCovered: topEl && topEl !== compareLink && !compareLink.contains(topEl) && !topEl.contains(compareLink),
      framerMotionInlineStyle: motionDivStyle,
      siblings: siblings,
      navLinksWidth: document.querySelector('.hidden.lg\\:flex')?.getBoundingClientRect().width || 0,
      logoWidth: document.querySelector('a[href="/"]')?.getBoundingClientRect().width || 0,
    }
  })

  console.log(`\n========== ${width}px ==========`)
  console.log(`Compare exists: ${result.exists}`)
  if (result.exists) {
    console.log(`Bounding box:`, JSON.stringify(result.rect))
    console.log(`Computed:`, JSON.stringify(result.computed, null, 2))
    console.log(`Parent:`, JSON.stringify(result.parentComputed, null, 2))
    console.log(`Grandparent:`, JSON.stringify(result.grandparentComputed, null, 2))
    console.log(`Container:`, JSON.stringify(result.containerComputed, null, 2))
    console.log(`Nav:`, JSON.stringify(result.navComputed, null, 2))
    console.log(`Overflow hidden:`, result.overflowHidden, result.overflowElement)
    console.log(`Is covered:`, result.isCovered, result.topElement)
    console.log(`Framer inline:`, result.framerMotionInlineStyle)
    console.log(`Siblings:`, JSON.stringify(result.siblings, null, 2))
    console.log(`Logo width:`, result.logoWidth)
    console.log(`Nav links width:`, result.navLinksWidth)
  }
}

try {
  const page = await browser.newPage()
  
  // Block images for faster loading
  await page.setRequestInterception(true)
  page.on("request", (req) => {
    if (req.resourceType() === "image" || req.resourceType() === "font" || req.resourceType() === "media") {
      req.abort()
    } else {
      req.continue()
    }
  })

  await page.goto("http://localhost:4173", { waitUntil: "networkidle0", timeout: 30000 })
  await new Promise(r => setTimeout(r, 3000))

  for (const w of VIEWPORTS) {
    await inspectAtWidth(page, w)
  }

  // Take a screenshot at 375px
  await page.setViewport({ width: 375, height: 800 })
  await new Promise(r => setTimeout(r, 1000))
  await page.screenshot({ path: "navbar-375.png", fullPage: false })

  await browser.close()
  console.log("\nDone. Screenshot saved to navbar-375.png")
} catch (e) {
  console.error("Error:", e.message)
  await browser.close()
}
