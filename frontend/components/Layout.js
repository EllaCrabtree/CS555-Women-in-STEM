import React from "react";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
    return (
        <div className={styles.main}>
            <div className="main-header">
                <img id="logo" src="/logo.png" alt="Amaterasu Logo" />
                <h1 className="application-Name">Amaterasu</h1>
            </div>
            {children}
        </div>
    );
};

export default Layout;
