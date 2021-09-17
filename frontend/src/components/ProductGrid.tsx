import {
  IconButton,
  SimpleGrid,
  Stack,
  Heading,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useProducts } from "api/products";
import { FavoritesContext } from "context/FavoritesContext";
import Image from "next/image";
import { useContext } from "react";
import { HiHeart } from "react-icons/hi";
import { addFavorite } from "store/useFavorites";

function ProductGrid() {
  const { data: products } = useProducts();
  const useFavorites = useContext(FavoritesContext);

  if (!useFavorites) {
    return null;
  }
  const [favorites, dispatch] = useFavorites;

  if (!products) {
    return null;
  }
  return (
    <SimpleGrid minChildWidth="300px" spacingY="6">
      {products.map((product) => (
        <Stack
          key={product.id}
          as="article"
          p={6}
          w="full"
          boxShadow="lg"
          rounded="lg"
          spacing="8"
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
                icon={<HiHeart />}
                onClick={() => {
                  dispatch(addFavorite(product.id));
                }}
                colorScheme="pink"
                aria-label="Voeg toe aan favorieten"
              />
            </Stack>
          </Stack>
        </Stack>
      ))}
    </SimpleGrid>
  );
}

export default ProductGrid;
