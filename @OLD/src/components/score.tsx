// React
import { FC } from 'react'

// Redux
import { useSelector } from 'react-redux'

// Types
import { RootState } from '../types/main'

// Obj
import imgObj from '../../src/objects/imgObj.json'
import numbersObj from '../../src/objects/numbersObj.json'

// Constants
const { versus } = imgObj
const { REACT_APP_IMG_PATH } = process.env

/* SCORE */
const Score: FC = () => {
  const scorePlayerArr = useSelector((state: RootState) => state.gameElement.scorePlayerArr)
  const scoreComputerArr = useSelector((state: RootState) => state.gameElement.scoreComputerArr)

  return (
    <div className="score">
      <div>
        <span>You</span>
      </div>
      <div>
        {scorePlayerArr.map((element: number, i: number) => {
          let keyStr = numbersObj[element as unknown as keyof typeof numbersObj].value

          return <img key={`${i}_${keyStr}`} src={`${REACT_APP_IMG_PATH}${keyStr}`} alt="number" className="number" />
        })}
      </div>
      <div>
        <img src={`${REACT_APP_IMG_PATH}${versus.value}`} alt={versus.name} className="versus" />
      </div>
      <div>
        <span>Com</span>
      </div>
      <div>
        {scoreComputerArr.map((element: number, i: number) => {
          let keyStr = numbersObj[element as unknown as keyof typeof numbersObj].value

          return <img key={`${i}_${keyStr}`} src={`${REACT_APP_IMG_PATH}${keyStr}`} alt="number" className="number" />
        })}
      </div>
    </div>
  )
}

export default Score
