import { type Round } from './round.js'

export class Match {
  protected readonly rounds: Round[] = []

  get length(): number {
    return this.rounds.length
  }

  addRound(round: Round): void {
    this.rounds.push(round)
  }

  getRounds(): readonly Round[] {
    return this.rounds
  }

  getLastRound(): Round | null {
    const round = this.rounds.at(-1)

    return round ?? null
  }
}
