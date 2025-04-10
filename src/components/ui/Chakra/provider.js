// src/components/ui/provider.js
import { ChakraProvider,createSystem,defaultConfig,defineConfig, } from "@chakra-ui/react";

// Optional: Add your custom Chakra theme here

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
      fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
      }
    },
  },
})

const system=createSystem(defaultConfig,config);
export function ProviderChakra({ children }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
