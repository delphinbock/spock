// React
import { FC, useCallback } from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { toggle, borderColor } from '../redux/elementsStates'

// Obj
import imgObj from '../../src/objects/imgObj.json'

// Constants
const { replay } = imgObj
const imgPath = import.meta.env.VITE_APP_IMG_PATH

/* BUTTON */
const ReplayButton: FC = () => {
  const dispatch = useDispatch()

  const reset = useCallback(() => {
    dispatch(toggle(false))
    dispatch(borderColor('blue'))
  }, [dispatch])

  return (
    <div className="replay replayButton">
      <img onClick={reset} src={`${imgPath}${replay.value}`} alt={replay.name} />
    </div>
  )
}

export default ReplayButton
