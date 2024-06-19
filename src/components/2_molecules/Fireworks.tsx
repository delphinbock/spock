import { memo, FC } from 'react'

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
