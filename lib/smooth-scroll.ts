/**
 * Smooth scroll utility with easing for silky smooth transitions
 */

type EasingFunction = (t: number) => number

// Easing function for smooth, natural-feeling scroll
const easeInOutCubic: EasingFunction = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

interface SmoothScrollOptions {
  duration?: number
  offset?: number
  easing?: EasingFunction
}

export function smoothScrollTo(
  elementId: string,
  options: SmoothScrollOptions = {}
): void {
  const { duration = 1000, offset = 0, easing = easeInOutCubic } = options

  const element = document.getElementById(elementId)
  if (!element) return

  const startPosition = window.pageYOffset
  const elementPosition = element.getBoundingClientRect().top
  const targetPosition = startPosition + elementPosition - offset

  let startTime: number | null = null

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easing(progress)

    window.scrollTo(0, startPosition + (targetPosition - startPosition) * easedProgress)

    if (elapsed < duration) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

/**
 * Handle anchor link clicks with smooth scrolling
 */
export function handleSmoothScroll(
  e: React.MouseEvent<HTMLAnchorElement>,
  options: SmoothScrollOptions = {}
): void {
  const href = e.currentTarget.getAttribute("href")
  if (!href || !href.startsWith("#")) return

  e.preventDefault()
  const elementId = href.slice(1)
  smoothScrollTo(elementId, options)
}

/**
 * Smooth scroll to top of the page
 */
export function scrollToTop(options: Omit<SmoothScrollOptions, 'offset'> = {}): void {
  const { duration = 1000, easing = easeInOutCubic } = options

  const startPosition = window.pageYOffset
  const targetPosition = 0

  if (startPosition === 0) return

  let startTime: number | null = null

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easing(progress)

    window.scrollTo(0, startPosition * (1 - easedProgress))

    if (elapsed < duration) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}
