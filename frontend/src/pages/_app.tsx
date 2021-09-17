import { Box, ChakraProvider, Stack } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import type { AppProps } from "next/app";
import Header from "components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Header />
          <Box as="main" padding="4">
            <Component {...pageProps} />
          </Box>
        </Stack>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
