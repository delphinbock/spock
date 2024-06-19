// React
import { FC, memo } from 'react'

// Redux
import { useSelector } from 'react-redux'

// Components
import LightNightButton from '@atoms/LightNightButton'
import Title from '@molecules/Title'
import WinDashboard from '@organisms/Windashboard'
import WinWrap from '@organisms/Winwrap'
import ItemsPick from '@organisms/Itemspick'
import Rules from '@molecules/Rules'
import ReplayButton from '@atoms/Replaybutton'

// Types
import { PlayerObject, RootState } from '@typage/mainType'

/* GAME */
const Game: FC = memo(() => {
  // Get button state, player object, and border color from Redux store
  const buttonState: boolean = useSelector((state: RootState) => state.gameElement.button)
  const playerObj: PlayerObject | null = useSelector((state: RootState) => state.gameElement.winner)
  const borderColor: string = useSelector((state: RootState) => state.gameElement.borderColor)

  return (
    <div className="mainGameContainer">
      <div className={`mainGameContainer__centered mainGameContainer__centered--${borderColor}`}>
        {/* Dark or light theme switch button */}
        <LightNightButton />

        {/* Game title */}
        <Title buttonState={buttonState} />

        {/* Winner dashboard if there is a winner */}
        {buttonState && playerObj && <WinDashboard playerObj={playerObj} />}

        <div>
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
})

export default Game
