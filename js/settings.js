// general configuration for the initial application state
export const CONFIG = {
  NAV_PARENT: 'body', // query selector for finding the parent element where the nav will be appended
  // which SLIDE/DOT to initially set as STATE ACTIVE (this is a 0-based index number).
  // all other SLIDE/DOTs will initially have STATE INACTIVE.
  ACTIVE_SLIDE: 0,
}

// A STATE is applied to a SLIDE/DOT, and a SLIDE/DOT only has one STATE at a time
export const STATE = {
  ACTIVE: {
    CLASSES: ['active'] // these classes are applied to a SLIDE/DOT when that group is ACTIVE STATE
  },
  INACTIVE: {
    CLASSES: ['inactive'] // these classes are applied to a SLIDE/DOT when that group is INACTIVE STATE
  }
}

// A TYPE refers to an important application element
export const TYPE = {
  // NAV is a parent element of DOTS.
  // There is only one NAV and it is present on all SLIDES.
  NAV: {
    ELEMENT: 'nav',
    CLASSES: ['nav']
  },
  // A DOT is a button/link which navigates to a particular SLIDE.
  // Only one DOT/SLIDE combo can be active at one time.
  DOT: {
    ELEMENT: 'span',
    CLASSES: ['dot']
  },
  // A SLIDE contains a related group of information as described in presentation-data.json
  // Only one DOT/SLIDE combo can be active at one time.
  SLIDE: {
    // note: if you change SLIDE.ELEMENT, you must change it in index.html.handlebars as well
    // because sections are created in the handlebars file by default
    ELEMENT: 'section',
    CLASSES: ['slide']
  }
}
