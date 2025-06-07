import "./upperNavbar.css"

import navBarLogo from "../../../assets/svg/logos/logoTrevioBlue.svg"

import { NavigationHook } from "../../../hooks/navigationHook";

export const UpperNavbar = () => {
    const { handleNavigation } = NavigationHook();

    return <>
        <nav id="upperNavbarLanding">
            <img src={navBarLogo} alt={navBarLogo} className="logoLanding" />

            <div id="navNavigationLanding">
                <button id="navLoging" onClick={() => { handleNavigation.navigateToLogin() }}>
                    Iniciar sesión
                </button>
                <button id="navRegister" onClick={() => { handleNavigation.navigateToRegister() }}>
                    Registrarse
                </button>
            </div>
        </nav>
    </>
}