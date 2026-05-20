/**
 * @file SearchBar.js
 * @description Componente reutilizable de barra de búsqueda con funcionalidad
 * de limpieza. Permite filtrar la lista de países en tiempo real a medida que
 * el usuario escribe.
 */

"use client" // Directiva de Next.js: este componente se ejecuta en el cliente

/**
 * Barra de búsqueda controlada con botón para limpiar el texto.
 *
 
 *
 * @param {Object}   props          - Props del componente.
 * @param {string}   props.value    - Valor actual del campo de búsqueda (estado del padre).
 * @param {Function} props.onChange - Función que recibe el nuevo texto cuando el usuario escribe.
 * @returns {JSX.Element} Input de búsqueda con botón de limpieza.
 *
 * @example
 * const [search, setSearch] = useState("");
 * <SearchBar value={search} onChange={setSearch} />
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="input-group mb-3">
      {/* Ícono de lupa como decoración visual dentro del input group */}
      <span className="input-group-text"></span>

      {/* Input controlado: su valor siempre refleja el estado externo.
          Al escribir, invocamos onChange con el nuevo valor del input. */}
      <input
        type="text"
        className="form-control"
        placeholder="Buscar país..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* Botón de limpieza: solo aparece cuando hay texto escrito.
          Al hacer clic llama a onChange con cadena vacía para limpiar el filtro. */}
      {value && (
        <button className="btn btn-outline-secondary" onClick={() => onChange("")}>
          ✕
        </button>
      )}
    </div>
  );
}
