# Stat Tracker App

This is a current **work in progress**.

update --12/22/21 5:50pm
[Live Site](https://stat-tracker-app.vercel.app/)

## App Function
Input a players name, position, stat-value, and stat type.  Then display it on screen sorted in order of stat leaders.

## Purpose
The purpose in building this app is for me to work with vanilla Javascript.  Focusing on inputing data, storing data in local storage, displaying data, and updating data.

## Current Status
#### Newest update
Refactor to make it easier to read and manage.

#### Past updates
Most simple UI, four values can be entered.
It can submit, store, and display.  
  - Input a new name and have it added to DOM & Storage & Displayed in the correct catagory.
  - Can input a name already existing and update DOM & Storage.


## Next Steps
- Sorting function

- Need the same player to show up in different catagories. e.g. a running back can have both rushing and receiving yards.
  - Likely to change key in storage, to multiple keys based on catagory

- change DOM population from a page reload.

- drop plural if value is 1, add plural if value is > 1

- Drop innerHTML for fragment.

## Future Function & Design Goals
Currently I'm working only in football statistics.  Future features will include more sports: Basketball, Baseball, Golf.

If wrong position is entered, edit individual player item, or overwrite upon next stat update?

General editing functions.

Make it look appealing.

## Misc Notes & Info
Adding sort function (12/22/21):
  - In process of doing this, refactored a lot of the code.
  - Removed logic steps from eventListener
  - Removed logic steps from adding to DOM function, renamed it to updateDOM because that's all it does now.
  - Removed attribute node
  - Critical logic now takes place in updating the player data function.
    - Find if name exists, if it does map over stored array, update value in player object.
    - otherwise adds a new player.

Adding a position & stat type/catagory (12/18/21):
  - Production Note (Principle 2 invoked): Had to drop `datalist` element.  Couln't get JS functionality working.  I also learned it doesn't work in Safari.
  - Replaced it with a `select` element.  It makes The JS code easier and cleaner.

### Principles
I *try* to keep two specific principles in mind while building this app:

1) Make the requirements less dumb
2) Delete the part or process
  - If you're not adding things back in, you're not deleting enough.