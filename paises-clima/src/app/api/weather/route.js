/**
 * @file route.js
 * @description API Route de Next.js que actúa como proxy hacia la API de
 * OpenWeatherMap. Mantiene la API key en el servidor (variables de entorno)
 * para que nunca quede expuesta en el bundle del cliente.
 *
 * Endpoint: GET /api/weather?city=<nombre_de_ciudad>
 * Devuelve los datos climáticos actuales de la ciudad recibida como parámetro.
 */

/**
 * Maneja las peticiones GET hacia /api/weather.
 * Lee el parámetro "city" de la URL, consulta OpenWeatherMap con la API key
 * almacenada en las variables de entorno, y retorna la respuesta al cliente.
 *
 * @param {Request} request - Objeto de solicitud HTTP que contiene los parámetros de búsqueda.
 * @returns {Response} JSON con datos del clima o un objeto de error.
 */
export async function GET(request) {
  try {
    // Extraemos los parámetros de la URL de la petición entrante
    const { searchParams } = new URL(request.url);

    // Obtenemos el nombre de la ciudad enviado por el cliente
    const city = searchParams.get("city");

    // Leemos la API key desde variables de entorno del servidor.
    // Usar process.env asegura que la clave NUNCA llegue al navegador.
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    // Consultamos la API de OpenWeatherMap con:
    // - units=metric  → temperatura en °C
    // - lang=es       → descripción del clima en español
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`,
      { cache: "no-store" } // Sin caché para reflejar el clima en tiempo real
    );

    // Convertimos y reenviamos la respuesta de OpenWeatherMap al cliente
    const data = await res.json();
    return Response.json(data);

  } catch (error) {
    // Captura errores de red o de procesamiento y responde con código 500
    return Response.json({ error: "Error al obtener clima" }, { status: 500 });
  }
}
