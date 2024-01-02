import { JesterStrategy } from './jester.strategy.js'
import { RandomStrategy } from './random.strategy.js'
import { StrategyComparator } from './strategy-comparator.js'
import { TitForTatStrategy } from './tit-for-tat.strategy.js'
import { TitForTwoTatsStrategy } from './tit-for-two-tats.strategy.js'
import { UnforgivingStrategy } from './unforgiving.strategy.js'

export function prisonersDilemma() {
  const results = new StrategyComparator()
    .addStrategy(new JesterStrategy())
    .addStrategy(new TitForTatStrategy())
    .addStrategy(new TitForTwoTatsStrategy())
    .addStrategy(new UnforgivingStrategy())
    .addStrategy(new RandomStrategy())
    .compare({
      stopGameWhen(match) {
        return match.length >= 200
      },
      constructComparison({ averageScorePerPlayerPerRound }) {
        return averageScorePerPlayerPerRound
      },
    })

  return results
}
