import { useEffect, useRef } from "react"
import gsap from "gsap"

const LEAF_TYPES = [
  (fill: string) => (
    <svg viewBox="0 0 24 32" className="w-full h-full" aria-hidden="true">
      <path d="M12 31C12 31 2 20 2 10C2 4 6 1 12 1C18 1 22 4 22 10C22 20 12 31 12 31Z" fill={fill} />
      <path d="M12 31L12 4" stroke="rgba(91,143,90,0.04)" strokeWidth="0.5" />
      <path d="M12 14L7 9" stroke="rgba(91,143,90,0.04)" strokeWidth="0.5" />
      <path d="M12 14L17 9" stroke="rgba(91,143,90,0.04)" strokeWidth="0.5" />
    </svg>
  ),
  (fill: string) => (
    <svg viewBox="0 0 24 20" className="w-full h-full" aria-hidden="true">
      <path d="M12 19C12 19 1 14 1 7C1 3 4 1 12 1C20 1 23 3 23 7C23 14 12 19 12 19Z" fill={fill} />
      <path d="M12 18L12 3" stroke="rgba(91,143,90,0.04)" strokeWidth="0.5" />
    </svg>
  ),
  (fill: string) => (
    <svg viewBox="0 0 12 36" className="w-full h-full" aria-hidden="true">
      <path d="M6 35C6 35 1 22 1 10C1 4 3 1 6 1C9 1 11 4 11 10C11 22 6 35 6 35Z" fill={fill} />
      <path d="M6 34L6 4" stroke="rgba(91,143,90,0.04)" strokeWidth="0.5" />
    </svg>
  ),
  (fill: string) => (
    <svg viewBox="0 0 16 24" className="w-full h-full" aria-hidden="true">
      <path d="M8 23C8 23 1 14 1 7C1 3 3 1 8 1C13 1 15 3 15 7C15 14 8 23 8 23Z" fill={fill} />
      <path d="M8 22L8 3" stroke="rgba(91,143,90,0.04)" strokeWidth="0.5" />
    </svg>
  ),
  (fill: string) => (
    <svg viewBox="0 0 10 12" className="w-full h-full" aria-hidden="true">
      <path d="M5 11C5 11 1 7 1 4C1 2 2 1 5 1C8 1 9 2 9 4C9 7 5 11 5 11Z" fill={fill} />
    </svg>
  ),
]

const LEAF_TYPES_COUNT = LEAF_TYPES.length
const LEAF_COUNT = 24
const POLLEN_COUNT = 20
const ASPECT: Record<number, number> = { 0: 1.4, 1: 0.85, 2: 3, 3: 1.5, 4: 1.2 }

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

interface StaticLeafCfg {
  type: number
  size: number
  baseOpacity: number
  rotation: number
  rotateX: number
  rotateY: number
  layer: number
  blur: number
  depthScale: number
  isSeed: boolean
  hasBreathing: boolean
  hasFlicker: boolean
  leafColor: string
  swayAmplitude: number
  swayDuration: number
  swayPhase: number
  breathingDuration: number
  breathingPhase: number
  flickerDuration: number
  flickerPhase: number
}

function createLeafCfg(i: number): StaticLeafCfg {
  const layer = i < Math.floor(LEAF_COUNT * 0.2) ? 0 : i < Math.floor(LEAF_COUNT * 0.58) ? 1 : 2
  const isBg = layer === 0
  const isSeed = i >= LEAF_COUNT - 3
  const depthScale = isSeed ? rand(1.1, 1.25) : layer === 0 ? rand(0.85, 0.93) : layer === 1 ? rand(0.94, 1.02) : rand(1.04, 1.12)
  const r = Math.round(rand(78, 105))
  const g = Math.round(rand(125, 160))
  const b = Math.round(rand(78, 100))
  return {
    type: Math.floor(rand(0, LEAF_TYPES_COUNT)),
    size: isSeed ? rand(28, 44) : isBg ? rand(18, 36) : rand(5, 22),
    baseOpacity: isSeed ? rand(0.04, 0.08) : isBg ? rand(0.015, 0.05) : layer === 1 ? rand(0.03, 0.08) : rand(0.05, 0.12),
    rotation: rand(0, 360),
    rotateX: Math.random() < 0.35 ? rand(1, 4) : 0,
    rotateY: Math.random() < 0.35 ? rand(1, 4) : 0,
    layer: isSeed ? 2 : layer,
    blur: isSeed ? 0 : isBg ? rand(1.5, 4) : layer === 1 ? rand(0.5, 1.2) : 0,
    depthScale,
    isSeed,
    hasBreathing: Math.random() < 0.6,
    hasFlicker: Math.random() < 0.4,
    leafColor: `rgba(${r},${g},${b},1)`,
    swayAmplitude: isBg ? rand(4, 12) : rand(8, 24),
    swayDuration: rand(3, 9),
    swayPhase: rand(0, Math.PI * 2),
    breathingDuration: rand(4, 8),
    breathingPhase: rand(0, Math.PI * 2),
    flickerDuration: rand(4, 8),
    flickerPhase: rand(0, Math.PI * 2),
  }
}

