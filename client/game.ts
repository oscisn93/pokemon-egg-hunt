type Move = {
  type: string;
  data: any;
};

type GameState = {
  to_move: number;
  utility: number;
  board: string[];
  moves: Move[];
};

export abstract class Game {
  public abstract actions(state: GameState): Move[];
  public abstract result(state: GameState, move: Move): GameState;
  public abstract utility(state: GameState, player: number): number;
  public abstract terminal(state: GameState): boolean;
  public abstract to_move(state: GameState): number;
  public abstract display(state: GameState): void;
  public abstract play(players: (state: GameState) => Move): void;
}

function minimax_decision(state: GameState, game: Game): Move {
  const player = game.to_move(state);
  function max_value(state: GameState): number {
    if (game.terminal(state)) {
      return game.utility(state, player);
    }
    let v = -Infinity;
    for (const action of game.actions(state)) {
      v = Math.max(v, min_value(game.result(state, action)));
    }
    return v;
  }

  function min_value(state: GameState): number {
    if (game.terminal(state)) {
      return game.utility(state, player);
    }
    let v = Infinity;
    for (const action of game.actions(state)) {
      v = Math.min(v, max_value(game.result(state, action)));
    }
    return v;
  }

  return game.actions(state).reduce((a, b) => {
    return min_value(game.result(state, a)) < min_value(game.result(state, b)) ? a : b;
  });
}

export function minimax_player(game: Game, state: GameState): Move {
  return minimax_decision(state, game);
}

