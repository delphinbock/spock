// React
import { FC, memo, useEffect, useState } from 'react'

// Types
import { WinWrapProps } from '../types/mainType'

// Obj
import imgObj from '../../src/objs/imgObj.json'

// Component
import Fireworks from './fireworks'

// Libs
import { loadImage } from '../lib/mainLib'

// Constants
const { win, lose, equality } = imgObj

const WinWrap: FC<WinWrapProps> = memo(({ playerObj }) => {
  // States
  const [images, setImages] = useState<{ [key: string]: string }>({})

  // Default constants
  const { player1, player2 } = playerObj.fullObj

  // Load images as base64
  useEffect(() => {
    const loadImages = async () => {
      const imageKeys = [lose, win, equality]
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
    <div className="win">
      {/* Winner */}
      {player1 && !player2 && (
        <>
          <Fireworks />
          <img src={images[win.value]} alt={win.name} className="zoomInDown" loading="lazy" />
        </>
      )}
      {/* Loser */}
      {!player1 && player2 && (
        <>
          {/* Thunder effect */}
          <div className="overlay"></div>
          {/* You lose image */}
          <img src={images[lose.value]} alt={lose.name} className="zoomInDown" loading="lazy" />
        </>
      )}
      {/* Equality */}
      {!player1 && !player2 && <img src={images[equality.value]} alt={equality.name} className="zoomInDown equality" loading="lazy" />}
    </div>
  )
})

export default WinWrap
