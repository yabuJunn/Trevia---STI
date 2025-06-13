import "./globalSideBar.css"

import { logOutSupabase } from "../../../services/supabase/supabaseLogOut"
import { NavigationHook } from "../../../hooks/navigationHook"
import { useSelector } from "react-redux"
import { type RootState } from "../../../store/store"

import logoTrevioWhite from "../../../assets/svg/logos/logoTrevioWhite.svg"
import logoutIcon from "../../../assets/svg/icons/logout.svg"

export const GlobalSideBar = () => {
    const user = useSelector((state: RootState) => state.user.profile); // Asegúrate de que el estado de autenticación esté configurado correctamente
    
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
                <p>{user?.name}</p>
                <p>{user?.email}</p>
            </div>

            <div className="logOutContent" onClick={handleLogout}>
                <img src={logoutIcon} alt="Logout Icon" />
                <p>Salir</p>
            </div>
        </aside>
    </>
}