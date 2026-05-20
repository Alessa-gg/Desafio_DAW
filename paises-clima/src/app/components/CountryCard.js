/**
 * @file CountryCard.js
 * @description Componente reutilizable que representa una tarjeta de país
 * dentro de la lista principal. Muestra la bandera, nombre y capital del país.
 * Resalta visualmente la tarjeta cuando el país está seleccionado.
 */

"use client" // Directiva de Next.js: este componente se ejecuta en el cliente

/**
 * Tarjeta individual de un país en la lista lateral.
 *
 * @param {Object}   props           - Props del componente.
 * @param {Object}   props.country   - Objeto con los datos del país (name, flags, capital).
 * @param {boolean}  props.isSelected - Indica si este país está actualmente seleccionado.
 * @param {Function} props.onClick   - Función que se ejecuta al hacer clic en la tarjeta.
 * @returns {JSX.Element} Tarjeta de país renderizada.
 */
export default function CountryCard({ country, isSelected, onClick }) {
  // Preferimos SVG para mejor calidad; si no existe, usamos PNG como fallback
  const flag = country.flags?.svg || country.flags?.png;

  // Si el nombre no está disponible, mostramos un texto genérico (optional chaining + nullish coalescing)
  const name = country.name?.common ?? "Desconocido";

  // La capital puede ser un array vacío o undefined; tomamos el primer elemento
  const capital = country.capital?.[0] ?? "Sin capital";

  return (
    <div
      // Añadimos la clase "border-primary" de Bootstrap cuando el país está seleccionado
      // para dar retroalimentación visual al usuario
      className={`card mb-2 ${isSelected ? "border-primary" : ""}`}
      onClick={onClick}
      style={{ cursor: "pointer" }} // Indica visualmente que la tarjeta es clickeable
    >
      <div className="card-body d-flex align-items-center gap-3 py-2">

        {/* Bandera del país o ícono genérico si no hay imagen disponible */}
        {flag ? (
          <img
            src={flag}
            alt={`Bandera de ${name}`}
            style={{ width: 50, height: 35, objectFit: "cover", borderRadius: 4, border: "1px solid #ddd" }}
          />
        ) : (
          <span style={{ fontSize: 30 }}>🏳</span>
        )}

        {/* Nombre y capital del país */}
        <div>
          <p className="mb-0 fw-semibold">{name}</p>
          <small className="text-muted">{capital}</small>
        </div>

        {/* Indicador de selección: solo se muestra en la tarjeta activa */}
        {isSelected && <span className="ms-auto text-primary fw-bold">▶</span>}
      </div>
    </div>
  );
}
