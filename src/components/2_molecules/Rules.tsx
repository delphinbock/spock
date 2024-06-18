// React
import { FC, memo } from 'react'

/* RULES */
const Rules: FC = memo(() => {
  return (
    <div className="rules">
      <h2 aria-label="Game Rules">Rules</h2>
      <p>
        Each player picks a variable and reveals it at the same time. The winner is the one who defeats the others. In a tie, the process is repeated until a
        winner is found.
      </p>
      <ul>
        <li>Rock crushes Scissors or crushes Lizard</li>
        <li>Scissors cuts Paper or decapitates Lizard</li>
        <li>Paper covers Rock or disproves Spock</li>
        <li>Lizard eats Paper or poisons Spock</li>
        <li>Spock vaporizes Rock or smashes Scissors</li>
      </ul>
    </div>
  )
})

export default Rules
