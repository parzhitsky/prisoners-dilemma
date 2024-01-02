import { randomChoice } from '@@shared/random/random-choice.js'
import { Choice } from './game/choice.js'
import { Strategy } from './game/strategy.js'

export class RandomStrategy extends Strategy {
  private readonly choices = [
    Choice.Cooperate,
    Choice.Deflect,
  ] as const

  override makeChoice(): Choice {
    return randomChoice(this.choices)
  }
}
