import React from "react";
import { Header, Footer } from "./";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <ToastContainer />
            <Footer />
        </div>
    );
};

export default Layout;
