# Custom Keyboard Accessory Bar

This sample application contains a component for a custom accessory bar that appears above the onscreen keyboard as shown below.


https://github.com/dtarnawsky/cs-keyboard-accessorybar/assets/84595830/f81dabe1-50f9-43f2-acc9-1080ca2fb2ff

## Caveat

Note: If you use `(mousedown)` in combination with `$event.preventDefault()` and the keyboard was shown using in focused input then on closing the keyboard it will briefly re-show again.

## Bug - Screen Reader
When a screen reader is turned on the button clicks will close the keyboard. They do not appear like they are part of the keyboard
