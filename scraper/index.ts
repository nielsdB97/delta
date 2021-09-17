import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";
import type { Cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";

const NEWLINE_FOLLOWED_BY_SPACES = /(\n)[? ]*/g;

const URL = "https://www.coolblue.nl/mobiele-telefoons/smartphones/filter";

async function getHtml() {
  const textResponse = await fetch(URL);
  return await textResponse.text();
}

async function init() {
  const html = await getHtml();
  const $ = cheerio.load(html);

  const products = $(".product-card.js-product");

  function buildJsonFromProducts(products: Cheerio) {
    return $(products)
      .map((_, product) => {
        // @ts-ignore weird Cheerio error
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
  const jsonString = JSON.stringify(json, null, 2);
  Deno.writeTextFile("products.json", jsonString);
}
init();
