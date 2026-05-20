/**
 * @file page.js
 * @description Página principal de la aplicación "País y Clima".
 * Orquesta la lógica de estado y coordina los componentes de lista,
 * búsqueda y detalle de países. Consume los servicios de países y clima.
 *
 * Estructura visual:
 *  ┌─────────────────────────────────────┐
 *  │  Navbar (País y Clima)              │
 *  ├──────────────┬──────────────────────┤
 *  │  Lista de    │  Detalle del         │
 *  │  países      │  país seleccionado   │
 *  │  (col-md-4)  │  + Clima (col-md-8)  │
 *  └──────────────┴──────────────────────┘
 */

"use client"; // Directiva de Next.js: esta página requiere hooks de React (estado y efectos)

import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos globales de Bootstrap
import { useState, useEffect } from "react";

// Servicios que encapsulan la lógica de comunicación con las APIs
import { CountriesService } from "./services/countriesService";
import { WeatherService }   from "./services/weatherService";

// Componentes de UI reutilizables
import CountryCard     from "./components/CountryCard";
import CountryDetail   from "./components/CountryDetail";
import SearchBar       from "./components/SearchBar";
import LoadingSpinner  from "./components/LoadingSpinner";
import ErrorMessage    from "./components/ErrorMessage";

/**
 * Componente principal de la aplicación.
 * Administra el estado global de países, búsqueda, país seleccionado y clima.
 *
 * @returns {JSX.Element} Interfaz completa de la aplicación.
 */
export default function Home() {
  // --- Estado de la lista de países ---
  const [countries, setCountries] = useState([]);       // Array con todos los países
  const [loading,   setLoading]   = useState(true);     // true mientras se cargan los países
  const [error,     setError]     = useState(null);     // Mensaje de error de la API de países

  // --- Estado del buscador y país seleccionado ---
  const [search,   setSearch]   = useState("");         // Texto actual del campo de búsqueda
  const [selected, setSelected] = useState(null);       // País actualmente seleccionado

  // --- Estado del clima del país seleccionado ---
  const [weather,        setWeather]        = useState(null);  // Datos climáticos de la capital
  const [weatherLoading, setWeatherLoading] = useState(false); // true mientras se carga el clima
  const [weatherError,   setWeatherError]   = useState(null);  // Mensaje de error del clima

  // ─────────────────────────────────────────────────────────────────────────
  // Función: obtener todos los países desde el servicio
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Llama al servicio de países, actualiza el estado con los resultados
   * y maneja el estado de carga y error.
   * @async
   */
  const fetchCountries = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await CountriesService.getAll();
      setCountries(data); // Guarda el array de países ya ordenado alfabéticamente
    } catch (err) {
      setError(err.message); // Almacena el mensaje de error para mostrarlo al usuario
    } finally {
      setLoading(false); // Se ejecuta siempre, con o sin error
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Función: obtener el clima de una capital
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Consulta el clima de la capital del país seleccionado.
   * Si no hay capital registrada, muestra un error inmediatamente.
   *
   * @async
   * @param {string} capital - Nombre de la ciudad a consultar.
   */
  const fetchWeather = async (capital) => {
    // Validación previa: no intentamos la petición si no hay capital
    if (!capital) { setWeatherError("Sin capital registrada."); return; }

    setWeatherLoading(true);
    setWeatherError(null);
    setWeather(null); // Limpiamos el clima anterior mientras carga el nuevo

    try {
      const data = await WeatherService.getByCity(capital);
      setWeather(data);
    } catch (err) {
      setWeatherError(err.message);
    } finally {
      setWeatherLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Efecto: cargar los países al montar el componente
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchCountries();
    // El array de dependencias vacío [] asegura que esto se ejecute solo una vez,
    // equivalente a componentDidMount en componentes de clase
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Manejador: cuando el usuario selecciona un país
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Actualiza el país seleccionado, dispara la carga del clima y,
   * en pantallas pequeñas, hace scroll automático a la sección de detalle.
   *
   * @param {Object} country - Objeto del país que el usuario eligió.
   */
  const handleSelect = (country) => {
    setSelected(country);
    fetchWeather(country.capital?.[0]);

    // En móvil hace scroll automático al detalle para mejorar la experiencia
    // de usuario en pantallas donde lista y detalle se apilan verticalmente
    if (window.innerWidth < 768) {
      setTimeout(() => {
        document.getElementById("detalle")?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Pequeño delay para que React renderice el detalle antes del scroll
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Filtrado de países según el texto de búsqueda
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Lista de países filtrada en tiempo real según el texto del buscador.
   * La comparación se hace en minúsculas para que sea insensible a mayúsculas.
   */
  const filtered = countries.filter((c) =>
    c.name?.common?.toLowerCase().includes(search.toLowerCase())
  );

  // ─────────────────────────────────────────────────────────────────────────
  // Renderizado
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="container-fluid p-0">

      {/* ── Barra de navegación ── */}
      <nav className="navbar navbar-dark bg-primary mb-3">
        <div className="container">
          <span className="navbar-brand fw-bold">País y Clima</span>
          {/* El subtítulo solo se muestra en pantallas medianas o superiores */}
          <span className="text-white-50 d-none d-md-inline">
            Explora países y consulta el clima de sus capitales
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row g-3">

          {/* ── COLUMNA IZQUIERDA: Lista de países ── */}
          <div className="col-12 col-md-4">

            {/* Encabezado con conteo de resultados del filtro */}
            <div className="d-flex align-items-center gap-2 mb-2">
              <h5 className="mb-0">Países</h5>
              {/* El badge con el conteo solo aparece cuando ya cargaron los datos */}
              {!loading && (
                <span className="badge bg-primary">{filtered.length}</span>
              )}
            </div>

            {/* Campo de búsqueda: filtra la lista en tiempo real */}
            <SearchBar value={search} onChange={setSearch} />

            {/* Estados de carga, error y lista vacía */}
            {loading && <LoadingSpinner message="Cargando países..." />}
            {error   && <ErrorMessage message={error} onRetry={fetchCountries} />}
            {!loading && !error && filtered.length === 0 && (
              <p className="text-muted text-center">No se encontraron países.</p>
            )}

            {/* Lista scrolleable de tarjetas de países.
                maxHeight limita la altura para no ocupar toda la pantalla. */}
            <div style={{ maxHeight: "45vh", overflowY: "auto" }}>
              {!loading && !error && filtered.map((country) => (
                <CountryCard
                  key={country.cca3}           // cca3 es el código ISO único de cada país
                  country={country}
                  isSelected={selected?.cca3 === country.cca3} // Comparamos por código único
                  onClick={() => handleSelect(country)}
                />
              ))}
            </div>
          </div>

          {/* ── COLUMNA DERECHA: Detalle del país seleccionado ── */}
          {/* El id="detalle" se usa como ancla para el scroll en móvil */}
          <div className="col-12 col-md-8" id="detalle">
            {!selected ? (
              // Estado inicial: ningún país seleccionado → mostramos instrucción al usuario
              <div className="text-center text-muted mt-3 mt-md-5">
                <div style={{ fontSize: 60 }}>🗺</div>
                <h5>Selecciona un país</h5>
                <p className="small">
                  Haz clic en cualquier país para ver su información y el clima de su capital.
                </p>
              </div>
            ) : (
              // Estado con país seleccionado → mostramos el detalle completo
              <CountryDetail
                country={selected}
                weather={weather}
                weatherLoading={weatherLoading}
                weatherError={weatherError}
                // Al reintentar el clima, usamos la capital del país seleccionado actual
                onRetryWeather={() => fetchWeather(selected.capital?.[0])}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
