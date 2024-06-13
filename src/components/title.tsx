// React
import { FC, memo } from 'react'

// Obj
import imgObj from '../../src/objs/imgObj.json'
import numbersObj from '../../src/objs/numbersObj.json'

// Component
import Score from './score'

/* TITLE */
const Title: FC<{ buttonState?: boolean }> = memo(({ buttonState }) => (
  <div className="title">
    <h2>Rock, Paper, Scissors, Lizard, Spock</h2>
    <Score imgObj={imgObj} numbersObj={numbersObj} />
    {!buttonState && <p className="pulseAnimation">Pick an item to play</p>}
  </div>
))

export default Title
