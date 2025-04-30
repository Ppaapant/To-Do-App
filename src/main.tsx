import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store';
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </PersistGate>
    </Provider>
    
  </StrictMode>
)


//зробити store