function makeLeafCfgs(): StaticLeafCfg[] {
  return Array.from({ length: LEAF_COUNT }, (_, i) => createLeafCfg(i))
}

function createPollenData() {
  return Array.from({ length: POLLEN_COUNT }, () => ({
    x: rand(0, 100),
    y: rand(-20, 120),
    size: rand(1.5, 4),
    opacity: rand(0.008, 0.03),
    duration: rand(30, 50),
    delay: rand(0, 15),
  }))
}

const leafCfgs = makeLeafCfgs()
const pollenData = createPollenData()

interface DriftPos {
  startX: number
  startY: number
  endX: number
  endY: number
  driftDur: number
  targetOpacity: number
}

function generateDrift(vw: number, vh: number, cfg: StaticLeafCfg): DriftPos {
  const base = cfg.size
  const path = cfg.isSeed ? 1 : Math.floor(rand(0, 4))
  let startX: number, startY: number, endX: number, endY: number
  switch (path) {
    case 0:
      startX = rand(-60, vw + 60)
      startY = -base - 60
      endX = rand(-60, vw + 60)
      endY = vh + base + 60
      break
    case 1:
      startX = rand(-60, vw + 60)
      startY = vh + base + 60
      endX = rand(-60, vw + 60)
      endY = -base - 60
      break
    case 2:
      startX = -base - 60
      startY = rand(-60, vh * 0.4)
      endX = vw + base + 60
      endY = rand(vh * 0.3, vh + 60)
      break
    default:
      startX = vw + base + 60
      startY = rand(-60, vh * 0.4)
      endX = -base - 60
      endY = rand(vh * 0.3, vh + 60)
      break
  }
  const layer = cfg.layer
  const driftDur = cfg.isSeed ? rand(35, 55) : layer === 0 ? rand(22, 38) : layer === 1 ? rand(14, 26) : rand(8, 18)
  return { startX, startY, endX, endY, driftDur, targetOpacity: cfg.baseOpacity }
}

function setupLeafAnimations(
  wrapper: HTMLDivElement,
  swayEl: HTMLDivElement,
  visualEl: HTMLDivElement,
  cfg: StaticLeafCfg,
  vw: number,
  vh: number,
) {
  function startCycle() {
    const pos = generateDrift(vw, vh, cfg)

    const tl = gsap.timeline()
    tl.set(wrapper, { x: pos.startX, y: pos.startY, opacity: 0 })
    tl.to(wrapper, { opacity: pos.targetOpacity, duration: 0.6, ease: "power2.out" })
    tl.to(wrapper, {
      x: pos.endX,
      y: pos.endY,
      duration: pos.driftDur,
      ease: "sine.inOut",
    })
    tl.to(wrapper, { opacity: 0, duration: 0.6, ease: "power2.in" })
    tl.eventCallback("onComplete", startCycle)
    return tl
  }

  const cycleTl = startCycle()

  const swayTl = gsap.to(swayEl, {
    x: cfg.swayAmplitude,
    duration: cfg.swayDuration,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  })
  gsap.set(swayEl, { x: 0 })
  swayTl.progress(cfg.swayPhase / (Math.PI * 2))

  if (cfg.hasBreathing) {
    gsap.to(visualEl, {
      scale: 1.02,
      duration: cfg.breathingDuration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })
  }

  if (cfg.hasFlicker) {
    gsap.to(visualEl, {
      opacity: 0.85,
      duration: cfg.flickerDuration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })
  }

  return { cycleTl, swayTl }
}

interface PollenAnim {
  driftTl: gsap.core.Tween
  fadeTl: gsap.core.Tween
}

function setupPollenAnimation(el: HTMLDivElement, pData: (typeof pollenData)[number], vw: number, vh: number): PollenAnim {
  const startX = rand(0, vw)
  const startY = rand(-vh * 0.2, vh * 1.2)
  gsap.set(el, { x: startX, y: startY, opacity: 0 })
  const driftTl = gsap.to(el, {
    y: startY - vh * 1.5,
    x: `+=${rand(-80, 80)}`,
    duration: pData.duration,
    delay: pData.delay,
    ease: "sine.inOut",
    repeat: -1,
  })
  const fadeTl = gsap.to(el, {
    opacity: pData.opacity,
    duration: rand(2, 4),
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  })
  return { driftTl, fadeTl }
}

