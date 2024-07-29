// pages/_app.js
import '../styles/globals.css'; // Import global CSS here
import '../styles/Home.module.css'; // Import component-specific CSS modules as needed

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
