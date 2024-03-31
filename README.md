# Pokemon Egg Hunt

## Description

A multiplayer 2D Pokemon-themed easter egg hunt browser game. 

## Breakdown

A game consists of a match. Any player can create a match, but at least two players 
must be present and both must have indicated their readiness before the match begins.
Each player must then search the map for one or more of the hidden Pokemon eggs.
Eggs can be hidden anywhere that items are hidden in the Pokemon game.
The total amount of eggs will be 3n, where n is the number of players.
The max number of players per round will be 6 (For now).
However the entirety of all Pokemon will be potentially in any given egg.
Once all eggs are found the players who have not found any eggs immediately lose.
Remaining players must walk in order to hatch their eggs as in the original pokemon game.
Once at least two players have at least one hatched pokemon, they may challenge each other to battles.
If a player loses a battle they lose that pokemon.
A player who has no more pokemon loses the game.
The last remaining player loses the round.

## Implementation Details

The sprites for the game will come from the Pokemon API. We will cache as much as possible.
Considerable effort should go into gathering the map assets and creating at least one amazing map.
Consider using P5, Three, or even the Canvas API to render the game.
Consider using Go, Deno, or the Firebase Realtime Database for realtime server state management.

