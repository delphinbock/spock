// React
// @ts-ignore
import React from 'react'

// Components
import App from '../src/components/app'

// Testing
import { render } from '@testing-library/react'

test(':) Renders the App component', () => {
  const { getByText } = render(<App />)

  expect(getByText('Paper covers Rock or disproves Spock')).toBeInTheDocument()
})
