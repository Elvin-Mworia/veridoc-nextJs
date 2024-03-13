import {Provider} from "react-redux";
import Store from "../../store/store";
import {persistStore} from "redux-persist"
import {PersistGate} from "redux-persist/integration/react"
export default function App({ Component, pageProps }) {
  const persistor=persistStore(Store);
  return (<>
    <Provider store={Store}>
    <PersistGate persistor={persistor}>
    <Component {...pageProps} />
    </PersistGate>
  
  </Provider>

    </>
  )
}
