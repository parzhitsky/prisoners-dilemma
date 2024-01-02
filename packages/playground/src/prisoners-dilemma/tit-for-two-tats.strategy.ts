import { Choice } from './game/choice.js'
import { Match } from './game/match.js'
import { Strategy } from './game/strategy.js'

export class TitForTwoTatsStrategy extends Strategy {
  override makeChoice(match: Match): Choice {
    const lastOpponentChoices = match.getRounds().slice(-2).map((round) => round.opponentChoice)

    if (lastOpponentChoices[0] === Choice.Deflect && lastOpponentChoices[1] === Choice.Deflect) {
      return Choice.Deflect
    }

    return Choice.Cooperate
  }
}
