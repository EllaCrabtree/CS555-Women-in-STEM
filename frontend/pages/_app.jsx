import { AuthUserProvider } from "@contexts/authUserContext"; // the module you created above
import Layout from "@components/Layout";
import "@styles/globals.css";

export default function App({ Component, pageProps }) {
    return (

        <AuthUserProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout> 
        </AuthUserProvider>
    );
}
