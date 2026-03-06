import { Bar } from "react-chartjs-2";
import type { DatosMercado } from "../types/crypto.types";

// Los módulos de Chart.js se registran globalmente en chartConfig.ts
// por lo que no es necesario importarlos aquí.

interface VolumeChartProps {
  datos: DatosMercado;
  ariaLabel: string;
  role?: string;
}

export const VolumeChart = ({
  datos,
  ariaLabel,
  role = "img",
}: VolumeChartProps) => {

  const etiquetas = datos.volumenes.map((v) =>
    new Date(v.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  );

  const configuracion = {
    labels: etiquetas,
    datasets: [
      {
        label: "Market Volume",
        data: datos.volumenes.map((v) => v.volumen),
        backgroundColor: "rgba(14, 165, 233, 0.75)",
        borderColor: "rgba(14, 165, 233, 0.5)",
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: "#0ea5e9",
      },
    ],
  };

  const opciones = {
    responsive: true,
    maintainAspectRatio: false,

    // Mismo comportamiento que PriceChart: tooltip al acercarse al eje X
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
        bodyColor: "#0ea5e9",
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        titleFont: { family: "'DM Sans', sans-serif", size: 12 },
        bodyFont: { family: "'DM Mono', monospace", size: 13 },
        callbacks: {
          // Formatea el volumen por magnitud: >= 1B → "$38.50B" / < 1B → "$850.3M"
          label: (item: { raw: unknown }) => {
            const valor = +(item.raw as number);
            return valor >= 1e9
              ? ` $${(valor / 1e9).toFixed(2)}B`
              : ` $${(valor / 1e6).toFixed(1)}M`;
          },
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
            return num >= 1e9
              ? "$" + (num / 1e9).toFixed(1) + "B"
              : "$" + (num / 1e6).toFixed(0) + "M";
          },
        },
      },
    },
  };

  return (
    <div role={role} aria-label={ariaLabel} style={{ width: "100%", height: "100%" }}>
      <Bar data={configuracion} options={opciones} />
    </div>
  );
};