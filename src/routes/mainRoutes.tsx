import { NavigationRoutes } from "../hooks/navigationHook"

import { LandingPage } from "../pages/landingPage/landingPage"
import { RegisterLoginPage } from "../pages/registerLoginPage/registerLoginPage"
import { DashboardPage } from "../pages/dashboardPage/dashboardPage"
import { QuestionnairePage } from "../pages/questionnairePage/questionnairePage"

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
    },
    {
        path: NavigationRoutes.Dashboard,
        element: <DashboardPage></DashboardPage>,
    },
    {
        path: NavigationRoutes.Questionnaire,
        element: <QuestionnairePage></QuestionnairePage>
    }
]