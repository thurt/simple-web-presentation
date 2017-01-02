import { STATE } from './settings'

/*
  StateChanger thanges elements to the provided STATE and removes any other previously applied STATE
 */
//:: <STATE> -> (HTMLElement<any>, HTMLElement<any>, ...) -> _
const StateChanger = NEW_STATE => (...elements) => {
  elements.forEach($el => {

    // remove any STATE which is not the NEW_STATE
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