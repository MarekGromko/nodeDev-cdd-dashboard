import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router";

import App from "./App";
import Login from "./pages/Login";
import GlobalDashboard from "./pages/GlobalDashboard";
import CurrencyDashboard from "./pages/CurrencyDashboard";
import { isLoggedIn } from "./helpers/helpers";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "*",
        Component: App,
        loader: () => {
            if (!isLoggedIn())
                return redirect("/login");
        },
        children: [
            {
                index: true,
                Component: GlobalDashboard
            },
            {
                path: 'currency',
                Component: CurrencyDashboard
            },
            {
                path: 'settings',
                Component: Settings
            }
        ]
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}