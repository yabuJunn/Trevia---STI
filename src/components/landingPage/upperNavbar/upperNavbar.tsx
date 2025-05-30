import "./upperNavbar.css"

import navBarLogo from "../../../assets/svg/logos/logoTrevioBlue.svg"

export const UpperNavbar = () => {
    return <>
        <nav id="upperNavbarLanding">
            <img src={navBarLogo} alt={navBarLogo} className="logoLanding"/>

            <div id="navNavigationLanding">
                <button id="navLoging">
                    Iniciar sesión
                </button>
                <button id="navRegister">
                    Registrarse
                </button>
            </div>
        </nav>
    </>
}