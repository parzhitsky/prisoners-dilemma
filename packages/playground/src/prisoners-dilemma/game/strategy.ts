import { Choice } from './choice.js';
import { type Match } from './match.js'

export abstract class Strategy {
  public readonly name = this.constructor.name

  abstract makeChoice(match: Match): Choice
}
