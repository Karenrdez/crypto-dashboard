import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registro global de módulos de Chart.js.
// Al centralizarlo aquí, PriceChart y VolumeChart
// no necesitan registrar nada individualmente.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,  // necesario para VolumeChart
  Filler,      // necesario para el área bajo la línea en PriceChart
  Title,
  Tooltip,
  Legend
);