// React
import { FC, memo, useEffect, useState } from 'react'

// Types
import { WinWrapProps } from '@typage/mainType'

// Obj
import imgObj from '@objs/imgObj.json'

// Component
import Fireworks from '@molecules/Fireworks'

// Libs
import { loadImage } from '@libs/mainLib'

// Constants
const { win, lose, equality, thunder } = imgObj

const WinWrap: FC<WinWrapProps> = memo(({ playerObj }) => {
  // States
  const [images, setImages] = useState<{ [key: string]: string }>({})

  // Default constants
  const { player1 = '', player2 = '' } = playerObj.fullObj || {}

  // Load images as base64
  useEffect(() => {
    const loadImages = async () => {
      const imageKeys = [lose, win, equality, thunder]
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
          <img src={images[win.value]} alt={win.name} className="zoomInDown resultImg" loading="lazy" />
        </>
      )}
      {/* Loser */}
      {!player1 && player2 && (
        <>
          {/* Thunder effect */}
          <div className="overlay">
            <img src={images[thunder.value]} alt={thunder.name} loading="lazy" />
          </div>
          {/* You lose image */}
          <img src={images[lose.value]} alt={lose.name} className="zoomInDown resultImg" loading="lazy" />
        </>
      )}
      {/* Equality */}
      {!player1 && !player2 && <img src={images[equality.value]} alt={equality.name} className="zoomInDown equality" loading="lazy" />}
    </div>
  )
})

export default WinWrap
