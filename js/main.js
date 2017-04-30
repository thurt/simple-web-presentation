/*
  When javascript is enabled, this module sets up the application's navigation functionality
 */
import { CONFIG, TYPE, STATE } from './settings'
import SlideChanger from './SlideChanger'
import StateChanger from './StateChanger'
import addWindowEvents from './windowEvents'

/* Domain Functions */

//:: TYPE -> HTMLElement<TYPE.ELEMENT>
const create = (TYPE) => {
  const $el = document.createElement(TYPE.ELEMENT)
  $el.classList.add(...TYPE.CLASSES)
  return $el
}

/* Procedural Processing */

// create the NAV
const $nav = create(TYPE.NAV)
// get ref to the navParent -- the nav will be appended to the navParent once everything is setup
const $navParent = document.querySelector(CONFIG.NAV_PARENT)
// get all SLIDE elements from the current DOM tree and put into an Array
const slides = Array.prototype.slice.call(document.querySelectorAll(TYPE.SLIDE.ELEMENT))
// this array will contain TYPE.DOT.ELEMENT
const dots = []
// create the application's SlideChanger
const mySlideChanger = SlideChanger(slides)(dots)(CONFIG.ACTIVE_SLIDE)

// add various window events which will respond to user i/a by calling mySlideChanger
addWindowEvents(mySlideChanger)

// setup the slide's dot
slides.forEach(($slide, i) => {
  // create a navigation DOT for the SLIDE
  dots[i] = $nav.appendChild(create(TYPE.DOT))
  // add click event listener for the SLIDE's DOT
  dots[i].addEventListener('click', () => mySlideChanger.goTo(i))
})

// these operations affect DOM rendering, so it is wrapped in a single rAF
window.requestAnimationFrame(() => {
  // append the $nav (which contains all of the dots) to the $navParent
  $navParent.appendChild($nav)

  slides.forEach(($slide, i) => {
    $slide.classList.add(...TYPE.SLIDE.CLASSES)
    // set the initial STATE for the SLIDE/DOT
    if (i === CONFIG.ACTIVE_SLIDE) { // make this SLIDE/DOT STATE be initially ACTIVE
      StateChanger(STATE.ACTIVE)($slide, dots[i])
    }
  })
})