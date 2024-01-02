import { Game, GameStopper, type GamePlayResult } from './game/game.js'
import { type Strategy } from './game/strategy.js'

/** @private */
interface ComparisonCreator<Comparison> {
  (gamePlayResult: GamePlayResult): Comparison
}

/** @private */
interface CompareParams<Comparison> {
  readonly stopGameWhen: GameStopper
  readonly constructComparison?: ComparisonCreator<Comparison>
}

/** @private */
interface CompareResultsForStrategy<Comparison> {
  [opponentStrategyName: string]: Comparison
}

export interface CompareResults<Comparison> {
  [playerStrategyName: string]: CompareResultsForStrategy<Comparison>
}

export class StrategyComparator {
  protected readonly strategies = new Set<Strategy>()
  protected readonly strategyConstructors = new Set<typeof Strategy>()

  addStrategy(strategy: Strategy): this {
    const strategyConstructor = strategy.constructor as new () => Strategy

    if (!this.strategyConstructors.has(strategyConstructor)) {
      this.strategies.add(strategy)
      this.strategyConstructors.add(strategyConstructor)
    }

    return this
  }

  compare<Comparison>({
    stopGameWhen: shouldStopGame,
    constructComparison = (gamePlayResult) => gamePlayResult as Comparison,
  }: CompareParams<Comparison>): CompareResults<Comparison> {
    const resultsAll: CompareResults<Comparison> = Object.create(null)

    for (const playerStrategy of this.strategies) {
      const resultsOne: CompareResultsForStrategy<Comparison> = Object.create(null)

      for (const opponentStrategy of this.strategies) {
        const game = new Game(playerStrategy, opponentStrategy)
        const result = game.play({ stopWhen: shouldStopGame })
        const comparison = constructComparison(result)

        resultsOne[opponentStrategy.name] = comparison
      }

      resultsAll[playerStrategy.name] = resultsOne
    }

    return resultsAll
  }
}
