import { type Points } from './points.js'
import { type Strategy } from './strategy.js'

export class Player {
  protected points = 0

  constructor(public readonly strategy: Strategy) { }

  getPoints(): number {
    return this.points
  }

  addPoints(points: Points): void {
    this.points += points
  }
}
