/**
 * @file weatherService.js
 * @description Servicio reutilizable para obtener información climática
 * a través del endpoint interno /api/weather. Centraliza la lógica de red
 * y validación de respuestas de OpenWeatherMap.
 */

/**
 * @namespace WeatherService
 * @description Objeto que agrupa los métodos relacionados con la API del clima.
 */
export const WeatherService = {

  /**
   
   *
   * @async
   * @param {string} city - Nombre de la ciudad a consultar (p.ej. "San Salvador").
   * @returns {Promise<Object>} Objeto con datos climáticos de OpenWeatherMap.
   * @throws {Error} Si la petición HTTP falla o si la API del clima retorna un error.
   *
   * @example
   * 
   */
  getByCity: async (city) => {
    // Detectamos si estamos en el navegador o en el servidor para construir la URL base
    const baseUrl = typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000";

    
    const res = await fetch(`${baseUrl}/api/weather?city=${encodeURIComponent(city)}`, {
      cache: "no-store" // Siempre pedimos datos frescos del clima
    });

    
    if (!res.ok) throw new Error(`No se pudo obtener el clima para ${city}`);

    const data = await res.json();

    
    if (data.cod && data.cod !== 200) throw new Error(data.message);

    return data;
  },
};
