const fs = require("fs");
const axios = require("axios").default;
const cheerio = require("cheerio");

const NEWLINE_FOLLOWED_BY_SPACES = /(\n)[? ]*/g;

const URL = "https://www.coolblue.nl/boormachines/boorhamers";

async function getHtml() {
  const textResponse = await axios(URL);
  return textResponse.data;
}

async function init() {
  const html = await getHtml();
  const $ = cheerio.load(html);

  const products = $(".product-card.js-product");

  function buildJsonFromProducts(products) {
    return $(products)
      .map((_, product) => {
        const id = $(product)
          .find(".product-card__title a.link")
          .attr("href")
          .split("/")[2];
        const title = $(product)
          .find(".product-card__title a")
          .text()
          .replace(NEWLINE_FOLLOWED_BY_SPACES, " ")
          .trim();
        const price = $(product).find(".sales-price__current").text();
        const tags = $(product)
          .find(".dynamic-highlight__key--with-explanation")
          .map((_, tag) => {
            return $(tag)
              .text()
              .trim()
              .replace(NEWLINE_FOLLOWED_BY_SPACES, " ")
              .replace(/\s{2,}/g, " ");
          })
          .get();
        const imageEl = $(product).find(".product-card__image-container img");
        const imageUrl = imageEl.attr("data-src")
          ? imageEl.attr("data-src")
          : imageEl.attr("src");

        return {
          id,
          title,
          price,
          imageUrl,
          tags,
        };
      })
      .get();
  }

  const json = buildJsonFromProducts(products);
  return json;
}

module.exports = async (req, res) => {
  const json = await init();

  res.status(200).json(json);
};
