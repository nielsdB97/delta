import { createContext } from "react";
import { useFavorites } from "store/useFavorites";

type UseFavoritesReturn = ReturnType<typeof useFavorites>;

export const FavoritesContext = createContext<UseFavoritesReturn | undefined>(
  undefined
);
