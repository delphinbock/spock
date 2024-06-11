// React
import { FC, memo, useEffect, useState } from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { borderColor } from '../redux/elementsStates'

// Types
import { PlayerObject } from '../types/mainType'

// Obj
import imgObj from '../../src/objs/imgObj.json'

// Lib
import { loadImage } from '../lib/mainLib'

// Constants
const { vs } = imgObj

/* WINNER */
const WinDashboard: FC<{ playerObj: PlayerObject }> = memo(({ playerObj }) => {
  // States
  const [images, setImages] = useState<{ [key: string]: string }>({})

  // Default constants
  const { player, computer } = playerObj
  const { player1, player2 } = playerObj.fullObj

  // Redux
  const dispatch = useDispatch()

  // Set border color div
  useEffect(() => {
    dispatch(borderColor(player1 && !player2 ? 'green' : 'red'))
  }, [dispatch, player1, player2])

  // Player picked item
  const keyStr1: string = imgObj[player as keyof typeof imgObj].value

  // Computer picked item
  const keyStr2: string = imgObj[computer as keyof typeof imgObj].value

  // Load images as base64
  useEffect(() => {
    const loadImages = async () => {
      const imageKeys = [vs, keyStr1, keyStr2]
      const images = await Promise.all(
        imageKeys.map(async (key) => {
          let base64Image
          let imageName
          if (typeof key === 'string') {
            base64Image = await loadImage({ keyStr: key })
            imageName = key // If string, use it directly like a name
          } else {
            base64Image = await loadImage({ keyStr: key.value })
            imageName = key.name // If object ise its property 'name'
          }
          return { [imageName]: base64Image }
        })
      )
      setImages(Object.assign({}, ...images))
    }

    loadImages()
  }, [computer, keyStr1, keyStr2, player])

  return (
    <div className="winner">
      <div>
        <span>Player</span>
        <img src={images[keyStr1]} alt="player" className="tada" loading="lazy" />
      </div>
      <div>
        <img src={images[vs.value]} alt={vs.name} className="bounceIn" loading="lazy" />
      </div>
      <div>
        <span>Computer</span>
        <img src={images[keyStr2]} alt="computer" className="tada" loading="lazy" />
      </div>
    </div>
  )
})

export default WinDashboard
