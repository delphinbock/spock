// React
import { FC, useCallback, useState } from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { toggle, winner, incrementPlayerScore, incrementComputerScore } from '../redux/elementsStates'

// Obj
import imgObj from '../../src/objects/imgObj.json'

// Types
import { PlayersData } from '../types/main'

// Components
import { play } from '../lib/playLib'

// Constants
const { lizard, paper, rock, scissors, spock } = imgObj
const { REACT_APP_IMG_PATH } = process.env

/* PICK */
const ItemsPick: FC = () => {
  // States
  const [hoverItem, setHoverItem] = useState<string>('')

  // Redux
  const dispatch = useDispatch()

  // Function to check if the received value is of type PlayersData
  type IsPlayersDataFunction = (value: PlayersData) => value is PlayersData
  const isPlayersData: IsPlayersDataFunction = useCallback((value): value is PlayersData => {
    if (typeof value === 'object' && value !== null && 'player1' in value && 'player2' in value && 'item1' in value && 'item2' in value) {
      return true
    }
    return false
  }, [])

  // Function to pick an item and play
  type PickFunction = (pickedItem: string) => Promise<boolean>
  const pick: PickFunction = useCallback(
    async (pickedItem: string) => {
      const players = await play(pickedItem)

      if (isPlayersData(players)) {
        // Default constants
        const { player1, player2, item1, item2 } = players

        // Increment player score if player1 wins
        if (player1 && !player2) {
          dispatch(incrementPlayerScore())
        }

        // Increment computer score if player2 wins
        if (!player1 && player2) {
          dispatch(incrementComputerScore())
        }

        // Dispatch winner action
        dispatch(
          winner({
            player: item1,
            computer: item2,
            fullObj: players,
          })
        )

        // Toggle button state to show result
        dispatch(toggle(true))

        return true
      } else {
        return false
      }
    },
    [dispatch, isPlayersData]
  )

  // Function to display popover on item hover
  const displayPopover = useCallback((element: string) => {
    setHoverItem(element)
  }, [])

  return (
    <>
      {/* Items List */}
      <div className="list">
        {/* First row */}
        <div className="first">
          <div className="pulse">
            {hoverItem === scissors.name && <span>{hoverItem}</span>}
            <img
              onMouseEnter={() => displayPopover(scissors.name)}
              onMouseLeave={() => displayPopover('')}
              onClick={() => pick(scissors.name)}
              src={`${REACT_APP_IMG_PATH}${scissors.value}`}
              alt={scissors.name}
            />
          </div>
        </div>

        {/* Second row */}
        <div className="second">
          <div className="pulse">
            {hoverItem === paper.name && <span>{hoverItem}</span>}
            <img
              onMouseEnter={() => displayPopover(paper.name)}
              onMouseLeave={() => displayPopover('')}
              onClick={() => pick(paper.name)}
              src={`${REACT_APP_IMG_PATH}${paper.value}`}
              alt={paper.name}
            />
          </div>
          <div className="pulse">
            {hoverItem === rock.name && <span>{hoverItem}</span>}
            <img
              onMouseEnter={() => displayPopover(rock.name)}
              onMouseLeave={() => displayPopover('')}
              onClick={() => pick(rock.name)}
              src={`${REACT_APP_IMG_PATH}${rock.value}`}
              alt={rock.name}
            />
          </div>
        </div>

        {/* Third row */}
        <div className="third">
          <div className="pulse">
            {hoverItem === lizard.name && <span>{hoverItem}</span>}
            <img
              onMouseEnter={() => displayPopover(lizard.name)}
              onMouseLeave={() => displayPopover('')}
              onClick={() => pick(lizard.name)}
              src={`${REACT_APP_IMG_PATH}${lizard.value}`}
              alt={lizard.name}
            />
          </div>
          <div className="pulse">
            {hoverItem === spock.name && <span>{hoverItem}</span>}
            <img
              onMouseEnter={() => displayPopover(spock.name)}
              onMouseLeave={() => displayPopover('')}
              onClick={() => pick(spock.name)}
              src={`${REACT_APP_IMG_PATH}${spock.value}`}
              alt={spock.name}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemsPick
