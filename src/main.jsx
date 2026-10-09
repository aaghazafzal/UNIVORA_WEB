import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import DisableDevtool from 'disable-devtool';

// Secure the entire application from devtools inspection
DisableDevtool({
    disableMenu: true,
    disableSelect: true,
    disableCopy: true,
    disableCut: true,
    disablePaste: true,
    clearLog: true,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
