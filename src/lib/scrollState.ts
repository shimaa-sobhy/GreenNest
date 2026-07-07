let _skipBackNav = false
let _skipBackNavTimer: ReturnType<typeof setTimeout> | null = null

export function markSkipScroll() {
  if (_skipBackNavTimer !== null) clearTimeout(_skipBackNavTimer)
  _skipBackNav = true
  _skipBackNavTimer = setTimeout(() => {
    _skipBackNav = false
    _skipBackNavTimer = null
  }, 10000)
}

export function consumeSkipScroll(): boolean {
  return _skipBackNav
}

export function clearSkipScroll() {
  _skipBackNav = false
  if (_skipBackNavTimer !== null) {
    clearTimeout(_skipBackNavTimer)
    _skipBackNavTimer = null
  }
}
