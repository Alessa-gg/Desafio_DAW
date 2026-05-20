/**
 * @file WeatherInfo.js
 * @description Componente que presenta la información climática actual de la
 * capital de un país. Maneja tres estados posibles: cargando, error o datos
 * disponibles. Muestra temperatura, descripción, humedad y velocidad del viento.
 */

"use client" // Directiva de Next.js: este componente se ejecuta en el cliente

// Importamos los componentes reutilizables de carga y error
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

/**
 * Muestra la información del clima con soporte para estados de carga y error.
 *
 * @param {Object}   props          - Props del componente.
 * @param {Object}   props.weather  - Objeto de datos climáticos proveniente de OpenWeatherMap.
 * @param {boolean}  props.loading  - true mientras se está consultando el clima.
 * @param {string}   props.error    - Mensaje de error si la consulta falló (o null).
 * @param {Function} props.onRetry  - Función para reintentar la obtención del clima.
 * @returns {JSX.Element|null} Tarjeta de clima, spinner, mensaje de error o null.
 */
export default function WeatherInfo({ weather, loading, error, onRetry }) {
  // Estado 1: Cargando → mostramos el spinner mientras llega la respuesta
  if (loading) return <LoadingSpinner message="Consultando clima..." />;

  // Estado 2: Error → mostramos el mensaje y el botón para reintentar
  if (error) return <ErrorMessage message={error} onRetry={onRetry} />;

  // Estado 3: Sin datos (antes de seleccionar un país) → no renderizamos nada
  if (!weather) return null;

  

  // Temperatura redondeada al entero más cercano para mejor legibilidad
  const temp        = weather.main?.temp != null ? `${Math.round(weather.main.temp)}°C` : "N/A";

  // Descripción del estado del tiempo (p.ej. "cielo despejado")
  const description = weather.weather?.[0]?.description ?? "N/A";

  // Humedad relativa expresada en porcentaje
  const humidity    = weather.main?.humidity != null ? `${weather.main.humidity}%` : "N/A";

  // Velocidad del viento en metros por segundo
  const wind        = weather.wind?.speed != null ? `${weather.wind.speed} m/s` : "N/A";

  // Código del ícono proporcionado por OpenWeatherMap (p.ej. "01d" = cielo despejado de día)
  const icon        = weather.weather?.[0]?.icon;

  return (
    <div className="card mt-3">
      <div className="card-body">

        {/* --- Encabezado: ícono + descripción + temperatura principal --- */}
        <div className="d-flex align-items-center gap-3 mb-3">
          {/* Ícono del clima usando la CDN oficial de OpenWeatherMap.
              Solo lo mostramos si el código del ícono está disponible. */}
          {icon && (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="clima"
              width={60}
              height={60}
            />
          )}
          <div>
            {/* text-capitalize convierte en mayúscula la primera letra de la descripción */}
            <p className="mb-0 text-capitalize">{description}</p>
            <h3 className="mb-0 fw-bold">{temp}</h3>
          </div>
        </div>

        {/* --- Cuadrícula de métricas: Temperatura, Humedad, Viento --- */}
        <div className="row text-center">
          {/* Temperatura */}
          <div className="col-4">
            <div className="border rounded p-2">
              <div></div>
              <strong>{temp}</strong>
              <div><small className="text-muted">Temperatura</small></div>
            </div>
          </div>

          {/* Humedad */}
          <div className="col-4">
            <div className="border rounded p-2">
              <div></div>
              <strong>{humidity}</strong>
              <div><small className="text-muted">Humedad</small></div>
            </div>
          </div>

          {/* Velocidad del viento */}
          <div className="col-4">
            <div className="border rounded p-2">
              <div></div>
              <strong>{wind}</strong>
              <div><small className="text-muted">Viento</small></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
