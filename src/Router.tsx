import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";

import App from "./App";
import Login from "./pages/Login";
import GlobalDashboard from "./pages/GlobalDashboard";

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
                Component: GlobalDashboard
            }
        ]
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}