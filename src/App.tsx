import { useState } from "react";
import { useCryptoData } from "./hooks/useCryptoData";
import { PriceChart } from "./components/PriceChart";
import { VolumeChart } from "./components/VolumeChart";

const ChartCard = ({
  titulo,
  subtitulo,
  etiqueta,
  children,
}: {
  titulo: string;
  subtitulo: string;
  etiqueta: string;
  children: React.ReactNode;
}) => (
  <div className="chart-card">
    <div className="chart-card-header">
      <div>
        <h2 className="chart-card-title">{titulo}</h2>
        <p className="chart-card-sub">{subtitulo}</p>
      </div>
      <span className="chart-tag">{etiqueta}</span>
    </div>
    <div className="chart-body">{children}</div>
  </div>
);

const EsqueletoCarga = () => (
  // role="status" y aria-live anuncian el estado de carga a lectores de pantalla
  <div
    className="loading-overlay"
    role="status"
    aria-live="polite"
    aria-label="Loading data"
  >
    <div className="spinner" />
    <div className="skeleton-group">
      <div className="skeleton-bar" style={{ width: "100%" }} />
      <div className="skeleton-bar" style={{ width: "75%" }} />
      <div className="skeleton-bar" style={{ width: "55%" }} />
    </div>
    <span className="loading-text">Fetching data…</span>
  </div>
);

const CajaError = ({ mensaje }: { mensaje: string }) => (
  // role="alert" hace que los lectores de pantalla anuncien el error inmediatamente
  <div className="error-box" role="alert">
    <span className="error-icon" aria-hidden="true">⚠</span>
    <div>
      <strong>Could not fetch data.</strong>
      <p className="error-detail">{mensaje}</p>
    </div>
  </div>
);

// Definidos fuera del componente para no recrearlos en cada render
const CRIPTOS = [
  { valor: "bitcoin",  etiqueta: "Bitcoin"  },
  { valor: "ethereum", etiqueta: "Ethereum" },
  { valor: "litecoin", etiqueta: "Litecoin" },
];

const DIAS_OPCIONES = [
  { valor: 7,  etiqueta: "7 days"  },
  { valor: 14, etiqueta: "14 days" },
  { valor: 30, etiqueta: "30 days" },
];

const App = () => {
  const [cripto, setCripto] = useState("bitcoin");
  const [dias, setDias] = useState(7);

  const { datos, cargando, error } = useCryptoData(cripto, dias);

  const criptoSeleccionada = CRIPTOS.find((c) => c.valor === cripto)?.etiqueta ?? "";

  return (
    <div className="dashboard-root">

      <header className="dashboard-header">
        <div className="brand">
          <span className="brand-eyebrow">Market Intelligence</span>
          <h1 className="brand-title">Crypto Dashboard</h1>
        </div>
        <div className="live-badge" aria-label="Live data source">
          <span className="live-dot" />
          LIVE · CoinGecko API
        </div>
      </header>

      <main className="dashboard-main">

        <section className="filter-bar" aria-label="Dashboard filters">
          <div className="filter-group">
            <span className="filter-label" id="label-cripto">Cryptocurrency</span>
            <div className="filter-pills" role="group" aria-labelledby="label-cripto">
              {CRIPTOS.map(({ valor, etiqueta }) => (
                <button
                  key={valor}
                  className={`pill ${cripto === valor ? "active" : ""}`}
                  onClick={() => setCripto(valor)}
                  // aria-pressed comunica el estado ON/OFF a lectores de pantalla
                  aria-pressed={cripto === valor}
                >
                  {etiqueta}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-divider" role="separator" />

          <div className="filter-group">
            <span className="filter-label" id="label-dias">Period</span>
            <div className="filter-pills" role="group" aria-labelledby="label-dias">
              {DIAS_OPCIONES.map(({ valor, etiqueta }) => (
                <button
                  key={valor}
                  className={`pill ${dias === valor ? "active" : ""}`}
                  onClick={() => setDias(valor)}
                  aria-pressed={dias === valor}
                >
                  {etiqueta}
                </button>
              ))}
            </div>
          </div>
        </section>

        {cargando && (
          <div className="charts-grid">
            <div className="chart-card" style={{ minHeight: 320 }}>
              <EsqueletoCarga />
            </div>
            <div className="chart-card" style={{ minHeight: 320 }}>
              <EsqueletoCarga />
            </div>
          </div>
        )}

        {/* Solo se muestra si hay error Y ya terminó de cargar,
            para evitar mostrar ambos estados al mismo tiempo */}
        {error && !cargando && <CajaError mensaje={error} />}

        {datos && !cargando && (
          <div className="charts-grid">
            <ChartCard
              titulo="Price History"
              subtitulo={`${criptoSeleccionada} · USD · Last ${dias} days`}
              etiqueta="LINE CHART"
            >
              <PriceChart
                datos={datos}
                ariaLabel={`${criptoSeleccionada} price history chart`}
                role="img"
              />
            </ChartCard>

            <ChartCard
              titulo="Market Volume"
              subtitulo={`${criptoSeleccionada} · USD · 24h per period`}
              etiqueta="BAR CHART"
            >
              <VolumeChart
                datos={datos}
                ariaLabel={`${criptoSeleccionada} market volume chart`}
                role="img"
              />
            </ChartCard>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;