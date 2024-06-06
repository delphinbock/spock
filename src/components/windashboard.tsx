// React
import { FC, useEffect } from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { borderColor } from '../redux/elementsStates'

// Types
import { PlayerObject } from '../types/main'

// Obj
import imgObj from '../../src/objects/imgObj.json'

// Constants
const { vs } = imgObj
const imgPath = import.meta.env.VITE_APP_IMG_PATH

/* WINNER */
const WinDashboard: FC<{ playerObj: PlayerObject }> = ({ playerObj }) => {
  // Default constants
  const { player, computer } = playerObj
  const { player1, player2 } = playerObj.fullObj

  // Redux
  const dispatch = useDispatch()

  useEffect(() => {
    // Set border color div
    dispatch(borderColor(player1 && !player2 ? 'green' : 'red'))
  }, [dispatch, player1, player2])

  // Player picked item
  let keyStr1: string = imgObj[player as keyof typeof imgObj].value

  // Computer picked item
  let keyStr2: string = imgObj[computer as keyof typeof imgObj].value

  return (
    <div className="winner">
      <div>
        <span>Player</span>
        <img src={`${imgPath}${keyStr1}`} alt="player" className="tada" />
      </div>
      <div>
        <img src={`${imgPath}${vs.value}`} alt={vs.name} className="bounceIn" />
      </div>
      <div>
        <span>Computer</span>
        <img src={`${imgPath}${keyStr2}`} alt="computer" className="tada" />
      </div>
    </div>
  )
}

export default WinDashboard
