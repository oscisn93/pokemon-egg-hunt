# Pokemon Egg Hunt

## Description

A multiplayer 2D Pokemon-themed easter egg hunt browser game.

## Breakdown

A game consists of a match. Any player can create a match, but at least two
players must be present and both must have indicated their readiness before the
match begins. Each player must then search the map for one or more of the hidden
Pokemon eggs. Eggs can be hidden anywhere that items are hidden in the Pokemon
game. The total amount of eggs will be 3n, where n is the number of players. The
max number of players per round will be 6 (For now). However the entirety of all
Pokemon will be potentially in any given egg. Once all eggs are found the
players who have not found any eggs immediately lose. Remaining players must
walk in order to hatch their eggs as in the original pokemon game. Once at least
two players have at least one hatched pokemon, they may challenge each other to
battles. If a player loses a battle they lose that pokemon. A player who has no
more pokemon loses the game. The last remaining player loses the round.

## Implementation

### Platform

The application will be deployed using the Deno Deploy serverless environment.
It will consist of a standalone Deno server that handles the user sessions, 
match creation, and maintains the game state up to date via websockets. The data for each game/match will be stored in a kv store until the game is over.
However user information will persist between matches and even sessions.

### Client

The basis of the client is the kaboom game engine module. In this application
the engine will receive all it's updates from the server. That means our game state client module will not need to maintain a copy of the state but merely to call the engine api fucntions that correspond with the validated state updates from the server. The way it will work is the engine will listen for keyboard events via event handlers. the handlers will then send a realtime update to via the socket connection. Everytime the socket server receives a new
update it will broadcast that to each client so that the map updates with all
state updates and not just the player's.
However before a player can play they must register. This involves making a
username and password. Once a user logs in a session token will be set

## Server


### Application Architecture Diagram

The diagram below demonstrates the architecture from multiple levels:

![arch-diagram](/public/image.png)

## References:

- https://core.ac.uk/download/pdf/38103454.pdf
