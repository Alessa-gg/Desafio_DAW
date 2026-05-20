/**
 * @file LoadingSpinner.js
 * @description Componente reutilizable que muestra un indicador de carga
 * (spinner) mientras se espera la respuesta de una API u operación asíncrona.
 * Utiliza el spinner animado de Bootstrap.
 */

"use client" // Directiva de Next.js: este componente se ejecuta en el cliente

/**
 * Spinner de carga centrado con un mensaje de estado personalizable.
 *
 * @param {Object} props               - Props del componente.
 * @param {string} [props.message="Cargando..."] - Texto descriptivo que se muestra
 *                                                 debajo del spinner. El valor por
 *                                                 defecto es "Cargando...".
 * @returns {JSX.Element} Indicador de carga con mensaje.
 *
 * @example
 * // Uso con mensaje por defecto
 * <LoadingSpinner />
 *
 * @example
 * // Uso con mensaje personalizado
 * <LoadingSpinner message="Consultando clima..." />
 */
export default function LoadingSpinner({ message = "Cargando..." }) {
  return (
    <div className="text-center my-4">
      {/* Spinner animado de Bootstrap.
          role="status" mejora la accesibilidad para tecnologías de asistencia. */}
      <div className="spinner-border text-primary" role="status">
        {/* visually-hidden oculta el texto visualmente pero lo mantiene para lectores de pantalla */}
        <span className="visually-hidden">Cargando...</span>
      </div>

      {/* Mensaje dinámico debajo del spinner */}
      <p className="mt-2">{message}</p>
    </div>
  );
}
