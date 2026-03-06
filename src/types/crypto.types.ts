// Representa un punto de precio en el tiempo.
// Viene de la transformación del array [timestamp, precio]
// que devuelve el endpoint market_chart de CoinGecko.
export interface PrecioHistorico {
  timestamp: number; // Unix timestamp en milisegundos
  precio: number;    // Precio en USD en ese momento
}

// Representa un punto de volumen de mercado en el tiempo.
// Misma estructura que PrecioHistorico pero para total_volumes.
export interface VolumenHistorico {
  timestamp: number; // Unix timestamp en milisegundos
  volumen: number;   // Volumen total en USD en ese período
}

// Tipo raíz que agrupa precios y volúmenes.
// Es el contrato entre el servicio (coingeckoService),
// el hook (useCryptoData) y los componentes de gráficos.
export interface DatosMercado {
  precios: PrecioHistorico[];
  volumenes: VolumenHistorico[];
}