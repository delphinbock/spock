// Redux
import { useSelector, useDispatch } from 'react-redux'

// Redux slice
import { changeTheme } from '@/redux/elementsStates'

// NPM
import { Helmet } from 'react-helmet'

// Types
import { RootState } from '@/types/mainType'

const LightNightButton = () => {
  const theme = useSelector((state: RootState) => state.game.theme)
  const dispatch = useDispatch()

  const handleToggleTheme = () => {
    dispatch(changeTheme())
  }

  return (
    <>
      <Helmet>
        <body className={theme === 'dark' ? 'dark' : 'light'} />
      </Helmet>
      <div className="lightNightButton">
        <div onClick={handleToggleTheme} className="lightNightButton__buttonCheck">
          <input type="checkbox" className="lightNightButton__buttonCheck--checkbox" readOnly />
          <span className="lightNightButton__buttonCheck--switch-btn"></span>
        </div>
      </div>
    </>
  )
}

export default LightNightButton
