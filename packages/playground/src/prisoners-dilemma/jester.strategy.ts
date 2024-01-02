import { Choice } from './game/choice.js'
import { Strategy } from './game/strategy.js'

export class JesterStrategy extends Strategy {
  override makeChoice(): Choice {
    return Math.random() > 0.1 ? Choice.Cooperate : Choice.Deflect
  }
}
