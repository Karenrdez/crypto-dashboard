import '@testing-library/jest-dom';

// Jest corre en Node.js sin DOM real, por lo que canvas no existe.
// Mockeamos getContext para que Chart.js no lance errores durante los tests.
// El "as any" es intencional — solo nos interesa que las llamadas no rompan,
// no que devuelvan valores reales.
(HTMLCanvasElement.prototype as any).getContext = () => ({
  fillRect: () => {},
  clearRect: () => {},
  getImageData: () => ({ data: [] }),
  putImageData: () => {},
  createLinearGradient: () => ({ addColorStop: () => {} }),
  fillText: () => {},
  measureText: () => ({ width: 0 }),
  stroke: () => {},
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  closePath: () => {},
  strokeRect: () => {},
  arc: () => {},
  fill: () => {},
  drawImage: () => {},
  save: () => {},
  restore: () => {},
  transform: () => {},
  rotate: () => {},
  scale: () => {},
  setTransform: () => {},
});