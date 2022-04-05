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

---

Making the game display smaller.

Change "skip" to "stay".

Change it so that the game continues even after code ends (basket continues to just "stay").

Add high score system. The points increase each level (level 1 is like 10/-5 whereas level 2 is like 20/-10 or something).

If they catch every good thing they get a bonus. Also for avoiding every bad thing. Maybe like a big "Perfect" bonus. Could add multipliers for consecutive successes.

Cheer and boo. Have visual indicators (something popping up from bottom). When Brutus pokes his head out, a buckeye will be in that column 1 second later. The word "boo" for Michigan logo.

Need more conditions in order to use more than one column.

What if you die after like 3 Michigans?

Make things fall at a constant speed. Maybe make things only fall once every two seconds.

Store code and high scores in local storage.

Level | Description | Learning Objective
-|-|-
1 | One column of good things and one column of bad things. | Learn how to move to a spot and stay.
2 | One column. Loop good thing followed by a bad thing. | Learn how to loop at correct frequency.
3 | Two columns. Each column alternates good and bad (and the columns drop different objects at the same time, so one will drop
    good and one will drop bad at the same time).
4 | One column. Loop 2 good things followed by a bad thing. | Same.
5 | One column. Loop a good thing followed by 2 bad things. | Same.
6 | One column. Random good or bad. | Learn how to use if statements.
FINAL | Random every column. | Same.

---

## Contribution Policy
This project is closed to outside contributions while it is in active development.
