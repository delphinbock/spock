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

export type {
    RootState, PlayersData, PlayerObject, WinWrapProps
}