import "../styles/global.css";
import { DataContextProvider } from "../context/DataContext";

export default function App({ Component, pageProps }) {
  return (
    <DataContextProvider>
      <Component {...pageProps} />
    </DataContextProvider>
  );
}
