import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="main">
            <div className="main-container">
                <div className="main-header">
                    <img id="logo" src="/logo.png" alt="Amaterasu Logo" />
                    <h1 className="application-Name">Amaterasu</h1>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Layout;
