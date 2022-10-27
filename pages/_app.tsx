import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AppContextProvider } from "../context/appContext";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <AppContextProvider>
        <ChakraProvider>
        <Head>
					<title>next todo 7</title>
				</Head>
          <Component {...pageProps} />
        </ChakraProvider>
      </AppContextProvider>
  );
}

export default MyApp;
