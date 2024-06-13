// React
// @ts-ignore
import React from 'react'

// Redux
import { Provider } from 'react-redux'

// Testing
import { render } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import '@testing-library/jest-dom/jest-globals'
import { expect } from '@jest/globals'

// Components
import Game from '../src/components/game'
import LightNightButton from '../src/components/lightNightButton'
import ItemsPick from '../src/components/itemspick'
import ReplayButton from '../src/components/replaybutton'
import Rules from '../src/components/rules'
import Title from '../src/components/title'
import WinDashboard from '../src/components/windashboard'
import WinWrap from '../src/components/winwrap'

// Mocks
jest.mock('../src/components/lightNightButton', () => () => <LightNightButton />)
jest.mock('../src/components/title', () => () => <Title buttonState={true} />)
jest.mock('../src/components/windashboard', () => () => (
  <WinDashboard
    playerObj={{
      fullObj: {
        player1: true,
        player2: true,
        item1: '',
        item2: '',
      },
      player: '',
      computer: '',
    }}
  />
))
jest.mock('../src/components/winwrap', () => () => (
  <WinWrap
    playerObj={{
      fullObj: {
        player1: true,
        player2: true,
        item1: '',
        item2: '',
      },
      player: '',
      computer: '',
    }}
  />
))
jest.mock('../src/components/itemspick', () => () => <ItemsPick />)
jest.mock('../src/components/rules', () => () => <Rules />)
jest.mock('../src/components/replaybutton', () => () => <ReplayButton />)

// Mock Redux store
const mockStore = configureStore([])

describe('Game Component', () => {
  let store: any

  beforeEach(() => {
    store = mockStore({
      gameElement: {
        button: true,
        winner: null,
        borderColor: 'red',
      },
    })
  })

  // test('should render correctly without a winner', () => {
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <Game />
  //     </Provider>
  //   )

  //   expect(getByText('LightNightButton')).toBeInTheDocument()
  //   expect(getByText('Title')).toBeInTheDocument()
  //   expect(getByText('ItemsPick')).toBeInTheDocument()
  //   expect(getByText('Rules')).toBeInTheDocument()
  // })

  test('should render correctly with a winner', () => {
    store = mockStore({
      gameElement: {
        button: true,
        winner: { name: 'Player1' },
        borderColor: 'green',
      },
    })

    const { getByText } = render(
      <Provider store={store}>
        <Game />
      </Provider>
    )

    expect(getByText('LightNightButton')).toBeInTheDocument()
    // expect(getByText('Title')).toBeInTheDocument()
    // expect(getByText('WinDashboard')).toBeInTheDocument()
    // expect(getByText('WinWrap')).toBeInTheDocument()
    // expect(getByText('ReplayButton')).toBeInTheDocument()
  })
})
