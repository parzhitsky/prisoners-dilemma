import { Match } from './match.js'
import { Player } from './player.js'
import { Points } from './points.js'
import { type Strategy } from './strategy.js'

export interface GameStopper {
  (this: unknown, match: Match): boolean
}

/** @private */
interface GamePlayParams {
  readonly stopWhen: GameStopper
}

/** @private */
const enum Winner {
  Player = 'Player',
  Opponent = 'Opponent',
  Draw = 'Draw',
}

export interface GamePlayResult {
  readonly winner: Winner
  readonly totalScore: number
  readonly playerScore: number
  readonly opponentScore: number
  readonly averageScorePerPlayerPerRound: number
}

export class Game {
  protected readonly match = new Match()
  protected readonly player = new Player(this.playerStrategy)
  protected readonly opponent = new Player(this.opponentStrategy)

  constructor(
    private readonly playerStrategy: Strategy,
    private readonly opponentStrategy: Strategy,
  ) {}

  protected playRound(): void {
    const playerChoice = this.player.strategy.makeChoice(this.match)
    const opponentChoice = this.opponent.strategy.makeChoice(this.match)
    const choices = `player ${playerChoice}, opponent ${opponentChoice}` as const

    switch (choices) {
      case 'player Deflect, opponent Deflect':
        this.player.addPoints(Points.Min)
        this.opponent.addPoints(Points.Min)
        break

      case 'player Deflect, opponent Cooperate':
        this.player.addPoints(Points.Max)
        this.opponent.addPoints(Points.None)
        break

      case 'player Cooperate, opponent Deflect':
        this.player.addPoints(Points.None)
        this.opponent.addPoints(Points.Max)
        break

      case 'player Cooperate, opponent Cooperate':
        this.player.addPoints(Points.Mid)
        this.opponent.addPoints(Points.Mid)
        break

      default:
        throw new Error(`Unexpected choices: ${choices}`)
    }

    this.match.addRound({
      playerChoice,
      opponentChoice,
    })
  }

  protected gatherResult(): GamePlayResult {
    const playerScore = this.player.getPoints()
    const opponentScore = this.opponent.getPoints()
    const totalScore = playerScore + opponentScore

    let winner: Winner

    if (playerScore > opponentScore) {
      winner = Winner.Player
    } else if (playerScore < opponentScore) {
      winner = Winner.Opponent
    } else {
      winner = Winner.Draw
    }

    const averageScorePerPlayerPerRound = totalScore / 2 / this.match.length

    return {
      winner,
      totalScore,
      playerScore,
      opponentScore,
      averageScorePerPlayerPerRound,
    }
  }

  play({
    stopWhen: shouldStop,
  }: GamePlayParams): GamePlayResult {
    do { this.playRound() } while (!shouldStop(this.match))

    const result = this.gatherResult()

    return result
  }
}
