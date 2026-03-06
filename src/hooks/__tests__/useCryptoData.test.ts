import { renderHook, waitFor } from "@testing-library/react";
import { useCryptoData } from "../useCryptoData";
import * as coingeckoService from "../../api/coingeckoService";
import type { DatosMercado } from "../../types/crypto.types";

// Definidos fuera de los tests para reutilizarlos en ambos casos
const mockDatos: DatosMercado = {
  precios: [
    { timestamp: 1699000000000, precio: 20000 },
    { timestamp: 1699086400000, precio: 20500 },
  ],
  volumenes: [
    { timestamp: 1699000000000, volumen: 1000000 },
    { timestamp: 1699086400000, volumen: 1200000 },
  ],
};

describe("useCryptoData hook", () => {

  it("debe actualizar datos y cargando correctamente al obtener la API", async () => {

    // jest.spyOn intercepta la función real sin modificar el módulo completo,
    // evitando llamadas reales a CoinGecko durante los tests
    jest
      .spyOn(coingeckoService, "obtenerHistorialPrecios")
      .mockResolvedValue(mockDatos);

    const { result } = renderHook(() => useCryptoData("bitcoin", 7));

    // Verificamos el estado inicial antes de que resuelva la promesa
    expect(result.current.cargando).toBe(true);
    expect(result.current.datos).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.cargando).toBe(false));

    expect(result.current.datos).toEqual(mockDatos);
    expect(result.current.error).toBeNull();

  });

  it("debe actualizar error si la API falla", async () => {

    // mockRejectedValue simula un fallo de red para probar el bloque catch del hook
    jest
      .spyOn(coingeckoService, "obtenerHistorialPrecios")
      .mockRejectedValue(new Error("API fallida"));

    const { result } = renderHook(() => useCryptoData("bitcoin", 7));

    await waitFor(() => expect(result.current.cargando).toBe(false));

    expect(result.current.datos).toBeNull();
    expect(result.current.error).toBe("API fallida");

  });

});