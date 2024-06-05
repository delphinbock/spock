// React
import { FC } from 'react'

// Component
import Score from './score'

/* TITLE */
const Title: FC<{ buttonState: boolean }> = ({ buttonState }) => (
  <div className="title">
    <h2>Rock, Paper, Scissors, Lizard, Spock</h2>
    <Score />
    {!buttonState && <p className="pulseAnimation">Pick an item to play</p>}
  </div>
)

export default Title
