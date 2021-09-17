import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Input,
  Text,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import type { DrawerProps } from "@chakra-ui/modal";
import { Fragment, useContext } from "react";
import { FavoritesContext } from "context/FavoritesContext";
import { useProducts } from "api/products";
import { HiTrash } from "react-icons/hi";
import { removeFavorite, updateFavorite } from "store/useFavorites";

type FavoritesDrawerProps = Omit<DrawerProps, "children">;

function FavoritesDrawer(props: FavoritesDrawerProps) {
  const useFavorites = useContext(FavoritesContext);

  const { data: products } = useProducts();

  if (!useFavorites || !products) {
    return null;
  }
  const [favorites, dispatch] = useFavorites;

  return (
    <Drawer {...props} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Favorieten</DrawerHeader>

        <DrawerBody>
          <SimpleGrid
            templateColumns={{ base: "2fr 1fr", md: "3fr 1fr" }}
            spacing="4"
          >
            {favorites.map((favorite) => {
              const product = products.find(
                (product) => product.id === favorite.productId
              );

              if (!product) {
                return (
                  <Stack isInline>
                    <Text>Product no longer exists</Text>
                    <IconButton
                      icon={<HiTrash />}
                      colorScheme="red"
                      onClick={() => {
                        dispatch(removeFavorite(favorite.productId));
                      }}
                      aria-label="Verwijder favoriet"
                    />
                  </Stack>
                );
              }
              return (
                <Fragment key={product.id}>
                  <Text flexGrow={1}>{product.title}</Text>

                  <Stack isInline>
                    <Input
                      defaultValue={favorite.amount}
                      onBlur={({ target: { value } }) => {
                        dispatch(
                          updateFavorite(product.id, parseInt(value, 10))
                        );
                      }}
                      w="full"
                    />
                    <IconButton
                      icon={<HiTrash />}
                      colorScheme="red"
                      onClick={() => {
                        dispatch(removeFavorite(product.id));
                      }}
                      aria-label="Verwijder favoriet"
                    />
                  </Stack>
                </Fragment>
              );
            })}
          </SimpleGrid>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default FavoritesDrawer;
