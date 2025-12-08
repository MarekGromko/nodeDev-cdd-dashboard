import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";

import App from "./App";

let router = createBrowserRouter([
    {
        path: "*",
        Component: App,
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}