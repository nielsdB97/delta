import { Stack, Heading, Text, IconButton } from "@chakra-ui/react";
import { FavoritesDrawerOpenContext } from "context/FavoritesDrawerOpenContext";
import { useContext } from "react";
import { HiHeart } from "react-icons/hi";

function Header() {
  const FavoritesDrawerDisclosure = useContext(FavoritesDrawerOpenContext);

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
        <IconButton
          icon={<HiHeart />}
          onClick={FavoritesDrawerDisclosure?.onToggle}
          aria-label="Favorieten"
        />
        <Text as="span" color="white" fontWeight="semibold">
          Welkom Niels!
        </Text>
      </Stack>
    </Stack>
  );
}

export default Header;