export default function FloatingLeaves() {
  const containerRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const isReduced = mq.matches

    const leafAnimations: { cycleTl: gsap.core.Timeline; swayTl: gsap.core.Tween }[] = []
    const pollenAnimations: PollenAnim[] = []
    let gustTimeout: ReturnType<typeof setTimeout> | null = null
    let gustEls: NodeListOf<HTMLDivElement> | null = null

    function setup() {
      if (isReduced || !container) return
      const vw = window.innerWidth
      const vh = window.innerHeight

      const maxLeaves = vw < 768 ? Math.floor(LEAF_COUNT * 0.6) : vw < 1024 ? Math.floor(LEAF_COUNT * 0.8) : LEAF_COUNT

      const leafEls = container.querySelectorAll<HTMLDivElement>(".leaf-particle")
      const swayEls = container.querySelectorAll<HTMLDivElement>(".leaf-sway")
      const visualEls = container.querySelectorAll<HTMLDivElement>(".leaf-visual")
      const pollenEls = container.querySelectorAll<HTMLDivElement>(".pollen-particle")
      gustEls = container.querySelectorAll<HTMLDivElement>(".leaf-gust")

      leafEls.forEach((el, i) => {
        el.style.display = i >= maxLeaves ? "none" : ""
        if (i >= maxLeaves) return

        const cfgIdx = Number(el.dataset.cfg) || 0
        const cfg = leafCfgs[cfgIdx] ?? leafCfgs[0]
        const swayEl = swayEls[i]
        const visualEl = visualEls[i]
        if (!swayEl || !visualEl) return

        const anims = setupLeafAnimations(el, swayEl, visualEl, cfg, vw, vh)
        leafAnimations.push(anims)
      })

      pollenEls.forEach((el, i) => {
        const pData = pollenData[i]
        if (!pData) return
        const anims = setupPollenAnimation(el, pData, vw, vh)
        pollenAnimations.push(anims)
      })
    }

    function scheduleGust() {
      const delay = rand(15000, 30000)
      gustTimeout = setTimeout(() => {
        if (!gustEls) return
        const subset = Math.floor(rand(0.3, 0.5) * gustEls.length)
        const indices = new Set<number>()
        while (indices.size < subset) {
          indices.add(Math.floor(Math.random() * gustEls.length))
        }
        indices.forEach((idx) => {
          const el = gustEls![idx]
          if (!el) return
          gsap.to(el, {
            x: rand(30, 80) * (Math.random() < 0.5 ? 1 : -1),
            duration: rand(1.5, 3),
            ease: "power2.out",
            onComplete: () => {
              gsap.to(el, {
                x: 0,
                duration: rand(2, 4),
                ease: "power1.inOut",
              })
            },
          })
        })
        scheduleGust()
      }, delay)
    }

    if (!isReduced && !initialized.current) {
      initialized.current = true
      setup()
      scheduleGust()
    }

    const mqHandler = (e: MediaQueryListEvent) => {
      const allEls = container.querySelectorAll<HTMLDivElement>(".leaf-particle, .leaf-sway, .leaf-visual, .leaf-gust, .pollen-particle")
      if (e.matches) {
        allEls.forEach((el) => gsap.killTweensOf(el))
        leafAnimations.length = 0
        pollenAnimations.length = 0
        if (gustTimeout) { clearTimeout(gustTimeout); gustTimeout = null }
        initialized.current = false
      } else if (!initialized.current) {
        initialized.current = true
        setup()
        scheduleGust()
      }
    }
    mq.addEventListener("change", mqHandler)

    function onVisibilityChange() {
      if (document.hidden) {
        gsap.globalTimeline.pause()
      } else {
        gsap.globalTimeline.resume()
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      mq.removeEventListener("change", mqHandler)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      if (gustTimeout) clearTimeout(gustTimeout)
      const allEls = container.querySelectorAll<HTMLDivElement>(".leaf-particle, .leaf-sway, .leaf-visual, .leaf-gust, .pollen-particle")
      allEls.forEach((el) => gsap.killTweensOf(el))
      leafAnimations.length = 0
      pollenAnimations.length = 0
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {leafCfgs.map((cfg, i) => (
        <div
          key={`leaf-${i}`}
          className="leaf-particle absolute"
          style={{
            left: 0,
            top: 0,
            width: cfg.size,
            height: cfg.size * (ASPECT[cfg.type] ?? 1.4),
            willChange: "transform",
          }}
          data-cfg={i}
        >
          <div
            className="leaf-depth absolute inset-0"
            style={{
              willChange: "transform",
              transform: `scale(${cfg.depthScale})${cfg.rotateX ? ` rotateX(${cfg.rotateX}deg)` : ""}${cfg.rotateY ? ` rotateY(${cfg.rotateY}deg)` : ""}`,
            }}
          >
            <div
              className="leaf-gust absolute inset-0"
              style={{
                willChange: "transform",
              }}
            >
              <div
                className="leaf-sway absolute inset-0"
                style={{
                  willChange: "transform",
                }}
              >
                <div
                  className="leaf-visual absolute inset-0"
                  style={{
                    filter: cfg.blur > 0 ? `blur(${cfg.blur}px)` : undefined,
                    willChange: "transform",
                    transform: `rotate(${cfg.rotation}deg)`,
                  }}
                >
                  {LEAF_TYPES[cfg.type](cfg.leafColor)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {pollenData.map((p, i) => (
        <div
          key={`pollen-${i}`}
          className="pollen-particle absolute rounded-full"
          style={{
            left: 0,
            top: 0,
            width: p.size,
            height: p.size,
            backgroundColor: "rgba(91, 143, 90, 0.3)",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  )
}
