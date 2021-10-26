# Language

## Formal Definition

```
<prog> -> <sequence>
<sequence> -> <command> | <sequence><command>
<command> -> <if> | <statement> | <loop> | <infinite>
<if> -> if <cond> <sequence> end | if <cond> <sequence> else <sequence> end | if <cond> <sequence> <elif> else <sequence> end
<elif> -> elif <cond> <sequence> <elif> | elif <cond> <sequence>
<cond> -> rustle | boom | wind | true
<loop> -> <int> times <sequence> end
<infinite> -> forever <sequence> end
<int>  -> <digit><int> | <digit>
<digit> -> 0|...|9
<statement> -> moveleft | moveright | skip
```

## Informal Description

### Statements

* moveleft, moveright

### Conditions

* rustle - Hear within 1 (make a changeable value) spot.
* boom - If they hear a boom that means something bad will fall.  "Hear" within zero spot.
* wind - More likely for apples to fall during wind.
* true / false

### If/Elif/Else

```
if condition
    ...
elif condition
    ...
else
    ...
end
```

### Loops

```
10 times
    ...
end
```

```
forever
    ...
end
```
