import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
} from "@chakra-ui/react";
import type { DrawerProps } from "@chakra-ui/modal";
import { useContext } from "react";
import { FavoritesContext } from "context/FavoritesContext";

type FavoritesDrawerProps = Omit<DrawerProps, "children">;

function FavoritesDrawer(props: FavoritesDrawerProps) {
  const useFavorites = useContext(FavoritesContext);

  if (!useFavorites) {
    return null;
  }
  const [favorites, dispatch] = useFavorites;

  return (
    <Drawer {...props}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Favorieten</DrawerHeader>

        <DrawerBody>
          {favorites.map((favorite) => (
            <p key={favorite.productId}>{favorite.amount}</p>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default FavoritesDrawer;
