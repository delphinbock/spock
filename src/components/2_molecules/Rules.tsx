// React
import { FC, memo } from 'react'

// Style
import '@molecules/Rules.scss'

/* RULES */
const Rules: FC = memo(() => {
  return (
    <div className="rules">
      <h2 aria-label="Game Rules" className="rules__title">
        Rules
      </h2>
      <p className="rules__description">
        Each player picks a variable and reveals it at the same time. The winner is the one who defeats the others. In a tie, the process is repeated until a
        winner is found.
      </p>
      <ul className="rules__list">
        <li className="rules__item">Rock crushes Scissors or crushes Lizard</li>
        <li className="rules__item">Scissors cuts Paper or decapitates Lizard</li>
        <li className="rules__item">Paper covers Rock or disproves Spock</li>
        <li className="rules__item">Lizard eats Paper or poisons Spock</li>
        <li className="rules__item">Spock vaporizes Rock or smashes Scissors</li>
      </ul>
    </div>
  )
})

export default Rules
