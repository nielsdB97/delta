import { Box, Stack, Heading, Text, IconButton } from "@chakra-ui/react";
import { FavoritesContext } from "context/FavoritesContext";
import { FavoritesDrawerOpenContext } from "context/FavoritesDrawerOpenContext";
import { useContext } from "react";
import { HiHeart } from "react-icons/hi";

function Header() {
  const FavoritesDrawerDisclosure = useContext(FavoritesDrawerOpenContext);
  const useFavorites = useContext(FavoritesContext);

  if (!useFavorites) {
    return null;
  }
  const [favorites] = useFavorites;

  const favoritesAmount = favorites.reduce(
    (acc, favorite) => acc + favorite.amount,
    0
  );

  return (
    <Stack
      as="header"
      isInline
      justifyContent="space-between"
      alignItems="center"
      padding="4"
      bgGradient="linear(to-r, cyan.600, blue.500)"
    >
      <Heading as="h1" size="lg" color="white">
        InterDelta
      </Heading>

      <Stack isInline alignItems="center">
        <Box pos="relative">
          <IconButton
            icon={<HiHeart />}
            onClick={FavoritesDrawerDisclosure?.onToggle}
            aria-label="Favorieten"
          />
          {favorites.length > 0 && (
            <Box
              position="absolute"
              top="-10px"
              right="-10px"
              w="6"
              h="6"
              bg="pink.500"
              color="white"
              rounded="full"
              textAlign="center"
              fontSize="sm"
              data-testid="favorites-amount"
            >
              {favoritesAmount}
            </Box>
          )}
        </Box>
        <Text as="span" color="white" fontWeight="semibold">
          Welkom!
        </Text>
      </Stack>
    </Stack>
  );
}

export default Header;
