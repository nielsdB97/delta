import { useQuery } from "react-query";
import { APIClient } from "api/APIClient";
import type { Product } from "types/product";

const QUERY_KEY = "products";

export const useProducts = (initialData?: Product[]) => {
  async function fetchProducts() {
    const { data } = await APIClient.getProducts();
    return data;
  }

  return useQuery(QUERY_KEY, fetchProducts, { initialData });
};
