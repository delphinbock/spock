// React
import { FC } from 'react'

// Redux
import { useSelector } from 'react-redux'

// Components
import LightNightButton from './lightNightButton'
import Title from './title'
import WinDashboard from './windashboard'
import WinWrap from './winwrap'
import ItemsPick from './itemspick'
import Rules from './rules'
import ReplayButton from './replaybutton'

// Style
import '../styles/game.scss'

// Types
import { PlayerObject, RootState } from '../types/main'

/* GAME */
const Game: FC = () => {
  // Get button state, player object, and border color from Redux store
  const buttonState: boolean = useSelector((state: RootState) => state.gameElement.button)
  const playerObj: PlayerObject | null = useSelector((state: RootState) => state.gameElement.winner)
  const borderColor1: string = useSelector((state: RootState) => state.gameElement.borderColor)

  return (
    <div className="container">
      <div className={`centered ${borderColor1}`}>
        {/* Dark or light theme switch button */}
        <LightNightButton />
        {/* Game title */}
        <Title buttonState={buttonState} />

        {/* Winner dashboard if there is a winner */}
        {buttonState && playerObj && <WinDashboard playerObj={playerObj} />}

        <div className="winwrap">
          {/* If game is in progress */}
          {buttonState ? (
            // Display WinWrap component if player object is defined
            playerObj && <WinWrap playerObj={playerObj} />
          ) : (
            // Otherwise, display ItemsPick and Rules components
            <>
              <ItemsPick />
              <Rules />
            </>
          )}
          {/* Display Replay button if game is in progress */}
          {buttonState && <ReplayButton />}
        </div>
      </div>
    </div>
  )
}

export default Game
