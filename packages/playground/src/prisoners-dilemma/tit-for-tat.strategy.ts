import { Choice } from './game/choice.js'
import { Match } from './game/match.js'
import { Strategy } from './game/strategy.js'

export class TitForTatStrategy extends Strategy {
  override makeChoice(match: Match): Choice {
    const lastRound = match.getLastRound()

    return lastRound?.opponentChoice ?? Choice.Cooperate
  }
}
