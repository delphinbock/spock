// Comparisons
export async function comparison(item1: string, item2: string) {
  return new Promise(async (resolve: any, reject) => {
    try {
      // Comparisons
      if (
        (item1 === "scissors" && item2 === "paper") ||
        (item1 === "scissors" && item2 === "lizard") ||
        (item1 === "paper" && item2 === "rock") ||
        (item1 === "paper" && item2 === "spock") ||
        (item1 === "rock" && item2 === "lizard") ||
        (item1 === "rock" && item2 === "scissors") ||
        (item1 === "lizard" && item2 === "paper") ||
        (item1 === "lizard" && item2 === "spock") ||
        (item1 === "spock" && item2 === "rock") ||
        (item1 === "spock" && item2 === "scissors")
      ) {
        resolve({ player1: true, item1: item1, player2: false, item2: item2 });
      } else if (
        (item1 === "scissors" && item2 === "scissors") ||
        (item1 === "paper" && item2 === "paper") ||
        (item1 === "rock" && item2 === "rock") ||
        (item1 === "lizard" && item2 === "lizard") ||
        (item1 === "spock" && item2 === "spock")
      ) {
        resolve({ player1: false, item1: item1, player2: false, item2: item2 });
      } else {
        resolve({ player1: false, item1: item1, player2: true, item2: item2 });
      }
    } catch (error) {
      reject(console.log);
    }
  });
}

// Play
export async function play(pickedItem: string) {
  return new Promise(async (resolve, reject) => {
    try {
      // Items
      const items = ["scissors", "paper", "rock", "lizard", "spock"];

      // Generate a random item
      let randomItem = items[Math.floor(Math.random() * items.length)];

      // Select the winner
      const winner = await comparison(pickedItem, randomItem);

      resolve(winner);
    } catch (error) {
      reject(console.log);
    }
  });
}
