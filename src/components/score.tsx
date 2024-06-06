// React
import { useEffect, useState, memo, Suspense, FC, useCallback, useMemo } from 'react'

// Redux
import { useSelector } from 'react-redux'

// Pu elements in cache package
import { LRUCache } from 'lru-cache'

// Types
import { RootState, ScoreProps } from '../types/main'

// Constants
const imgPath = import.meta.env.VITE_APP_IMG_PATH

// Create LRU cache instance
const imageCache = new LRUCache<string, string>({
  max: 50, // Maximum number of items in the cache
  ttl: 1000 * 60 * 5, // Time to live in milliseconds (e.g., 5 minutes)
})

// Memoized Image Component
const MemoizedImageComponent = memo(({ keyId, keyStr }: { keyId: string; keyStr: string }) => {
  // States
  const [src, setSrc] = useState('')

  // Load base64 image
  const loadImage = useCallback(async () => {
    try {
      // Check cache first
      if (imageCache.has(keyStr)) {
        setSrc(imageCache.get(keyStr) as string)
        return
      }

      // fetch base64 image
      const response = await fetch(`/img/${keyStr}.base64`)
      const base64Image = await response.text()

      // Cache the fetched image
      imageCache.set(keyStr, base64Image)

      // Set state
      setSrc(base64Image)
    } catch (error) {
      console.error(':( Error fetching image:', error)
      setSrc('')
    }
  }, [keyStr])

  // Side effects
  useEffect(() => {
    loadImage()
  }, [loadImage, keyStr, keyId])

  return <img key={`${keyId}_${keyStr}`} src={src} alt={keyStr} className="number" />
})

/* SCORE */
const Score: FC<ScoreProps> = memo(({ imgObj, numbersObj }) => {
  // Destructuring
  const { versus } = imgObj

  // Selectors
  const scorePlayerArr = useSelector((state: RootState) => state.gameElement.scorePlayerArr)
  const scoreComputerArr = useSelector((state: RootState) => state.gameElement.scoreComputerArr)

  const memoizedPlayerScoreComponents = useMemo(
    () =>
      scorePlayerArr.map((element: number, i: string) => {
        const keyStr = numbersObj[element as unknown as keyof typeof numbersObj].value
        return <MemoizedImageComponent key={`${i}_${keyStr}`} keyId={`${i}_${keyStr}`} keyStr={keyStr} />
      }),
    [scorePlayerArr, numbersObj]
  )

  const memoizedComputerScoreComponents = useMemo(
    () =>
      scoreComputerArr.map((element: number, i: string) => {
        const keyStr = numbersObj[element as unknown as keyof typeof numbersObj].value
        return <MemoizedImageComponent key={`${i}_${keyStr}`} keyId={`${i}_${keyStr}`} keyStr={keyStr} />
      }),
    [scoreComputerArr, numbersObj]
  )

  return (
    <div className="score">
      {/* Player side image score */}
      <div>
        <span>You</span>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>{memoizedPlayerScoreComponents}</Suspense>
      </div>
      {/* VS image */}
      <div>
        <img src={`${imgPath}${versus.value}`} alt={versus.name} className="versus" />
      </div>
      {/* Computer side image score */}
      <div>
        <span>Com</span>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>{memoizedComputerScoreComponents}</Suspense>
      </div>
    </div>
  )
})

export default Score
