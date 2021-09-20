import {
  IconButton,
  SimpleGrid,
  Stack,
  Skeleton,
  Heading,
  Tag,
  Text,
} from "@chakra-ui/react";
import { APIClient } from "api/APIClient";
import { useProducts } from "api/products";
import { FavoritesContext } from "context/FavoritesContext";
import type { GetServerSideProps } from "next";
import Image from "next/image";
import { useContext } from "react";
import { HiCheck, HiHeart } from "react-icons/hi";
import { addFavorite } from "store/useFavorites";
import type { Product } from "types/product";

export const getServerSideProps: GetServerSideProps<ProductGridProps> =
  async () => {
    const productsRequest = await APIClient.getProducts();
    const products = productsRequest.data;

    return { props: { productsSSR: products } };
  };

interface ProductGridProps {
  productsSSR: Product[];
}
function ProductGrid({ productsSSR }: ProductGridProps) {
  const { data: products } = useProducts(productsSSR);
  const useFavorites = useContext(FavoritesContext);

  if (!useFavorites) {
    return null;
  }
  const [favorites, dispatch] = useFavorites;

  if (!products || products?.length < 1) {
    return (
      <SimpleGrid minChildWidth="300px" spacingX="4" spacingY="6">
        {Array(30)
          .fill(null)
          .map((_, index) => (
            <Skeleton key={index} width="300px" height="400px" />
          ))}
      </SimpleGrid>
    );
  }
  return (
    <SimpleGrid minChildWidth="300px" spacingY="6">
      {products.map((product) => {
        const isFavorite = !!favorites.find(
          (favorite) => favorite.productId === product.id
        );

        return (
          <Stack
            key={product.id}
            as="article"
            p={6}
            w="full"
            boxShadow="lg"
            rounded="lg"
            spacing="8"
            justifyContent="space-between"
          >
            <Image
              src={product.imageUrl}
              alt={`Productfoto van ${product.title}`}
              width="424px"
              height="340px"
              objectFit="contain"
            />

            <Stack spacing="4">
              <Heading as="h3" fontSize="md" fontWeight="normal">
                {product.title}
              </Heading>
              <Stack isInline>
                {product.tags.map((tag) => (
                  <Tag key={tag} textAlign="center" paddingY="2">
                    {tag}
                  </Tag>
                ))}
              </Stack>

              <Stack isInline justifyContent="space-between">
                <Text fontWeight="800" fontSize="xl">
                  {product.price}
                </Text>
                <IconButton
                  icon={isFavorite ? <HiCheck /> : <HiHeart />}
                  onClick={() => {
                    dispatch(addFavorite(product.id));
                  }}
                  colorScheme={isFavorite ? "green" : "pink"}
                  aria-label="Voeg toe aan favorieten"
                  disabled={isFavorite}
                />
              </Stack>
            </Stack>
          </Stack>
        );
      })}
    </SimpleGrid>
  );
}

export default ProductGrid;
