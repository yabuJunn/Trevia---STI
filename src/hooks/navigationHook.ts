import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const NavigationHook = () => {
    const navigate = useNavigate();

    const navigateToLanding = useCallback(() => navigate(NavigationRoutes.Landing), [navigate]);
    const navigateToLogin = useCallback(() => navigate(NavigationRoutes.Login), [navigate]);
    const navigateToRegister = useCallback(() => navigate(NavigationRoutes.Register), [navigate]);
    const navigateToDashboard = useCallback(() => navigate(NavigationRoutes.Dashboard), [navigate]);
    const navigateToNewTravel = useCallback(() => navigate(NavigationRoutes.NewTravel), [navigate]);
    const navigateToQuestionnaire = useCallback(() => navigate(NavigationRoutes.Questionnaire), [navigate]);
    const navigateToTravelDetails = useCallback(() => navigate(NavigationRoutes.TravelDetails), [navigate]);

    const handleNavigation = {
        navigateToLanding,
        navigateToLogin,
        navigateToRegister,
        navigateToDashboard,
        navigateToNewTravel,
        navigateToQuestionnaire,
        navigateToTravelDetails
    }

    return {
        handleNavigation
    }
}

export const NavigationRoutes = {
    Landing: "/",
    Login: "/Login",
    Register: "/Register",
    Dashboard: "/Dashboard",
    NewTravel: "/NewTravel",
    Questionnaire: "/Questionnaire",
    TravelDetails: "/TravelDetails",
} as const;
