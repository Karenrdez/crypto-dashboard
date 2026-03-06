import { useState, useEffect } from "react";
import { obtenerHistorialPrecios } from "../api/coingeckoService";
import type { DatosMercado } from "../types/crypto.types";

export const useCryptoData = (idCrypto: string, dias: number) => {

  const [datos, setDatos] = useState<DatosMercado | null>(null);
  // true mientras la petición está en vuelo — controla el skeleton en App.tsx
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    // Función async definida dentro del efecto porque
    // useEffect no acepta funciones async directamente como callback
    const fetchData = async () => {

      try {

        // Activamos loading antes de la petición para que el skeleton
        // aparezca inmediatamente al cambiar los filtros
        setCargando(true);

        const data = await obtenerHistorialPrecios(idCrypto, dias);

        setDatos(data);
        setError(null);

      } catch (err) {

        setError(err instanceof Error ? err.message : "Error desconocido");

        // Limpiamos datos anteriores para no mostrar gráficos
        // desactualizados junto al mensaje de error
        setDatos(null);

      } finally {
        setCargando(false);
      }

    };

    fetchData();

  // El efecto se re-ejecuta cada vez que cambia la crypto o el período
  }, [idCrypto, dias]);

  return { datos, cargando, error };
};