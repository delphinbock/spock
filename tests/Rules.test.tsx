// React testing lib
import { render } from '@testing-library/react'

// Component
import Rules from '@molecules/Rules'

describe('Rules component', () => {
  it('renders correctly', () => {
    const { container } = render(<Rules />)
    expect(container.querySelector('.rules')).toBeInTheDocument()
    expect(container.querySelector('.rules__title')).toBeInTheDocument()
    expect(container.querySelector('.rules__description')).toBeInTheDocument()
    expect(container.querySelector('.rules__list')).toBeInTheDocument()
  })

  it('has the correct title', () => {
    const { getByText } = render(<Rules />)
    expect(getByText('Rules')).toBeInTheDocument()
  })

  it('has the correct description', () => {
    const { getByText } = render(<Rules />)
    expect(
      getByText(
        'Each player picks a variable and reveals it at the same time. The winner is the one who defeats the others. In a tie, the process is repeated until a winner is found.'
      )
    ).toBeInTheDocument()
  })

  it('has the correct list items', () => {
    const { getAllByText } = render(<Rules />)
    expect(getAllByText('Rock crushes Scissors or crushes Lizard')).toHaveLength(1)
    expect(getAllByText('Scissors cuts Paper or decapitates Lizard')).toHaveLength(1)
    expect(getAllByText('Paper covers Rock or disproves Spock')).toHaveLength(1)
    expect(getAllByText('Lizard eats Paper or poisons Spock')).toHaveLength(1)
    expect(getAllByText('Spock vaporizes Rock or smashes Scissors')).toHaveLength(1)
  })
})
