// React
import { FC, memo, useCallback, useEffect, useState } from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { toggle, winner, incrementPlayerScore, incrementComputerScore } from '@redux/elementsStates'

// Obj
import imgObj from '@objs/imgObj.json'

// Types
import { PlayersData, HandleGameResult } from '@typage/mainType'

// Libs
import { play } from '@libs/playLib'
import { loadImage } from '@libs/mainLib'

// Constants
const { lizard, paper, rock, scissors, spock } = imgObj

/* PICK */
const ItemsPick: FC = memo(() => {
  // States
  const [hoverItem, setHoverItem] = useState<string>('')
  const [images, setImages] = useState<{ [key: string]: string }>({})

  // Redux
  const dispatch = useDispatch()

  // Check if the received value is of type PlayersData
  type IsPlayersData = (value: unknown) => value is PlayersData
  const isPlayersData: IsPlayersData = useCallback((value): value is PlayersData => {
    return typeof value === 'object' && value !== null && 'player1' in value && 'player2' in value && 'item1' in value && 'item2' in value
  }, [])

  // Pick an item and play
  const handleGameResult: HandleGameResult = useCallback(
    ({ players }) => {
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

      return { result: true }
    },
    [dispatch]
  )

  // Display popover on item hover
  const displayPopover = useCallback((element: string) => {
    setHoverItem(element)
  }, [])

  // Pick an item and play
  const pickItemAndPlay = useCallback(
    async (pickedItem: string) => {
      const players = await play({ pickedItem })

      if (isPlayersData(players)) {
        handleGameResult({ players })
      }
    },
    [handleGameResult, isPlayersData]
  )

  // Click on an item
  const handleItemClick = useCallback(
    (pickedItem: string) => {
      pickItemAndPlay(pickedItem)
    },
    [pickItemAndPlay]
  )

  // Hover an item
  const handleItemHover = useCallback(
    (element: string) => {
      displayPopover(element)
    },
    [displayPopover]
  )

  // Load images as base64
  useEffect(() => {
    const loadImages = async () => {
      const imageKeys = [scissors, paper, rock, lizard, spock]
      const images = await Promise.all(
        imageKeys.map(async (key) => {
          const base64Image = await loadImage({ keyStr: key.value })
          return { [key.name]: base64Image }
        })
      )
      setImages(Object.assign({}, ...images))
    }
    loadImages()
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
              onMouseEnter={() => handleItemHover(scissors.name)}
              onMouseLeave={() => handleItemHover('')}
              onClick={() => handleItemClick(scissors.name)}
              src={images[scissors.value]}
              alt={scissors.name}
              loading="lazy"
            />
          </div>
        </div>

        {/* Second row */}
        <div className="second">
          <div className="pulse">
            {hoverItem === paper.name && <span>{hoverItem}</span>}
            <img
              onMouseEnter={() => handleItemHover(paper.name)}
              onMouseLeave={() => handleItemHover('')}
              onClick={() => handleItemClick(paper.name)}
              src={images[paper.value]}
              alt={paper.name}
              loading="lazy"
            />
          </div>
          <div className="pulse">
            {hoverItem === rock.name && <span>{hoverItem}</span>}
            <img
              onMouseEnter={() => handleItemHover(rock.name)}
              onMouseLeave={() => handleItemHover('')}
              onClick={() => handleItemClick(rock.name)}
              src={images[rock.value]}
              alt={rock.name}
              loading="lazy"
            />
          </div>
        </div>

        {/* Third row */}
        <div className="third">
          <div className="pulse">
            {hoverItem === lizard.name && <span>{hoverItem}</span>}
            <img
              onMouseEnter={() => handleItemHover(lizard.name)}
              onMouseLeave={() => handleItemHover('')}
              onClick={() => handleItemClick(lizard.name)}
              src={images[lizard.value]}
              alt={lizard.name}
              loading="lazy"
            />
          </div>
          <div className="pulse">
            {hoverItem === spock.name && <span>{hoverItem}</span>}
            <img
              onMouseEnter={() => handleItemHover(spock.name)}
              onMouseLeave={() => handleItemHover('')}
              onClick={() => handleItemClick(spock.name)}
              src={images[spock.value]}
              alt={spock.name}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  )
})

export default ItemsPick
