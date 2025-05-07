import axios from 'axios';
import * as cheerio from 'cheerio';

export const scrapePrices = async (productName) => {
  const url = `https://www.laeuropea.com.mx/catalogsearch/result/?q=${encodeURIComponent(productName)}`;

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const products = [];

  $('.product-item-info').each((_, element) => {
    const name = $(element).find('.product-item-link').text().trim();
    const price = $(element).find('.price').first().text().trim();
    const link = $(element).find('.product-item-link').attr('href');

    if (name && price && link) {
      products.push({ name, price, link });
    }
  });

  return products.slice(0, 10);
};
