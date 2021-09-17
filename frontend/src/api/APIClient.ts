import { HTTPClient } from "io/HTTPClient";
import type { Product } from "types/product";

export const APIClient = {
  getProducts() {
    return HTTPClient.get<Product[]>("products");
  },
};
