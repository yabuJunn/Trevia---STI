import "./globalSideBar.css"

import logoTrevioWhite from "../../../assets/svg/logos/logoTrevioWhite.svg"
import logoutIcon from "../../../assets/svg/icons/logout.svg"

export const GlobalSideBar = () => {
    return <>
        <aside className="globalSideBar">
            <img src={logoTrevioWhite} alt="Logo Trevio" />

            <div className="globalSideBarContent">
                <p>Pepito Perez</p>
                <p>pepitoperez@gmail.com</p>
            </div>

            <div className="logOutContent">
                <img src={logoutIcon} alt="Logout Icon" />
                <p>Salir</p>
            </div>
        </aside>
    </>
}