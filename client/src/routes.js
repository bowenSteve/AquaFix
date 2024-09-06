import React from "react";
import About from "./components/AboutUs";
import Services from "./components/Services";

const routes = [
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/services",
        element: <Services />
    }
]
export default routes;