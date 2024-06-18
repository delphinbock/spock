// React
import { FC, memo } from 'react'

// Obj
import imgObj from '@objs/imgObj.json'
import numbersObj from '@objs/numbersObj.json'

// Component
import Score from '@molecules/Score'

// Style
import '@molecules/Title.scss'

/* TITLE */
const Title: FC<{ buttonState?: boolean }> = memo(({ buttonState }) => (
  <div className="title">
    <h2>Rock, Paper, Scissors, Lizard, Spock</h2>
    <Score imgObj={imgObj} numbersObj={numbersObj} />
    {!buttonState && <p className="title--pulseAnimation">Pick an item to play</p>}
  </div>
))

export default Title
