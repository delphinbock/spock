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

// Comparison
interface ComparisonProps {
  item1: string;
  item2: string;
}

type ComparisonData = {
  player1: boolean // Indicates if player 1 wins
  item1: string // The item chosen by player 1
  player2: boolean // Indicates if player 2 wins
  item2: string // The item chosen by player 2
}

type Comparison = (props: ComparisonProps) => Promise<ComparisonData>;

// Play
interface PlayProps {
  pickedItem: string;
}

type PlayData = {
  player1: boolean // Indicates if player 1 wins
  item1: string // The item chosen by player 1
  player2: boolean // Indicates if player 2 wins
  item2: string // The item chosen by player 2
}

type Play = (props: PlayProps) => Promise<PlayData>;

// Handle game result
interface HandleGameResultProps {
  players: PlayData;
}

type HandleGameResultData = {
  result: boolean;
}

type HandleGameResult = (props: HandleGameResultProps) => HandleGameResultData;

// Load image
interface LoadImageProps {
  keyStr: string;
}

type LoadImage = (props: LoadImageProps) => Promise<string>;

// Root state
type RootState = {
  gameElement: {
    theme: Theme;
    button: boolean;
    winner: PlayerObject | null;
    borderColor: string;
    scorePlayerArr: number[];
    scoreComputerArr: number[];
  }
}

// Theme
type Theme = {
  light: {
    active: boolean
  }
  dark: {
    active: boolean
  }
}


export type {
  PlayersData,
  PlayerObject,
  WinWrapProps,
  ScoreProps,
  Play,
  Comparison,
  LoadImage,
  HandleGameResult,
  RootState,
  Theme
}