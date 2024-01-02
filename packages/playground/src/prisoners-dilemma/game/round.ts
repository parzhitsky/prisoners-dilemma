import { Choice } from './choice.js'

export interface Round {
  readonly playerChoice: Choice
  readonly opponentChoice: Choice
}
