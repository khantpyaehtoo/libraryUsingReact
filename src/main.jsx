import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeContextProvider } from "./contexts/ThemeContexts";
import { AuthContextsProvider } from "./contexts/AuthContexts";
import Router from "./router";

createRoot(document.getElementById("root")).render(
    <AuthContextsProvider>
        <ThemeContextProvider>
            <Router />
        </ThemeContextProvider>
    </AuthContextsProvider>,
);
