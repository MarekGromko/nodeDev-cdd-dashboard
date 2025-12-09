import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";

import App from "./App";
import Login from "./pages/Login";
import DataDashboard from "./pages/DataDashboard";

const router = createBrowserRouter([
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "*",
        Component: App,
        children: [
            {
                index: true,
                Component: DataDashboard
            }
        ]
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}