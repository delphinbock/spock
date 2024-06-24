import { render, waitFor } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Score from '@molecules/Score'
import { RootState, ScoreProps } from '@typage/mainType'
import axios from 'axios'

// Mock du store Redux
const mockStore = configureStore([])

// Moquer axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Score Component', () => {
  let store: any
  let initialState: Partial<RootState>

  beforeEach(() => {
    initialState = {
      game: {
        button: false,
        winner: null,
        borderColor: 'blue',
        scorePlayerArr: [0],
        scoreComputerArr: [0],
        theme: 'light',
      },
    }

    store = mockStore(initialState)
  })

  it('renders player and computer scores correctly', async () => {
    const imgObj: ScoreProps['imgObj'] = {
      scissors: { name: 'scissors', value: 'scissors' },
      paper: { name: 'paper', value: 'paper' },
      rock: { name: 'rock', value: 'rock' },
      lizard: { name: 'lizard', value: 'lizard' },
      spock: { name: 'spock', value: 'spock' },
      replay: { name: 'replay', value: 'replay' },
      vs: { name: 'vs', value: 'vs' },
      win: { name: 'win', value: 'win' },
      lose: { name: 'lose', value: 'lose' },
      equality: { name: 'equality', value: 'equality' },
      thunder: { name: 'thunder', value: 'thunder' },
      versus: { name: 'versus', value: 'versus' },
    }

    const numbersObj = {
      '0': { value: '0' },
      '1': { value: '1' },
      '2': { value: '2' },
      '3': { value: '3' },
      '4': { value: '4' },
      '5': { value: '5' },
      '6': { value: '6' },
      '7': { value: '7' },
      '8': { value: '8' },
      '9': { value: '9' },
    }

    mockedAxios.get.mockResolvedValue({ data: 'base64ImageString' })

    // Rendu du composant Score avec le store mocké et les données simulées
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <Score imgObj={imgObj} numbersObj={numbersObj} />
      </Provider>
    )

    // Vérification du rendu des scores des joueurs et de l'ordinateur
    expect(getByText('You')).toBeInTheDocument()
    expect(getByText('Com')).toBeInTheDocument()

    // Vérification du rendu de l'image VS
    await waitFor(() => {
      const vsImageSelected = document.querySelectorAll('.score__versus')
      expect(vsImageSelected[0]).toHaveAttribute('src')
      const vsImage = getByAltText('VS')
      expect(vsImage).toBeInTheDocument()
    })

    await waitFor(() => {
      // Vérification des images du score pour le joueur et l'ordinateur
      const playerScoreImages = document.querySelectorAll('.score img')
      expect(playerScoreImages[0]).toHaveAttribute('src')
      expect(playerScoreImages[1]).toHaveAttribute('src')
    })
  })
})
