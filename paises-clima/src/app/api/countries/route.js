/**
 * @file route.js
 * @description API Route de Next.js que actúa como proxy hacia la API pública
 * de Rest Countries. Evita problemas de CORS al realizar la petición desde el
 * servidor en lugar del navegador.
 *
 * Endpoint: GET /api/countries
 * Devuelve un array de países con los campos: name, flags, capital, cca3,
 * population y region.
 */

/**
 * Maneja las peticiones GET hacia /api/countries.
 * Consulta la API externa de Rest Countries y retorna los datos en formato JSON.
 * Si la petición externa falla, responde con un mensaje de error y código 500.
 *
 * @returns {Response} JSON con el array de países o un objeto de error.
 */
export async function GET() {
  try {
    // Petición a la API pública de Rest Countries.
    // Se solicitan únicamente los campos necesarios para reducir el tamaño
    // de la respuesta y mejorar el rendimiento.
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,cca3,population,region",
      { cache: "no-store" } // Se deshabilita el caché para obtener datos siempre frescos
    );

    // Convertimos la respuesta a JSON y la retornamos al cliente
    const data = await res.json();
    return Response.json(data);

  } catch (error) {
    // Si la API externa no responde o hay un error de red, se captura aquí
    // y se devuelve un mensaje de error con código HTTP 500 (Internal Server Error)
    return Response.json({ error: "Error al obtener países" }, { status: 500 });
  }
}
