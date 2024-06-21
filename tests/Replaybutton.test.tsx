// replayButton.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import ReplayButton from '@atoms/Replaybutton'
import { toggle, borderColor } from '@/redux/elementsStates'
import * as mainLib from '@/libs/mainLib'

jest.mock('@/libs/mainLib', () => ({
  ...jest.requireActual('@/libs/mainLib'),
  loadImage: jest.fn(),
}))

jest.mock('@/objs/imgObj.json', () => ({
  replay: {
    name: 'replay',
    value: 'replay-value',
  },
}))

describe('ReplayButton', () => {
  const mockStore = configureStore<unknown>()
  let store: MockStoreEnhanced<unknown, {}>

  beforeEach(() => {
    store = mockStore({})
    ;(mainLib.loadImage as jest.Mock).mockResolvedValue('data:image/png;base64,imagedata')
  })

  it('should render ReplayButton and load images', async () => {
    render(
      <Provider store={store}>
        <ReplayButton />
      </Provider>
    )

    await waitFor(
      () => {
        const imgElement = screen.getByAltText('replay')
        expect(imgElement).toBeInTheDocument()
      },
      { timeout: 10000 }
    )
  })

  it('should dispatch actions when image is clicked', async () => {
    render(
      <Provider store={store}>
        <ReplayButton />
      </Provider>
    )

    const imgElement = await waitFor(() => screen.getByAltText('replay'))
    fireEvent.click(imgElement)

    const actions = store.getActions()
    expect(actions).toEqual([toggle(false), borderColor('blue')])
  })
})
