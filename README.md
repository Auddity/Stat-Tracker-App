# Stat Tracker App

This is a current **work in progress**.

update --12/18/21 12:13pm
[Working Page](https://stat-tracker-app.vercel.app/)

## App Function
Input a players name, position, stat-value, and stat type.  Then display it on screen sorted in order of stat leaders.

## Purpose
The purpose in building this app is for me to work with vanilla Javascript.  Focusing on inputing data, storing data in local storage, displaying data, and updating data.

## Current Status
Most simple UI, four values can be entered.
It can submit, store, and display.  
  - Input a new name and have it added to DOM & Storage & Displayed in the correct catagory.
  - Can input a name already existing and update DOM & Storage (no edit button)

### Next Steps
- Sorting displayed players in correct order of highest to lowest stat value

## Future Function & Design Goals
Currently I'm working only in football statistics.  Future features will include more sports: Basketball, Baseball, Golf.

If wrong position is entered, edit individual player item, or overwrite upon next stat update?

General editing functions

Make it look appealing.

## Misc Notes & Info
Adding a position & stat type Productin Note:
  - Production Note (Principle 2 invoked): Had to drop `datalist` element.  Couln't get JS functionality working.  I also learned it doesn't work in Safari.
  - Replaced it with a `select` element.  It makes The JS code easier and cleaner.

### Principles
I *try* to keep two specific principles in mind while building this app:

1) Make the requirements less dumb
2) Delete the part or process
  - If you're not adding things back in, you're not deleting enough.