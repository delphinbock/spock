// Redux
import { useSelector, useDispatch } from 'react-redux'

// Redux slice
import { changeTheme } from '@/redux/elementsStates'

// NPM
import { Helmet } from 'react-helmet'

// CSS
import '@atoms/LightNightButton.scss'

// Types
import { RootState, Theme } from '@/types/mainType'

// Button component
const LightNightButton = () => {
  // Read score from redux store
  const theme: Theme = useSelector((state: RootState) => state.gameElement.theme)

  // Redux actions dispatching
  const dispatch = useDispatch()

  // Change the color theme
  const toggleTheme = () => {
    const activeTheme = theme?.dark?.active ?? false
    dispatch(changeTheme(activeTheme ? 'light' : 'dark'))
  }

  return (
    <>
      {theme?.dark?.active ? (
        <Helmet>
          <body data-first="true" />
        </Helmet>
      ) : (
        <Helmet>
          <body data-second="true" />
        </Helmet>
      )}
      <div className="lightNightButton">
        <div onClick={() => toggleTheme()} className="button-check" id="button-check">
          <input type="checkbox" className="checkbox" />
          <span className="switch-btn"></span>
          <span className="layer"></span>
        </div>
      </div>
    </>
  )
}

export default LightNightButton
