import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Layout from "../pages/layouts/Layout.jsx";
import BookForm from "../pages/BookForm.jsx";
import Search from "../pages/Search.jsx";
import NotFound from "../pages/NotFound.jsx";
import BookDetail from "../pages/BookDetail.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/books/:id",
                element: <BookDetail />,
            },
            {
                path: "/create",
                element: <BookForm />,
            },
            {
                path: "/edit/:id",
                element: <BookForm />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export default router;
