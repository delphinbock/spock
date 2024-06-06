// Types
type RootState = {
  gameElement: any
}

type PlayersData = {
  player1: boolean
  player2: boolean
  item1: string
  item2: string
}

type PlayerObject = {
  fullObj: PlayersData
  player: string
  computer: string
}

type WinWrapProps = {
  playerObj: PlayerObject
}

type ScoreProps = {
  imgObj: {
    scissors: { name: string, value: string },
    paper: { name: string, value: string },
    rock: { name: string, value: string },
    lizard: { name: string, value: string },
    spock: { name: string, value: string },
    replay: { name: string, value: string },
    vs: { name: string, value: string },
    win: { name: string, value: string },
    lose: { name: string, value: string },
    equality: { name: string, value: string },
    thunder: { name: string, value: string },
    versus: { name: string, value: string }
  },
  numbersObj: {
    [key: string]: { value: string }
  }
}

export type {
  RootState, PlayersData, PlayerObject, WinWrapProps, ScoreProps
}