import {Provider} from "react-redux";
import store from "../store/store";
import {persistStore} from "redux-persist"
import {PersistGate} from "redux-persist/integration/react"
export default function App({ Component, pageProps }) {
  const persistor=persistStore(store);
  return (<>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <Component {...pageProps} />
    </PersistGate>
  
  </Provider>

    </>
  )
}
