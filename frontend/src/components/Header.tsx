import { Stack, Heading, Text, IconButton } from "@chakra-ui/react";
import { HiHeart } from "react-icons/hi";

function Header() {
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
        <IconButton icon={<HiHeart />} aria-label="Favorites" />
        <Text as="span" color="white" fontWeight="semibold">
          Welkom Niels!
        </Text>
      </Stack>
    </Stack>
  );
}

export default Header;
