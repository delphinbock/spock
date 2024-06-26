import { render, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import WinDashboard from '@organisms/Windashboard'
import { RootState, PlayerObject } from '@typage/mainType'

// Mock du store Redux pour les tests
const mockStore = configureStore([])

// Mock des images
jest.mock('@objs/imgObj.json', () => ({
  vs: { name: 'vs', value: 'vs.png' },
  scissors: { name: 'scissors', value: 'scissors' },
  paper: { name: 'paper', value: 'paper' },
  rock: { name: 'rock', value: 'rock' },
  lizard: { name: 'lizard', value: 'lizard' },
  spock: { name: 'spock', value: 'spock' },
}))

// Mock de la fonction loadImage
jest.mock('@libs/mainLib', () => ({
  loadImage: async ({ keyStr }: { keyStr: string }) => `base64_${keyStr}`,
}))

describe('WinDashboard Component', () => {
  it('renders correctly and updates border color', async () => {
    // Définir l'état initial du store avec toutes les propriétés nécessaires
    const initialState: Partial<RootState> = {
      game: {
        button: false,
        winner: null,
        borderColor: 'blue',
        scorePlayerArr: [0],
        scoreComputerArr: [0],
        theme: 'light',
      },
    }

    // Simuler un objet de joueur pour le test
    const playerObj: PlayerObject = {
      player: 'rock',
      computer: 'paper',
      fullObj: {
        player1: true,
        player2: false,
        item1: 'rock',
        item2: 'paper',
      },
    }

    const store = mockStore(initialState as RootState)

    const { getByAltText } = render(
      <Provider store={store}>
        <WinDashboard playerObj={playerObj} />
      </Provider>
    )

    // Attendre que les images soient chargées
    waitFor(() => {
      expect(getByAltText('rock')).toBeInTheDocument()
      expect(getByAltText('paper')).toBeInTheDocument()
      expect(getByAltText('lizard')).toBeInTheDocument()
      expect(getByAltText('spock')).toBeInTheDocument()
      expect(getByAltText('scissors')).toBeInTheDocument()
      expect(getByAltText('vs')).toBeInTheDocument()
    })
  })
})
