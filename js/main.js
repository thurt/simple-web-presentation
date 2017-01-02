/*
  This module sets up the application's navigation functionality
 */
import { CONFIG, TYPE, STATE } from './settings'
import SlideChanger from './SlideChanger'
import StateChanger from './StateChanger'
import addWindowEvents from './windowEvents'

/* Domain Functions */
//:: <TYPE> -> HTMLElement<TYPE.ELEMENT>
const create = (TYPE) => {
  const $el = document.createElement(TYPE.ELEMENT)
  $el.classList.add(...TYPE.CLASSES)
  return $el
}
//:: <SlideChanger> -> ((HTMLElement<TYPE.SLIDE.ELEMENT>, number) -> _)
const initSlideDot = (SlideChanger) => ($slide, i) => {
  // add base class to the SLIDE
  $slide.classList.add(...TYPE.SLIDE.CLASSES)

  // create a navigation DOT for the SLIDE
  dots.push($nav.appendChild(create(TYPE.DOT)))

  // add click event listener for the SLIDE's DOT
  dots[i].addEventListener('click', () => SlideChanger.goTo(i))

  // set the initial STATE for the SLIDE/DOT
  if (i === CONFIG.ACTIVE_SLIDE) { // make this SLIDE/DOT STATE be initially ACTIVE
    StateChanger(STATE.ACTIVE)(slides[i], dots[i])
  } else { // make this SLIDE/DOT STATE be initially INACTIVE
    StateChanger(STATE.INACTIVE)(slides[i], dots[i])
  }
}

/* Procedural Processing */
// create the NAV
const $nav = create(TYPE.NAV)
// get all SLIDE elements from the current DOM tree and put into an Array
const slides = Array.prototype.slice.call(document.querySelectorAll(TYPE.SLIDE.ELEMENT))
// this array will contain TYPE.DOT.ELEMENT
const dots = []
// create the application's SlideChanger
const mySlideChanger = SlideChanger(slides)(dots)(CONFIG.ACTIVE_SLIDE)
// initialize each SLIDE with mySlideChanger in scope
slides.forEach(initSlideDot(mySlideChanger))
// add various window events which will respond to user i/a by calling mySlideChanger
addWindowEvents(mySlideChanger)
// append NAV to the NAV_PARENT
document.querySelector(CONFIG.NAV_PARENT).appendChild($nav)