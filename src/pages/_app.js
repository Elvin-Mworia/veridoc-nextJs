import { Provider } from "react-redux";
import Store from "../../store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "@/styles/globals.css";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }) {
  const persistor = persistStore(Store);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      {/* <Provider store={store}> */}
      {/* <PersistGate persistor={persistor}> */}
      {getLayout(<Component {...pageProps} />)}
      {/* </PersistGate> */}
      {/* </Provider> */}
    </>
  );
}
