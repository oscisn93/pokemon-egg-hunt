# Pokemon Egg Hunt

## Problem Statement

There are a lot of Pokemon games and pokemon spin offs but there is little if any Pokemon spin off games that allow for multiple players to play in a single game. This makes these games difficult to emulate and develop in a web environment, and thus isolated to console owners and people running emulators that are not computationally cheap to run.

## Proposal

Pokemon egg hunt would address this by supporting an online multiplayer version of the popular game complete with custom map designs but retaining a lot of the original game features with a unique twist. Rather than a long running solo game, this spinoff would be a short match in which multiple players would find pokemon eggs and then battle each other until only one remains in a king of the hill type game.

## Requirements

The application requires two main components to work: an authoritative server and a game client. The client will be responsible for rendering the game state, recording the player’s keystrokes and sending them to the server as well as listening for incoming keystroke events from the server and syncing the client state accordingly. The server will be responsible for storing the game state and maintaining a message queue of events to send to all the clients as well as validating moves if client states differ from one another. It will also be responsible for authentication and authorization of client connections.

## Specification

In order to maintain a reliable low-latency game experience for all players, the application will use web sockets. Each game client will connect to the server via a web socket, and the server will then keep track of each player’s move based on their socket id. Each websocket message will be an event object which contains the latest keystroke that the player has entered. These will be published to a queue, and the queue will then send the message to all clients (including the client who published it). Once the client receives the message it will then tell the game engine what state to render. Originally it was planned to use the Deno Deploy runtime, however as websockets are unstable in deno deploy, the alternative is to use Node.js (as the codebase is in typescript and thus migration would be straightforward). An added benefit is that in Node.js we can use the uWebsockets.js library which is a library that provides bindings for the highly efficient c++ implementation of websockets, uWebsockets. This will reduce latency concerns compared with the standard nodejs websockets. In order to deploy the application we will utilize fly.io’s free tier.
The application will utilize Turso, which is a distributed version of sqlite that runs on the edge to provide the efficiency of sqlite with the power of the cloud. For authentication purposes, Firebase anonymous authentication will be sufficient and will easily integrate into our nodejs application. The client will utilize a minimalistic frontend with plain javascript, html, and css, along with the kaboom js game engine library. This will ensure that the majority of the client machine’s computing resources are used to render game frames and not for any over-engineered framework’s overhead.
