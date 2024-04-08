// React
import { FC, useCallback } from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { toggle, borderColor } from '../redux/elementsStates'

// Obj
import imgObj from '../../src/objects/imgObj.json'

// Constants
const { replay } = imgObj
const { REACT_APP_IMG_PATH } = process.env

/* BUTTON */
const ReplayButton: FC = () => {
  const dispatch = useDispatch()

  const reset = useCallback(() => {
    dispatch(toggle(false))
    dispatch(borderColor('blue'))
  }, [dispatch])

  return (
    <div className="replay replayButton">
      <img onClick={reset} src={`${REACT_APP_IMG_PATH}${replay.value}`} alt={replay.name} />
    </div>
  )
}

export default ReplayButton
