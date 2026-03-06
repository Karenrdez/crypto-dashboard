import { Line } from "react-chartjs-2";
import type { DatosMercado } from "../types/crypto.types";

// Los módulos de Chart.js se registran globalmente en chartConfig.ts
// por lo que no es necesario importarlos aquí.

interface PriceChartProps {
  datos: DatosMercado;
  ariaLabel?: string;
  role?: string;
}

export const PriceChart = ({ datos, ariaLabel, role = "img" }: PriceChartProps) => {

  const etiquetas = datos.precios.map((p) =>
    new Date(p.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  );

  const configuracion = {
    labels: etiquetas,
    datasets: [
      {
        label: "USD Price",
        data: datos.precios.map((p) => p.precio),
        borderColor: "#00e5a0",
        borderWidth: 2.5,

        // tension: 0 elimina el ajuste polinomial de curvas,
        // resultando en líneas rectas entre cada punto de datos
        tension: 0,

        // Puntos ocultos por defecto para evitar saturación visual
        // con datasets grandes (ej: 30 días). Solo aparecen al hacer hover.
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "#00e5a0",
        pointBorderColor: "#080e1a",
        pointBorderWidth: 2,

        fill: true,
        backgroundColor: "rgba(0, 229, 160, 0.12)",
      },
    ],
  };

  const opciones = {
    responsive: true,
    maintainAspectRatio: false,

    // mode: "index" muestra el tooltip en el mismo punto X para todos los datasets.
    // intersect: false lo activa al acercarse, sin necesidad de clic exacto.
    interaction: {
      mode: "index" as const,
      intersect: false,
    },

    plugins: {
      legend: { display: true },
      tooltip: {
        enabled: true,
        backgroundColor: "#0f1c2e",
        borderColor: "#1e3148",
        borderWidth: 1,
        titleColor: "#cde4f5",
        bodyColor: "#00e5a0",
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        titleFont: { family: "'DM Sans', sans-serif", size: 12 },
        bodyFont: { family: "'DM Mono', monospace", size: 13 },
        callbacks: {
          label: (item: { raw: unknown }) =>
            ` $${(+(item.raw as number)).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
        },
      },
    },

    scales: {
      x: {
        grid: { color: "rgba(30,49,72,.7)" },
        border: { color: "rgba(30,49,72,.7)" },
        ticks: { color: "#4a6a8a", maxTicksLimit: 8, maxRotation: 0 },
      },
      y: {
        grid: { color: "rgba(30,49,72,.7)" },
        border: { color: "rgba(30,49,72,.7)" },
        ticks: {
          color: "#4a6a8a",
          // Chart.js puede pasar el valor como number o string,
          // por eso verificamos el tipo antes de operar
          callback: (v: number | string) => {
            const num = typeof v === "number" ? v : parseFloat(v);
            return "$" + (num >= 1000 ? (num / 1000).toFixed(1) + "k" : num);
          },
        },
        // Se ejecuta después de que Chart.js calcula los límites del eje.
        // Agrega margen para que los puntos extremos no queden cortados.
        afterDataLimits(escala: { max: number; min: number }) {
          const rango = escala.max - escala.min;
          escala.min -= rango * 0.05;
          escala.max += rango * 0.02;
        },
      },
    },
  };

  return (
    <div role={role} aria-label={ariaLabel} style={{ width: "100%", height: "100%" }}>
      <Line data={configuracion} options={opciones} />
    </div>
  );
};