import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "./styles/dashboard.css";
// Importación por efecto secundario: registra globalmente los módulos
// de Chart.js para que PriceChart y VolumeChart no lo hagan individualmente.
import "./utils/chartConfig.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

