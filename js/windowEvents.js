/*
  Adds event listeners to window which will change the current SLIDE by invoking methods on an instance of SlideChanger
 */
export default (SlideChanger) => {
  let touchStart = null

  // changes SLIDE with next and prev keydown events
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.keyCode === '39') SlideChanger.next()
    else if (e.key === 'ArrowLeft' || e.keyCode === '37') SlideChanger.prev()
  })

  // changes SLIDE with swipe left and swipe right
  window.addEventListener('touchstart', (e) => {
    touchStart = e.changedTouches[0].pageX
  })
  window.addEventListener('touchend', (e) => {
    if (touchStart !== null) {
      const release = e.changedTouches[0].pageX
      if (touchStart < release) {
        if (touchStart + 100 < release) SlideChanger.prev()
      }
      else if (touchStart > release) {
        if (touchStart - 100 > release) SlideChanger.next()
      }
      touchStart = null
    }
  })
}