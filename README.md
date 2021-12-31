# Stat Tracker App

This is a current **work in progress**.

update --12/31/21 12:05am 
[Live Site](https://stat-tracker-app.vercel.app/)

## App Function
Input a players name, position, stat-value, and stat type.  Then display it on screen sorted in order of stat leaders.
Data stored to local storage.

## Purpose
The purpose in building this app is for me to work with vanilla Javascript.  Focusing on inputing data, storing data in local storage, displaying data, and updating data.

## Current Status
#### Newest update
Replaced Alert with a Modal when all the input fields haven't been filled.

#### Past updates
Formatted the shortand of the stat type. Drops plural if the value is 1.

The same player can show up in different catagories, and each player can be updated in the specific stat catagory regardless of how many catagories they are in.

Stat Leaders - Added the players stat value in descending order.
Refactor to make it easier to read and manage.

## Next Steps
- Change DOM population from a page reload.

- Drop innerHTML for fragment.

- Determine Color Scheme / Find Photo backgrounds

- Add edit individual player functions

## Future Function & Design Goals
Currently I'm working only in football statistics.  Future features will include more sports: Basketball, Baseball, Golf.

If wrong position is entered, edit individual player item, or overwrite upon next stat update?

General editing functions.

Make it look appealing.

## Misc Notes & Info
Formating the stat abbreviation (12/26/21)
- Slice string method, set in it's own function.

Updating a specific stat catagory on a player even though they're in different catagories (12/25/21):
  - The answer was the `find` method inside the update player data function.  It wasn't in the logic, which I had first attempted.

Adding sort function (12/23/21):
  Principle 2 invoked Again.
  - In process of doing this, refactored a lot of the code.
  - Removed attribute node
  - Removed logic steps from eventListener and added it to update Storage function.
    - Find if name exists, if it does map over stored array, update value in player object.
    - otherwise adds a new player.

Adding a position & stat type/catagory (12/18/21):
  - Production Note (Principle 2 invoked): Had to drop `datalist` element.  Couln't get JS functionality working.  I also learned it doesn't work in Safari.
  - Replaced it with a `select` element.  It makes The JS code easier and cleaner.

# Principles
I *try* to keep two specific principles in mind while building this app:

1) Make the requirements less dumb.
2) Delete the part or process
  - If you're not adding things back in, you're not deleting enough.