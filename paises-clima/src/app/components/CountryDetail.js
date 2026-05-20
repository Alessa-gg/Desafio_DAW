/**
 * @file CountryDetail.js
 * @description Componente que muestra la información detallada de un país
 * seleccionado: bandera grande, nombre, capital, región, población y el
 * componente WeatherInfo con el clima actual de la capital.
 */

"use client" // Directiva de Next.js: este componente se ejecuta en el cliente

// Importamos WeatherInfo para componer la sección de clima dentro del detalle
import WeatherInfo from "./WeatherInfo";

/**
 * Vista de detalle de un país seleccionado.
 *
 * @param {Object}   props                  - Props del componente.
 * @param {Object}   props.country          - Objeto con los datos del país a mostrar.
 * @param {Object}   props.weather          - Datos climáticos obtenidos de la API.
 * @param {boolean}  props.weatherLoading   - Indica si el clima se está cargando.
 * @param {string}   props.weatherError     - Mensaje de error del clima (o null).
 * @param {Function} props.onRetryWeather   - Función para reintentar la petición del clima.
 * @returns {JSX.Element|null} Detalle del país o null si no hay país seleccionado.
 */
export default function CountryDetail({ country, weather, weatherLoading, weatherError, onRetryWeather }) {
  // Guardián: si no se ha seleccionado ningún país, no renderizamos nada
  if (!country) return null;

  // Extraemos y formateamos los datos del país con valores de fallback seguros
  const flag       = country.flags?.svg || country.flags?.png;
  const name       = country.name?.common ?? "Desconocido";
  const capital    = country.capital?.[0] ?? "Sin capital";

  // toLocaleString("es-ES") formatea el número con separadores de miles en español
  // Ejemplo: 1234567 → "1.234.567"
  const population = country.population?.toLocaleString("es-ES") ?? "N/A";

  return (
    <div className="card">
      <div className="card-body">

        {/* --- Encabezado: Bandera + Nombre + Capital --- */}
        <div className="d-flex align-items-start gap-4 mb-3">
          {/* Solo mostramos la bandera si existe la URL de imagen */}
          {flag && (
            <img
              src={flag}
              alt={`Bandera de ${name}`}
              style={{ width: 140, height: 90, objectFit: "cover", borderRadius: 8, border: "2px solid #ddd" }}
            />
          )}
          <div>
            <h2 className="mb-1">{name}</h2>
            {/* Etiqueta secundaria en mayúsculas para indicar el dato que sigue */}
            <p className="text-muted mb-1" style={{ fontSize: 12 }}>CAPITAL</p>
            <p className="fw-semibold fs-5 mb-0">{capital}</p>
          </div>
        </div>

        {/* --- Fila de datos adicionales: Región y Población --- */}
        <div className="row mb-3">
          <div className="col-6">
            <div className="border rounded p-2 text-center">
              <div></div>
              <small className="text-muted">Región</small>
              <p className="mb-0 fw-semibold">{country.region}</p>
            </div>
          </div>
          <div className="col-6">
            <div className="border rounded p-2 text-center">
              <div></div>
              <small className="text-muted">Población</small>
              <p className="mb-0 fw-semibold">{population}</p>
            </div>
          </div>
        </div>

        {/* --- Sección de Clima --- */}
        {/* El título incluye el nombre de la capital  */}
        <h5 className="border-top pt-3"> Clima en {capital}</h5>

        {/* Delegamos la visualización del clima a WeatherInfo, pasándole
            el estado actual (datos, carga, error) y la función de reintento */}
        <WeatherInfo
          weather={weather}
          loading={weatherLoading}
          error={weatherError}
          onRetry={onRetryWeather}
        />
      </div>
    </div>
  );
}
