import {
  Box,
  ChakraProvider,
  Drawer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import type { AppProps } from "next/app";
import Header from "components/Header";
import { FavoritesDrawerOpenContext } from "context/FavoritesDrawerOpenContext";
import FavoritesDrawer from "components/FavoritesDrawer";
import { useFavorites } from "store/useFavorites";
import { FavoritesContext } from "context/FavoritesContext";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  const FavoritesDrawerDisclosure = useDisclosure();
  const [favorites, dispatch] = useFavorites();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <FavoritesDrawerOpenContext.Provider value={FavoritesDrawerDisclosure}>
          <FavoritesContext.Provider value={[favorites, dispatch]}>
            <Stack>
              <Header />
              <Box as="main" padding="4">
                <Component {...pageProps} />
              </Box>
            </Stack>
            <FavoritesDrawer
              isOpen={FavoritesDrawerDisclosure.isOpen}
              onClose={FavoritesDrawerDisclosure.onClose}
            />
          </FavoritesContext.Provider>
        </FavoritesDrawerOpenContext.Provider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
