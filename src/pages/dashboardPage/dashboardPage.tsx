import "./dashboardPage.css"

import { GlobalSideBar } from "../../components/navigation/globalSideBar/globalSideBar"

export const DashboardPage = () => {
    return <>
        <main className="page" id="dashboardPage">
            <GlobalSideBar></GlobalSideBar>

            <div className="dashboardPageContent">
                <div className="dashboardPageHeader">
                    <h1>¡Hola, Sofia!</h1>
                    <p>Desde aquí podrás gestionar tus viajes, ver tus recomendaciones y mucho más.</p>
                </div>

                <div className="dashboardPageMainContent">

                </div>
            </div>
        </main>
    </>
}