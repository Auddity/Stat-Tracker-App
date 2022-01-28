# Stat Tracker App

This is a current **work in progress**.

update -- 1/28/21 12:02pm EST

[Live Site](https://stat-tracker-app.vercel.app/)

## App Function
Input a players name, position, stat-value, and stat type.  Then display it on screen sorted in order of stat leaders.

Data stored to local storage.

## Purpose
The purpose in building this app is for me to work with vanilla Javascript.  Focusing on inputing data, storing data in local storage, displaying data, and updating data.

## Current Status
#### Newest updates
Delete individual player fixed.

Can now edit an individual players data. (still bug testing)

#### Past updates
Delete individual player added.

Edit player modal added.

Sanitized inputs. No direct innerHTML.

Replaced Alert with a Modal when all the input fields haven't been filled.

## Next Steps
- Bug test edit fuction
  - Issue: second time updating a player in a catagory the info overwrites other players in that catagory.

- Add success/error message

- Allow floats (sacks stat)

- Change DOM population from a page reload.

- Determine Color Scheme / Find Photo backgrounds

- Build database so as to not rely on Local Storage

## Future Function & Design Goals
Currently I'm working only in football statistics.  Future features will include more sports: Basketball, Baseball, Golf.

Make it look appealing.

## Misc Notes & Info
Planning is important, but how do you plan when you don't know what's needed?  -  By going through this project step by step I've learned of things that are necessary that I wouldn't of otherwise thought of.

To display corresponding players in edit modal (1/5/2022)
- Used filter method on the array of player objects.
- Added data-* to edit button which corresponds with desired stat unit.
- That data id passed as parameter into display edit modal function.

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