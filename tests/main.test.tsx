// @ts-ignore
import React from 'react'
import { render, act, RenderResult } from '@testing-library/react'
import { Provider } from 'react-redux'
import axios from 'axios'
import store from '../src/redux/store'
import App from '../src/components/5_pages/App'
import { loadImage } from '../src/libs/mainLib'

jest.mock('axios')
jest.mock('../src/lib/mainLib', () => ({
  loadImage: jest.fn(),
}))

describe('App Component', () => {
  let getByText: (text: string) => HTMLElement
  let renderResult: RenderResult

  beforeEach(async () => {
    const mockResponse = {
      data: 'mockBase64Image',
    }
    ;(axios.get as jest.Mock).mockResolvedValue(mockResponse)

    await act(async () => {
      renderResult = render(
        <Provider store={store}>
          <App />
        </Provider>
      )
    })

    getByText = renderResult.getByText
  })

  test('Renders the Redux App component', async () => {
    expect(getByText('Paper covers Rock or disproves Spock')).toBeInTheDocument()

    // Simulate the async operation (loading an image in your case)
    await act(async () => {
      // Mock Axios to simulate a network error
      (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'))

      try {
        await loadImage({ keyStr: '/img/versus.base64' })
      } catch (error) {
        // Handle the error
        console.error(':( Error fetching image:', error)
      }
    })

    // Example: Check if loadImage function was called
    expect(loadImage).toHaveBeenCalledWith({ keyStr: '/img/versus.base64' })

    // Add your additional assertions or checks here
  })
})
