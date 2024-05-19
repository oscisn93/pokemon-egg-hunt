import {loadAssets} from './config';
import {forestScene, homeScene, loseScene} from './scenes';
import {Game} from './game'
import type { KaboomCtx } from 'kaboom';

export class World implements Game {
  constructor(engine: KaboomCtx) {
    loadAssets(engine.loadSprite);
    engine.scene('home', () => homeScene());
    engine.scene('forest', () => forestScene());
    engine.scene('lose', () => loseScene());
    engine.go('home');
  }
  public actions(state: { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; }): { type: string; data: any; }[] {
    throw new Error('Method not implemented.');
  }
  public result(state: { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; }, move: { type: string; data: any; }): { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; } {
    throw new Error('Method not implemented.');
  }
  public utility(state: { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; }, player: number): number {
    throw new Error('Method not implemented.');
  }
  public terminal(state: { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; }): boolean {
    throw new Error('Method not implemented.');
  }
  public to_move(state: { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; }): number {
    throw new Error('Method not implemented.');
  }
  public display(state: { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; }): void {
    throw new Error('Method not implemented.');
  }
  public play(players: (state: { to_move: number; utility: number; board: string[]; moves: { type: string; data: any; }[]; }) => { type: string; data: any; }): void {
    throw new Error('Method not implemented.');
  }
}