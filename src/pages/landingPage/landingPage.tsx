import "./landingPage.css"

import { UpperNavbar } from "../../components/landingPage/upperNavbar/upperNavbar"

import landingPageBackground from "../../assets/jpg/landingPage/landingPageBackground.jpg"

export const LandingPage = () => {
    return <>
        <main className="page" id="landingPage">
            <UpperNavbar></UpperNavbar>

            <section className="landingPageContent">
                <img src={landingPageBackground} alt="Landing Page Background" className="landingPageBackground" />

                <div className="landingPageText">
                    <h1>Vuela</h1>
                    <p>Viaja con tus amigos al destino ideal con nuestras recomendaciones  segun los gustos y preferencias de cada uno.</p>
                    <button>
                        Comenzar
                    </button>
                </div>
            </section>
        </main>
    </>
}