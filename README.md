# Buckeye Catcher

## What is Buckeye Catcher?
Buckeye Catcher is a coding game aimed at helping grade school students learn the basics of computer science.  Students can learn code through our C4C built coding lanugage that removes any confusing and scary syntax.

## What is the goal of Buckeye Catcher?
The goal of Buckeye Catcher is to create a program or algorithm to move the Brutus Buckeye around the screen to catch the falling buckeyes.

# Documentation

* [Game description](documentation/game_mechanics.md)
* [Language definition](documentation/language.md)
* [Sample code](documentation/sample.md)

Game ends after 30 seconds automatically. Objective is to rack up points, +10 for every good item caught, -5 for every bad item.
Their code should not automatically be in an infinite loop. If they write moveleft and moveright, those two movements will happen and then the basket will sit for the rest of the time.

Easy:
Level 1: bad things fall in one column, good things fall in a different column
Level 2: things still only fall in two columns but both bad and good things can be in same column

Medium:
Level 3: not random but random-looking (it's the same every time you run it but it's multiple different columns) with few bad things
Level 4: just random as originally planned but fewer things are falling

Hard:
Level 5: not random but random-looking (it's the same every time you run it but it's multiple different columns) with LOTS of bad things
Level 6: totes random with lots of things falling