import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import BackgroundChanger from "./components/BackgroundChanger";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthContextProvider } from "./context/authContext";
import { AlertProvider } from "./context/AlertContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthContextProvider>
                <AlertProvider>
                    <HomePage />
                </AlertProvider>
            </AuthContextProvider>
        ),
    },
    {
        path: "/about-us",
        element: (
            <AuthContextProvider>
                <AlertProvider>
                    <AboutUsPage />
                </AlertProvider>
            </AuthContextProvider>
        ),
    },
    {
        path: "/contact",
        element: (
            <AuthContextProvider>
                <AlertProvider>
                    <ContactPage />
                </AlertProvider>
            </AuthContextProvider>
        ),
    },
    {
        path: "/signup",
        element: (
            <AuthContextProvider>
                <AlertProvider>
                    <SignupPage />
                </AlertProvider>
            </AuthContextProvider>
        ),
    },
    {
        path: "/dashboard",
        element: (
            <AuthContextProvider>
                <AlertProvider>
                    <DashboardPage />
                </AlertProvider>
            </AuthContextProvider>
        ),
    },
]);

function HomePage() {
    return (
        <div className="App">
            <BackgroundChanger />
            <div className="colorOverlay" />
            <Navbar />
            <Home />
            <Footer />
        </div>
    );
}

function AboutUsPage() {
    return (
        <div className="App">
            <Navbar />
            <AboutUs />
        </div>
    );
}

function ContactPage() {
    return (
        <div className="App">
            <BackgroundChanger />
            <div className="colorOverlay" />
            <Navbar />
            <Contact />
            <Footer />
        </div>
    );
}

function SignupPage() {
    return (
        <div className="App">
            <BackgroundChanger />
            <div className="colorOverlay" />
            <Navbar />
            <Signup />
            <Footer />
        </div>
    );
}

function DashboardPage() {
    return (
        <div className="App">
            <Navbar />
            <Dashboard />
        </div>
    );
}

function App() {
    return <RouterProvider router={router} />;
}

export default App;
