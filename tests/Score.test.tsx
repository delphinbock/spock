import { render } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Score from '@molecules/Score' // Chemin vers votre composant Score
import { RootState, ScoreProps } from '@typage/mainType' // Assurez-vous d'ajuster le chemin si nécessaire

// Mock du store Redux
const mockStore = configureStore([])

describe('Score Component', () => {
  let store: any // Type pour le mock store
  let initialState: RootState // Type pour l'état initial

  beforeEach(() => {
    initialState = {
      game: {
        theme: 'default',
        button: true,
        winner: null,
        borderColor: '#000',
        scorePlayerArr: [1, 2, 3], // Exemple de données
        scoreComputerArr: [4, 5, 6], // Exemple de données
      },
    }

    store = mockStore(initialState)
  })

  it('renders player and computer scores correctly', () => {
    // Données factices pour imgObj et numbersObj
    const imgObj: ScoreProps['imgObj'] = {
      scissors: { name: 'Scissors', value: 'scissors_image_url' },
      paper: { name: 'Paper', value: 'paper_image_url' },
      rock: { name: 'Rock', value: 'rock_image_url' },
      lizard: { name: 'Lizard', value: 'lizard_image_url' }, // Ajout de toutes les propriétés nécessaires
      spock: { name: 'Spock', value: 'spock_image_url' },
      replay: { name: 'Replay', value: 'replay_image_url' },
      vs: { name: 'VS', value: 'vs_image_url' },
      win: { name: 'Win', value: 'win_image_url' },
      lose: { name: 'Lose', value: 'lose_image_url' },
      equality: { name: 'Equality', value: 'equality_image_url' },
      thunder: { name: 'Thunder', value: 'thunder_image_url' },
      versus: { name: 'Versus', value: 'versus_image_url' },
    }

    const numbersObj = {
      1: { value: 'one' },
      2: { value: 'two' },
      3: { value: 'three' },
      // ... autres valeurs nécessaires pour numbersObj
    }

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
    const vsImage = getByAltText('VS')
    expect(vsImage).toBeInTheDocument()
    expect(vsImage.getAttribute('src')).toEqual('vs_image_url')

    // Vérification du nombre d'images de score pour le joueur et l'ordinateur
    const playerScoreImages = document.querySelectorAll('.score__number')
    expect(playerScoreImages.length).toEqual(3) // Adapté à vos données d'exemple

    const computerScoreImages = document.querySelectorAll('.score__number')
    expect(computerScoreImages.length).toEqual(3) // Adapté à vos données d'exemple
  })
})
