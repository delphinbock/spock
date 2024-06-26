import { render, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Title from '@molecules/Title'
import { RootState } from '@/types/mainType'

// Mock du store Redux pour les tests
const mockStore = configureStore([])

// Mock du composant Score pour éviter les erreurs de cache
jest.mock('@molecules/Score', () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-score">Mocked Score Component</div>,
}))

describe('Title Component', () => {
  it('renders correctly with buttonState true', async () => {
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

    const store = mockStore(initialState as RootState)

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Title buttonState={true} />
      </Provider>
    )

    // Attendez que les éléments spécifiés soient rendus
    waitFor(
      () => {
        expect(getByText('Rock, Paper, Scissors, Lizard, Spock')).toBeInTheDocument()
        expect(getByText('You')).toBeInTheDocument()
        expect(getByText('Com')).toBeInTheDocument()
        expect(queryByText('Pick an item to play')).toBeNull()
      },
      { timeout: 5000 }
    )
  })
})
