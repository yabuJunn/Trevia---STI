import { NavigationRoutes } from "../hooks/navigationHook"

import { LandingPage } from "../pages/landingPage/landingPage"
import { RegisterLoginPage } from "../pages/registerLoginPage/registerLoginPage"

export const mainRoutes = [
    {
        path: NavigationRoutes.Landing,
        element: <LandingPage></LandingPage>,
    },
    {
        path: NavigationRoutes.Register,
        element: <RegisterLoginPage></RegisterLoginPage>,
    },
    {
        path: NavigationRoutes.Login,
        element: <RegisterLoginPage></RegisterLoginPage>,
    }
]