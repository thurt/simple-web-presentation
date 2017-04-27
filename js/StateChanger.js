import { STATE } from './settings'

/*
  StateChanger changes elements to the provided STATE and removes any other previously applied STATE
 */
//:: <STATE> -> (HTMLElement<any>, HTMLElement<any>, ...) -> _
const StateChanger = NEW_STATE => (...elements) => {
  elements.forEach($el => {

    // remove all STATE which is not equal to the NEW_STATE
    for (let name in STATE) {
      if (STATE.hasOwnProperty(name) && STATE[name] !== NEW_STATE) {
        $el.classList.remove(...STATE[name].CLASSES)
      }
    }

    // add the NEW_STATE to the element
    $el.classList.add(...NEW_STATE.CLASSES)
  })
}

export default StateChanger