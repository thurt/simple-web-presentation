import { STATE } from './settings'
import StateChanger from './StateChanger'

/*
 SlideChanger provides functionality to change to a new SLIDE/DOT
 by changing the STATE of the current SLIDE/DOT to INACTIVE and the STATE of the new SLIDE/DOT to ACTIVE
 */
//:: Array<TYPE.SLIDE.ELEMENT> -> Array<TYPE.DOT.ELEMENT> -> number -> <SlideChanger>
const SlideChanger = slides => dots => initialIndex => {
  let i = initialIndex;
  // new_i is valid if it is within index bounds of slides
  const isValid = (new_i) => new_i >=0 && new_i < slides.length
  const publicInterface = {
    next() { publicInterface.goTo(i + 1) },
    prev() { publicInterface.goTo(i - 1) },
    goTo(new_i) {
      if (isValid(new_i)) {
        window.requestAnimationFrame(() => {
          // change STATE to INACTIVE for current SLIDE/DOT
          StateChanger(STATE.INACTIVE)(slides[i], dots[i])

          // change STATE to ACTIVE for new SLIDE/DOT
          StateChanger(STATE.ACTIVE)(slides[new_i], dots[new_i])

          // change current i to new_i
          i = new_i
        })
      }
    }
  }

  return Object.freeze(publicInterface)
}

export default SlideChanger