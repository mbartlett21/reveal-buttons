# Reveal Buttons
Adds a reveal effect to buttons.

## Use Instructions

1. Add `reveal.css` to the header.
2. Add `reveal.js` to the body, just before the closing tag (it will add a reveal effect to all buttons currently initialised; call the `revealReloadElements()` function to update the buttons using the reveal effect)

## Used variables + functions

The functions and variables below are used by the script; please do not edit them in any javascript you have on your page.

`handleFirstTab` - Adds a white outline when the user tabs.
`handleMouseDownOnce` - Handles when the mouse is pressed and removes the outline.

`revealElements` - The elements that have a reveal effect.
`revealReloadElements` - Reloads elements for reveal.
`revealUpdateDisplay` - Called when the mouse is moved.
`revealClearDisplay` - Called when the mouse moves out of the window
