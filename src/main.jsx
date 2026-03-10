import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router/index";
import { ThemeContextProvider } from "./contexts/ThemeContexts";
import { AuthContextsProvider } from "./contexts/AuthContexts";

createRoot(document.getElementById("root")).render(
    <AuthContextsProvider>
        <ThemeContextProvider>
            <RouterProvider router={router} />
        </ThemeContextProvider>
    </AuthContextsProvider>,
);
