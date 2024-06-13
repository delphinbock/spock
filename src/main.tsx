// React
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

// Component
import App from './components/app'

// Styles
import '../src/styles/main.scss'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
