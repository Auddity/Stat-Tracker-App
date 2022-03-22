# Stat Tracker App

This is a current **work in progress**.

update -- 3/22/22 

[Live Site](https://stat-tracker-app.vercel.app/)

## App Function
Keep track of player stats accross multiple sports

Golf(currently under construction): Enter names and keep track of your golf score throughout you're round.

For football: input a players name, position, stat-value, and stat type.  Then display it on screen sorted in order of stat leaders.

Data stored to local storage.

## Purpose
The purpose in building this app is for me to work with vanilla Javascript.  Focusing on inputing data, storing data in local storage, displaying data, and updating data.

It is also an ever expanding project, thus I'm learning to read my own code (remember how it's working) and refactor my code when necessary.

## Current Status
#### Newest updates
Golf Scorecard framework built(mobile view); json file with course data(Maplehurst);

Football bug fix

Created a landing page. Refactored Sass where appropriate.

#### Past updates
Allow half steps on number input & created module for getElement function.

Added Warning Modal for deleting ALL player data.

Background images added, some minor styling to go with it.

## Next Steps
- Populate Yardage, Handicap, & Par from json

- Add success/error message after submission (football).

- Change DOM population from a page reload (football).

- Turn single JS file into modules (partial).

## Future Function & Design Goals
Currently I'm working on golf scores.  Future features will include more sports: Basketball, Baseball.

Build a database to store the data in.

## Misc Notes & Info
Having begun creating a multiple page site/app The below comment on planning is growing more in depth. (2/20/22)

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