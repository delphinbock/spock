// Types
import { Comparison, Play } from "../types/mainType"

// Function to compare two items and determine the winner
const comparison: Comparison = async ({ item1, item2 }) => {
  // Define the rules of the game
  const rules: Record<string, string[]> = {
    scissors: ['paper', 'lizard'],
    paper: ['rock', 'spock'],
    rock: ['lizard', 'scissors'],
    lizard: ['paper', 'spock'],
    spock: ['rock', 'scissors']
  }

  // If both players choose the same item, it's a tie
  if (item1 === item2) {
    return { player1: false, item1, player2: false, item2 }
  }

  // If item1 beats item2 based on the rules, player 1 wins
  if (rules[item1].includes(item2)) {
    return { player1: true, item1, player2: false, item2 }
  }

  // Otherwise, player 2 wins
  return { player1: false, item1, player2: true, item2 }
}

const play: Play = async ({ pickedItem }) => {
  // Array of possible choices
  const items = ['scissors', 'paper', 'rock', 'lizard', 'spock']

  // Randomly select an item for the computer
  const randomItem = items[Math.floor(Math.random() * items.length)]

  // Call the comparison function to determine the result
  return comparison({ item1: pickedItem, item2: randomItem })
}

export { comparison, play }
