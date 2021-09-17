import { useQuery } from "react-query";
import { APIClient } from "api/APIClient";

const QUERY_KEY = "products";

export const useProducts = () => {
  async function fetchProducts() {
    const { data } = await APIClient.getProducts();
    return data;
  }

  return useQuery(QUERY_KEY, fetchProducts);
};
