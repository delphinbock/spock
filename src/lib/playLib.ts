// Comparisons
type ComparisonParams = {
  item1: string
  item2: string
}

type ComparisonResult = {
  player1: boolean
  item1: string
  player2: boolean
  item2: string
}

const comparison: ComparisonFunction = async ({ item1, item2 }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        (item1 === 'scissors' && item2 === 'paper') ||
        (item1 === 'scissors' && item2 === 'lizard') ||
        (item1 === 'paper' && item2 === 'rock') ||
        (item1 === 'paper' && item2 === 'spock') ||
        (item1 === 'rock' && item2 === 'lizard') ||
        (item1 === 'rock' && item2 === 'scissors') ||
        (item1 === 'lizard' && item2 === 'paper') ||
        (item1 === 'lizard' && item2 === 'spock') ||
        (item1 === 'spock' && item2 === 'rock') ||
        (item1 === 'spock' && item2 === 'scissors')
      ) {
        resolve({ player1: true, item1, player2: false, item2 })
      } else if (
        (item1 === 'scissors' && item2 === 'scissors') ||
        (item1 === 'paper' && item2 === 'paper') ||
        (item1 === 'rock' && item2 === 'rock') ||
        (item1 === 'lizard' && item2 === 'lizard') ||
        (item1 === 'spock' && item2 === 'spock')
      ) {
        resolve({ player1: false, item1, player2: false, item2 })
      } else {
        resolve({ player1: false, item1, player2: true, item2 })
      }
    } catch (error) {
      reject(console.log('error', error))
    }
  })
}

// Play
type ComparisonFunction = (params: ComparisonParams) => Promise<ComparisonResult>

type PlayFunction = (pickedItem: string) => Promise<ComparisonResult>

const play: PlayFunction = async (pickedItem) => {
  return new Promise(async (resolve, reject) => {
    try {
      const items = ['scissors', 'paper', 'rock', 'lizard', 'spock']
      let randomItem = items[Math.floor(Math.random() * items.length)]
      const winner = await comparison({ item1: pickedItem, item2: randomItem })
      resolve(winner)
    } catch (error) {
      reject(console.log('error', error))
    }
  })
}

export { comparison, play }
