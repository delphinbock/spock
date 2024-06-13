// React
// @ts-ignore
import React from 'react'

// Components
import App from '../src/components/app'

// Redux
import { Provider } from 'react-redux'
import store from '../src/redux/store'

// Testing
import { render } from '@testing-library/react'
import { expect } from '@jest/globals'

test(':) Renders the Redux App component', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(getByText('Paper covers Rock or disproves Spock')).toBeInTheDocument()
})
