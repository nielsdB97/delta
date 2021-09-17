import { Heading, Stack } from "@chakra-ui/react";
import ProductGrid from "components/ProductGrid";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <Stack spacing="6">
      <Head>
        <title>InterDelta</title>
      </Head>
      <Heading fontSize="xl">Boormachines</Heading>
      <ProductGrid />
    </Stack>
  );
};

export default Home;
