# Stat Tracker App

This is a current **work in progress**.

update -- 4/6/2022 11:56AM

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
- Fix Hole Numbering (golf)

- JS module for Alert messages

- Input and display Golfers names.

- Golf Scorecard framework built(mobile view); `json` file with course data(Maplehurst);

#### Past updates
- Created a landing page. Refactored Sass where appropriate.

- Allow half steps on number input & created module for getElement function.

- Added Warning Modal for deleting ALL player data.

## Next Steps
- Populate Yardage, Handicap, & Par from `json`

- Add success/error message after submission (football).
- Change DOM population from a page reload (football).
  - bottom will fix the top.

- Turn single JS file into modules (partial).

## Future Function & Design Goals
Currently I'm working on golf scores.  Future features will include more sports: Basketball, Baseball.

Build a database to store the data in.

## Misc Production Notes & Info 
Something I thought would be simple turned out to be tricky.  Input a name and display it, when all are full have a warning say the foursome is full.  
  - I started with a regular `for..of` loop, but 'full' warning popped up even if just one display was full.
  - Having done a bunch of freeCodeCamp challenges recently that used the `every` method.
  - Giving it a try the method is used on the array as a conditional. If condition satified 'full' comes up. If it's not we loop and enter the names. (3/28/22)

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