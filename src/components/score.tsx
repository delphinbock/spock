// React
import { useEffect, useState, memo, Suspense, FC, useCallback, useMemo } from 'react'

// Redux
import { useSelector } from 'react-redux'

// Main methods
import { loadImage } from '../../src/lib/mainLib'

// Types
import { RootState, ScoreProps } from '../types/mainType'

// Memoized Image Component
const MemoizedImageComponent = memo(({ keyId, keyStr }: { keyId: string; keyStr: string }) => {
  // States
  const [src, setSrc] = useState('')

  // Load base64 image
  const fetchImage = useCallback(async () => {
    try {
      const base64Image = await loadImage({ keyStr })
      setSrc(base64Image)
    } catch {
      setSrc('')
    }
  }, [keyStr])

  // Side effects
  useEffect(() => {
    fetchImage()
  }, [fetchImage])

  return <img key={`${keyId}_${keyStr}`} src={src} alt={keyStr} className="number" />
})

// VS Image Component
const VSImageComponent = ({ value }: { value: string }) => {
  const [base64Src, setBase64Src] = useState('')

  const fetchImage = useCallback(async () => {
    try {
      const base64Image = await loadImage({ keyStr: value })
      setBase64Src(base64Image)
    } catch {
      setBase64Src('')
    }
  }, [value])

  useEffect(() => {
    fetchImage()
  }, [fetchImage])

  return <img src={base64Src} alt="VS" className="versus" />
}

/* SCORE */
const Score: FC<ScoreProps> = memo(({ imgObj, numbersObj }) => {
  // Destructuring
  const { versus } = imgObj

  // Selectors
  const scorePlayerArr = useSelector((state: RootState) => state.gameElement.scorePlayerArr)
  const scoreComputerArr = useSelector((state: RootState) => state.gameElement.scoreComputerArr)

  const memoizedPlayerScoreComponents = useMemo(
    () =>
      scorePlayerArr.map((element, i) => {
        const keyStr = numbersObj[element as unknown as keyof typeof numbersObj].value
        console.log(keyStr)
        return <MemoizedImageComponent key={`${i}_${keyStr}`} keyId={`${i}_${keyStr}`} keyStr={keyStr} />
      }),
    [scorePlayerArr, numbersObj]
  )

  const memoizedComputerScoreComponents = useMemo(
    () =>
      scoreComputerArr.map((element, i) => {
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
        <Suspense fallback={<div>Loading...</div>}>
          <VSImageComponent value={versus.value} />
        </Suspense>
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
