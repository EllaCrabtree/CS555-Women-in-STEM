import "@/styles/globals.css";
import initAuth from "../initAuth"; // the module you created above

initAuth();

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
