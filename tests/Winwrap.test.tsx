import { render, waitFor } from '@testing-library/react'
import WinWrap from '@organisms/Winwrap'
import { WinWrapProps } from '@typage/mainType'

// Mock des images
jest.mock('@objs/imgObj.json', () => ({
  win: { name: 'win', value: 'win.png' },
  lose: { name: 'lose', value: 'lose.png' },
  equality: { name: 'equality', value: 'equality.png' },
  thunder: { name: 'thunder', value: 'thunder.png' },
}))

// Mock de la fonction loadImage
jest.mock('@libs/mainLib', () => ({
  loadImage: async ({ keyStr }: { keyStr: string }) => `base64_${keyStr}`,
}))

describe('WinWrap Component', () => {
  it('renders correctly based on playerObj props', async () => {
    // Définir les props pour simuler les différents états du composant
    const player1WinProps: WinWrapProps = {
      playerObj: {
        player: 'rock',
        computer: 'scissors',
        fullObj: { player1: true, player2: false, item1: 'rock', item2: 'scissors' },
      },
    }

    const player2WinProps: WinWrapProps = {
      playerObj: {
        player: 'rock',
        computer: 'paper',
        fullObj: { player1: false, player2: true, item1: 'rock', item2: 'paper' },
      },
    }

    const equalityProps: WinWrapProps = {
      playerObj: {
        player: 'rock',
        computer: 'rock',
        fullObj: { player1: false, player2: false, item1: 'rock', item2: 'rock' },
      },
    }

    // Rendre le composant avec les props simulées
    const { getByAltText } = render(
      <div>
        <WinWrap {...player1WinProps} />
        <WinWrap {...player2WinProps} />
        <WinWrap {...equalityProps} />
      </div>
    )

    // Attendre que les images soient chargées pour chaque instance de WinWrap
    await waitFor(() => {
      // Vérifier que les images attendues sont présentes dans le DOM pour chaque cas
      expect(getByAltText('win')).toBeInTheDocument()
      expect(getByAltText('lose')).toBeInTheDocument()
      expect(getByAltText('equality')).toBeInTheDocument()
    })
  })
})
