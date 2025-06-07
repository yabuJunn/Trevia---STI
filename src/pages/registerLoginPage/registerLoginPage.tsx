import "./registerLoginPage.css"

import { useLocation } from "react-router-dom"
import { NavigationRoutes } from "../../hooks/navigationHook"

import { RegisterForm } from "../../components/registerLoginPage/registerForm/registerForm"
import { LoginForm } from "../../components/registerLoginPage/loginForm/loginForm"

import loginRegisterBannerImage from "../../assets/jpg/loginRegisterPage/bannerImage.jpg"

export const RegisterLoginPage = () => {
    const location = useLocation();
        console.log("Location:", location);

    const renderForm = () => {
        switch (location.pathname) {
            case NavigationRoutes.Register:
                return <RegisterForm />;
            case NavigationRoutes.Login:
                return <LoginForm />;
            default:
                return <p>Página no encontrada</p>;
        }
    };


    return <>
        <section className="page" id="registerLoginPage">
            <div className="registerLoginPageImage">
                <img src={loginRegisterBannerImage} alt="Banner" />
            </div>
            <div className="registerLoginPageContent">
                {renderForm()}
            </div>
        </section>
    </>
}