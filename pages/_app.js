// // pages/_app.js
// import '../styles/globals.css'; // Import global CSS here
// import '../styles/Home.module.css'; // Import component-specific CSS modules as needed
// pages/_app.js
import '../styles/globals.css'; // Import global CSS for styling across the entire application
import '../styles/Home.module.css'; // Import component-specific CSS modules if needed for styling components

function MyApp({ Component, pageProps }) {
    // This component is the top-level component for all pages
    // It receives the Component and pageProps from Next.js
    return <Component {...pageProps} />;
}

export default MyApp;
