# Stat Tracker App

This is a current **work in progress**.

update -- 10/24/2022 3:50PM

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
- Fetch stored players and add to DOM on page load

- Converted TeeBox from text to option

- Populated Yardage, Handicap, & Par from `json`

- Added specified class names to cells for API data population

- Fix Tee Box Value in Constructor

#### Past updates
- Fix Hole Numbering (golf)

- Input and display Golfers names.

- JS module for Alert messages

- Created a landing page. Refactored Sass where appropriate.

## Next Steps
- Calculate Imported Yardage & Par Totals, Display

- Calculate score inputs and display Totals

- When getting golfers from storage
  - ask for new foursome?
  - have ability to search and get golfers data then add it to the DOM?  
  - Add new player?

- Add success/error message after submission (football).
- Change DOM population from a page reload (football).
  - bottom will fix the top.

- Turn single JS file into modules (partial).

## Future Function & Design Goals
Currently I'm working on golf scores.  Future features will include more sports: Basketball, Baseball.

Build a database to store the data in.

## Misc Production Notes & Info 
I had to remember that when using modules, that the aysnc function that is exported must be set to await, when inside another async function that populates the data received from the api module. (10/21/22)

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