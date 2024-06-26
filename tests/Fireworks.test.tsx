// React testing lib
import { render } from '@testing-library/react'

// Component
import Fireworks from '@molecules/Fireworks'

describe('Fireworks component', () => {
  it('renders correctly', () => {
    const { container } = render(<Fireworks />)
    expect(container.querySelector('.pyro')).toBeInTheDocument()
    expect(container.querySelector('.pyro__before')).toBeInTheDocument()
    expect(container.querySelector('.pyro__after')).toBeInTheDocument()
  })

  it('has the correct CSS classes', () => {
    const { container } = render(<Fireworks />)
    expect(container.querySelector('.pyro')).toHaveClass('pyro')
    expect(container.querySelector('.pyro__before')).toHaveClass('pyro__before')
    expect(container.querySelector('.pyro__after')).toHaveClass('pyro__after')
  })
})
