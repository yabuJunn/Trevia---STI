import "./globalSideBar.css"

import { logOutSupabase } from "../../../services/supabase/supabaseLogOut"
import { NavigationHook } from "../../../hooks/navigationHook"

import logoTrevioWhite from "../../../assets/svg/logos/logoTrevioWhite.svg"
import logoutIcon from "../../../assets/svg/icons/logout.svg"

export const GlobalSideBar = () => {
    const { handleNavigation } = NavigationHook();

    const handleLogout = async () => {
        const result = await logOutSupabase();
        if (result.success) {
            console.log("Logout successful");
            handleNavigation.navigateToLogin(); // Redirige al login después de cerrar sesión
        } else {
            console.error("Error logging out:", result.message);
        }
    }

    return <>
        <aside className="globalSideBar">
            <img src={logoTrevioWhite} alt="Logo Trevio" />

            <div className="globalSideBarContent">
                <p>Pepito Perez</p>
                <p>pepitoperez@gmail.com</p>
            </div>

            <div className="logOutContent" onClick={handleLogout}>
                <img src={logoutIcon} alt="Logout Icon" />
                <p>Salir</p>
            </div>
        </aside>
    </>
}