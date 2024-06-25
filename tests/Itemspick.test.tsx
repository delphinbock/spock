import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import ItemsPick from '@organisms/Itemspick'
import { RootState } from '@/types/mainType'

// Mock du store Redux pour les tests
const mockStore = configureStore([])

// Mock des images
jest.mock('@objs/imgObj.json', () => ({
  lizard: { name: 'lizard', value: 'lizard.png' },
  paper: { name: 'paper', value: 'paper.png' },
  rock: { name: 'rock', value: 'rock.png' },
  scissors: { name: 'scissors', value: 'scissors.png' },
  spock: { name: 'spock', value: 'spock.png' },
}))

// Mock de la fonction loadImage
jest.mock('@libs/mainLib', () => ({
  loadImage: async ({ keyStr }: { keyStr: string }) => `base64_${keyStr}`,
}))

describe('ItemsPick Component', () => {
  it('renders correctly and handles item clicks', async () => {
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

    const { getByAltText, queryByText } = render(
      <Provider store={store}>
        <ItemsPick />
      </Provider>
    )

    // Attendre que les images soient chargées (peut être nécessaire si les images sont asynchrones)
    await waitFor(() => {
      expect(getByAltText('scissors')).toBeInTheDocument()
      expect(getByAltText('paper')).toBeInTheDocument()
      expect(getByAltText('rock')).toBeInTheDocument()
      expect(getByAltText('lizard')).toBeInTheDocument()
      expect(getByAltText('spock')).toBeInTheDocument()
    })

    // Simuler un clic sur un élément
    fireEvent.click(getByAltText('scissors'))

    await waitFor(() => {
      setTimeout(() => {
        expect(queryByText('You picked scissors!')).toBeInTheDocument()
      }, 1000)
    })
  })
})
