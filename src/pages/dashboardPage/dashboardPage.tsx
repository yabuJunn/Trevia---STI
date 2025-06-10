import "./dashboardPage.css"

import { GlobalSideBar } from "../../components/navigation/globalSideBar/globalSideBar"

export const DashboardPage = () => {
    return <>
        <main className="page" id="dashboardPage">
            <GlobalSideBar></GlobalSideBar>
        </main>
    </>
}