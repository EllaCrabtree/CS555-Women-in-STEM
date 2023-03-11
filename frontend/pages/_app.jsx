import "@/styles/globals.css";
import { AuthUserProvider } from "@context/authUserContext"; // the module you created above

export default function App({ Component, pageProps }) {
    return (
        <AuthUserProvider>
            <Component {...pageProps} />
        </AuthUserProvider>
    );
}
