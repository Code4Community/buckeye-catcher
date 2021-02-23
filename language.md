# The Code Thing

## Statements

* moveleft, moveright
* moveto1, moveto2, ...


## Conditions

* rustle - Hear within 1 (make a changeable value) spot
* boom - If they hear a boom that means something bad will fall.  "Hear" within zero spot.
* wind - More likely for apples to fall during wind.

## If/Elif/Else

if cond
statement
statement
end

if cond
statement
statement
elif cond
statement
elif cond
statement
else
statement
end

## For Loops

10 times
(statement or If/Else)
end

times 2
    times 3

    end 2
end 1

parseProg()
{
    parseSeq
}

parseCommand()
{
    String x = arr[index];
    List<Statements> = .....
    switch(x)
    {
        "if":
            parseIf()
        "Integer.parse...."
            parseLoop()
        "
        if statements.contains(x)
            parseStmt()
        default:
            "error"
    }
}
<prog> -> <sequence>
<sequence> -> <command> | <sequence><command>
<command> -> <if> | <statement> | <loop>
<if> -> if <cond> <sequence> end|if <cond> <sequence> else <sequence> end | if<cond><sequence><elif> else <seqeuence>
<elif> -> elif<cond><sequence><elif>|elif<cond><sequence>
<cond> -> rustle | boom | wind | true
<loop> -> <int> times <sequence> end
<int>  -> <digit><int> | <digit>
<digit> -> 0|1.......
<statement> -> moveleft | moveright | skip.......
