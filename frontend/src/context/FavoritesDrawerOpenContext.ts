import { UseDisclosureReturn } from "@chakra-ui/hooks";
import { createContext } from "react";

export const FavoritesDrawerOpenContext = createContext<
  UseDisclosureReturn | undefined
>(undefined);
