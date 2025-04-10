import { Provider } from "react-redux";
import Store from "../../store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "@/styles/globals.css";
import Layout from "@/components/layout";
import { ProviderChakra } from "@/components/ui/Chakra/provider";
export default function App({ Component, pageProps }) {
  const persistor = persistStore(Store);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Provider store={Store}> 
      <PersistGate persistor={persistor}>
        <ProviderChakra>
      {getLayout(<Component {...pageProps} />)}
      </ProviderChakra>
       </PersistGate> 
       </Provider>
    </>
  );
}
