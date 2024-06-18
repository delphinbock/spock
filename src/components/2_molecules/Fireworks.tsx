import { memo, FC } from 'react'

// Style
import '@atoms/LightNightButton.scss'

/* FIREWORKS */
const Fireworks: FC = memo(() => {
  return (
    <>
      {/* Fireworks animation */}
      <div className="pyro">
        <div className="pyro__before"></div>
        <div className="pyro__after"></div>
      </div>
    </>
  )
})

export default Fireworks
