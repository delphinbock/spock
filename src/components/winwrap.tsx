// React
import { FC } from 'react'

// Types
import { WinWrapProps } from '../types/main'

// Obj
import imgObj from '../../src/objects/imgObj.json'

// Component
import Fireworks from './fireworks'

// Constants
const { win, lose, equality } = imgObj
const { REACT_APP_IMG_PATH } = process.env

const WinWrap: FC<WinWrapProps> = ({ playerObj }) => {
  // Default constants
  const { player1, player2 } = playerObj.fullObj

  return (
    <div className="win">
      {/* Winner */}
      {player1 && !player2 && (
        <>
          <Fireworks />
          <img src={`${REACT_APP_IMG_PATH}${win.value}`} alt={win.name} className="zoomInDown" />
        </>
      )}
      {/* Loser */}
      {!player1 && player2 && (
        <>
          {/* Thunder effect */}
          <div className="overlay"></div>
          {/* You lose image */}
          <img src={`${REACT_APP_IMG_PATH}${lose.value}`} alt={lose.name} className="zoomInDown" />
        </>
      )}
      {/* Equality */}
      {!player1 && !player2 && <img src={`${REACT_APP_IMG_PATH}${equality.value}`} alt={equality.name} className="zoomInDown equality" />}
    </div>
  )
}

export default WinWrap
