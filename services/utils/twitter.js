import { TwitterApi } from 'twitter-api-v2';
import config from '../../config.js';

const twitterClient = new TwitterApi(config.twitter.bearer);

// Caché en memoria
const cache = {};

export const searchTweets = async (query) => {
  const currentTime = Date.now();

  if (cache[query]) {
    console.log('Devolviendo resultados desde caché');
    return cache[query].data;
  }

  try {
    const response = await twitterClient.v2.search(query, { max_results: 3 });

    // Almacenar los resultados en caché
    cache[query] = {
      data: response.data,
      timestamp: currentTime,
    };

    console.log('Resultados almacenados en caché');
    return response.data;
  } catch (error) {
    if (error.code === 429) {
      const resetTime = error.rateLimit.reset * 1000;
      const waitTime = resetTime - Date.now();
      console.error(`Rate limit exceeded. Waiting for ${waitTime / 1000} seconds.`);
      console.error('Usando datos en caché si están disponibles.');
    } else {
      console.error('Error al buscar tweets:', error);
    }

    if (cache[query]) {
      console.log('Devolviendo datos en caché debido a un error en la solicitud.');
      return cache[query].data;
    }

    throw error;
  }
};