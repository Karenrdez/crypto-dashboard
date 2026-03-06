import axios from "axios";
import type { DatosMercado } from "../types/crypto.types";

const API_BASE = "https://api.coingecko.com/api/v3";

export const obtenerHistorialPrecios = async (
  idCrypto: string,
  dias: number
): Promise<DatosMercado> => {

  try {

    const respuesta = await axios.get(
      `${API_BASE}/coins/${idCrypto}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          // "days" es el nombre exacto del parámetro que exige CoinGecko.
          // Nuestra variable interna es "dias" (convención del proyecto),
          // pero se mapea al nombre externo que espera la API.
          days: dias,
        },
      }
    );

    // CoinGecko devuelve arrays de tuplas [timestamp, valor].
    // Los transformamos a objetos con nombres descriptivos.
    const precios = respuesta.data.prices.map(
      (item: [number, number]) => ({
        timestamp: item[0],
        precio: item[1],
      })
    );

    const volumenes = respuesta.data.total_volumes.map(
      (item: [number, number]) => ({
        timestamp: item[0],
        volumen: item[1],
      })
    );

    return { precios, volumenes };

  } catch (error) {

    // Logueamos el error original para debugging y relanzamos uno
    // con mensaje legible que será capturado por useCryptoData
    console.error("Error CoinGecko:", error);
    throw new Error("API fallida");

  }

};

