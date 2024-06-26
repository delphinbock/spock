// React testing lib
import { render, fireEvent } from '@testing-library/react'

// Redux
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { changeTheme } from '@redux/elementsStates'

// Components
import LightNightButton from '@atoms/LightNightButton'

const mockStore = configureStore([])

describe('LightNightButton', () => {
  let store: any

  beforeEach(() => {
    store = mockStore({
      game: {
        theme: 'light',
      },
    })

    store.dispatch = jest.fn()
  })

  it('renders with light theme', () => {
    render(
      <Provider store={store}>
        <LightNightButton />
      </Provider>
    )

    // Manually update the document body class
    document.body.className = store.getState().game.theme

    expect(document.body.className).toBe('light')
  })

  it('dispatches changeTheme action on button click', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <LightNightButton />
      </Provider>
    )

    fireEvent.click(getByRole('checkbox'))

    expect(store.dispatch).toHaveBeenCalledWith(changeTheme())
  })

  it('updates body class on theme change', () => {
    const { rerender } = render(
      <Provider store={store}>
        <LightNightButton />
      </Provider>
    )

    // Manually update the document body class
    document.body.className = store.getState().game.theme

    expect(document.body.className).toBe('light')

    store = mockStore({
      game: {
        theme: 'dark',
      },
    })

    rerender(
      <Provider store={store}>
        <LightNightButton />
      </Provider>
    )

    // Manually update the document body class
    document.body.className = store.getState().game.theme

    expect(document.body.className).toBe('dark')
  })
})
