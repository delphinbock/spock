// @ts-ignore
import React from 'react'
import { render, act, RenderResult } from '@testing-library/react'
import { Provider } from 'react-redux'
import axios from 'axios'
import store from '../src/redux/store'
import App from '../src/components/5_pages/App'
import { loadImage } from '../src/libs/mainLib'

jest.mock('axios')

describe('App Component', () => {
  let getByText: (text: string) => HTMLElement
  let renderResult: RenderResult | undefined

  beforeEach(() => {
    // Clear any previous mock implementation for axios
    jest.clearAllMocks()
  })

  test(':) Renders the App component', async () => {
    // Mock the axios response for your test case
    const mockResponse = {
      data: 'mockBase64Image',
    }
    ;(axios.get as jest.Mock).mockResolvedValue(mockResponse)

    // Render your component with Redux Provider
    await act(async () => {
      renderResult = render(
        <Provider store={store}>
          <App />
        </Provider>
      )
    })

    // Ensure that renderResult is defined before using it
    if (!renderResult) {
      throw new Error('renderResult is undefined')
    }

    getByText = renderResult.getByText

    // Ensure that your component renders properly
    expect(getByText('Rock, Paper, Scissors, Lizard, Spock')).toBeInTheDocument()

    // Simulate the async operation (loading an image in your case)
    await act(async () => {
      try {
        // Call loadImage function
        await loadImage({ keyStr: '/img/versus.base64' })
      } catch (error) {
        // Handle the error
        console.error(':( Error fetching image:', error)
      }
    })

    // Example: Check if loadImage function was called with correct parameters
    expect(axios.get).toHaveBeenCalledWith('/img/versus.base64')
  })
})
