import { Box, ChakraProvider, Stack } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Header from "components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Stack>
        <Header />
        <Box as="main" padding="4">
          <Component {...pageProps} />
        </Box>
      </Stack>
    </ChakraProvider>
  );
}

export default MyApp;
