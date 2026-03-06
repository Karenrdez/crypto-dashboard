import { render, screen } from "@testing-library/react";
import { PriceChart } from "../PriceChart";
import type { DatosMercado } from "../../types/crypto.types";

// Chart.js requiere canvas real del DOM, que no existe en Jest.
// Mockeamos Line para evitar errores de "canvas is not supported".
jest.mock("react-chartjs-2", () => ({
  Line: () => <div data-testid="mock-linea" />,
}));

const mockDatos: DatosMercado = {
  precios: [
    { timestamp: 1699000000000, precio: 20000 },
    { timestamp: 1699086400000, precio: 20500 },
  ],
  volumenes: [
    { timestamp: 1699000000000, volumen: 15000000 },
    { timestamp: 1699086400000, volumen: 17000000 },
  ],
};

test("PriceChart se renderiza correctamente", () => {
  render(
    <PriceChart datos={mockDatos} ariaLabel="Gráfico de prueba" role="img" />
  );

  // Verificamos role + aria-label para confirmar accesibilidad con lectores de pantalla
  const grafico = screen.getByRole("img", { name: /gráfico de prueba/i });

  expect(grafico).toBeInTheDocument();
});