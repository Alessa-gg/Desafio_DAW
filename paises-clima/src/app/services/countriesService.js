/**
 * @file countriesService.js
 * @description Servicio reutilizable para consumir el endpoint interno
 * /api/countries. Centraliza la lógica de obtención y ordenamiento de países,
 * separando esta responsabilidad de los componentes de UI.
 */

/**
 * @namespace CountriesService
 * @description Objeto que agrupa los métodos relacionados con la API de países.
 */
export const CountriesService = {

  /**
   * Obtiene la lista completa de países desde el endpoint interno /api/countries,
   * y los devuelve ordenados alfabéticamente por nombre común.
   *
   
   * @async
   * @returns {Promise<Array>} Array de objetos país ordenados alfabéticamente.
   * @throws {Error} Si la respuesta HTTP no es exitosa (res.ok === false).
   *
   * @example
   *
   */
  getAll: async () => {
    
    
    const baseUrl = typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000";

    // Realizamos la petición al proxy interno de Next.js
    const res = await fetch(`${baseUrl}/api/countries`, { cache: "no-store" });

    // Si el servidor responde con un código de error HTTP, lanzamos una excepción
    // con un mensaje legible para el usuario
    if (!res.ok) throw new Error("No se pudo obtener la lista de países");

    const data = await res.json();

    // Ordenamos el array alfabéticamente por el nombre común del país (a → z)
    return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  },
};
