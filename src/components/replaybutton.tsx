// React
import { FC, memo, useCallback, useEffect, useState } from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { toggle, borderColor } from '../redux/elementsStates'

// Obj
import imgObj from '../../src/objs/imgObj.json'

// Constants
const { replay } = imgObj

// Libs
import { loadImage } from '../lib/mainLib'

/* BUTTON */
const ReplayButton: FC = memo(() => {
  // redux
  const dispatch = useDispatch()

  // States
  const [images, setImages] = useState<{ [key: string]: string }>({})

  const reset = useCallback(() => {
    dispatch(toggle(false))
    dispatch(borderColor('blue'))
  }, [dispatch])

  // Load images as base64
  useEffect(() => {
    const loadImages = async () => {
      const imageKeys = [replay]
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
    <div className="replay replayButton">
      <img onClick={reset} src={images[replay.value]} alt={replay.name} />
    </div>
  )
})

export default ReplayButton
