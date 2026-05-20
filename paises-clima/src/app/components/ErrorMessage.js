/**
 * @file ErrorMessage.js
 * @description Componente reutilizable para mostrar mensajes de error al usuario.
 * Utiliza el estilo de alerta de Bootstrap y, de forma opcional, incluye un
 * botón de "Reintentar" para que el usuario pueda volver a ejecutar la acción
 * que falló.
 */

"use client" // Directiva de Next.js: este componente se ejecuta en el cliente

/**
 * Muestra una alerta de error con un mensaje descriptivo y un botón opcional
 * para reintentar la operación fallida.
 *
 * @param {Object}   props          - Props del componente.
 * @param {string}   props.message  - Texto del error que se mostrará al usuario.
 * @param {Function} [props.onRetry] 
 *                                     
 * @returns {JSX.Element} Alerta de error renderizada.
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    // role="alert" mejora la accesibilidad: los lectores de pantalla anunciarán el error
    <div className="alert alert-danger" role="alert">
      <strong> Error:</strong> {message}

      {/* Renderizamos el botón de reintento solo si se proporcionó la función onRetry */}
      {onRetry && (
        <button className="btn btn-sm btn-outline-danger ms-3" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}
