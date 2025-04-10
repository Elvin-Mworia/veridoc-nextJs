// src/components/ui/provider.js
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Optional: Add your custom Chakra theme here
const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  // You can extend more here (colors, styles, etc.)
});

export function ProviderChakra({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
