let _skipNext = false

export function markSkipScroll() {
  _skipNext = true
}

export function consumeSkipScroll(): boolean {
  if (_skipNext) {
    _skipNext = false
    return true
  }
  return false
}
