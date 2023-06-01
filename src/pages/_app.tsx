import "@/styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { store } from "@/app/store/store";
import Layout from "@/Components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}
