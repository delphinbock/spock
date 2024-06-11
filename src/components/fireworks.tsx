import { memo, FC } from 'react'

/* FIREWORKS */
const Fireworks: FC = memo(() => {
  return (
    <>
      {/* Fireworks animation */}
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
    </>
  )
})

export default Fireworks
