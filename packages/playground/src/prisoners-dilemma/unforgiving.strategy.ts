import { Choice } from './game/choice.js'
import { Match } from './game/match.js'
import { Strategy } from './game/strategy.js'

export class UnforgivingStrategy extends Strategy {
  protected treasonDetected = false

  override makeChoice(match: Match): Choice {
    if (this.treasonDetected) {
      return Choice.Deflect
    }

    const lastRound = match.getLastRound()

    if (lastRound?.opponentChoice === Choice.Deflect) {
      this.treasonDetected = true
      return Choice.Deflect
    }

    return Choice.Cooperate
  }
}
