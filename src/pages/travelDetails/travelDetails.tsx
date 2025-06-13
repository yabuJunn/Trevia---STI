// src/pages/TravelDetailsPage.tsx
import React, { useEffect } from "react";
import "./travelDetails.css";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { GlobalSideBar } from "../../components/navigation/globalSideBar/globalSideBar";
import { NavigationHook } from "../../hooks/navigationHook";
import { getUser } from "../../services/supabase/supabaseGetUser";
import { setUser } from "../../store/userSlice";
import { setCurrentQuestionaireName } from "../../store/groupsTravelSlice";
import newRecommendationBannerImage from "../../assets/jpg/travelDetailsPage/newRecommendationBannerImage.png";
import { requestRecommendation } from "../../services/apiRecommendation/getRecomendation";

// ... importa aquí tu función que pedirá la recomendación a tu API ...
// import { fetchRecommendation } from "../../services/api/recommendation";

export const TravelDetailsPage: React.FC = () => {
    const dispatch = useDispatch();

    // recarga los datos cuando entramos
    useEffect(() => {
        (async () => {
            const result = await getUser();
            if (result.success && result.data) {
                dispatch(setUser(result.data));
            }
        })();
    }, [dispatch]);

    const { handleNavigation } = NavigationHook();
    const userGroups = useSelector(
        (state: RootState) => state.user.profile?.groups
    );
    const selectedGroupId = useSelector(
        (state: RootState) => state.group.selectedGroup
    );
    const currentUser = useSelector(
        (state: RootState) => state.user.profile
    );
    const selectedGroup =
        userGroups?.find((g) => g.id === selectedGroupId) ?? null;

    if (!selectedGroup) {
        return (
            <main className="page" id="travelDetailsPage">
                <GlobalSideBar />
                <div className="travelDetailsPageContent">
                    <p>No hay ningún grupo seleccionado.</p>
                </div>
            </main>
        );
    }

    const { id, type, members = [], imageUrl, destination } = selectedGroup;

    // 1) ¿Todos completaron su cuestionario?
    const allCompleted = members.every((m) => m.questionnaireCompleted);

    // 2) Derivamos el estado del botón principal:
    //    pending = faltan respuestas
    //    ready   = todos respondieron, aún no pedimos recomendación
    //    done    = ya es afterRecommendation
    const status: "pending" | "ready" | "done" =
        type === "afterRecommendation"
            ? "done"
            : allCompleted
                ? "ready"
                : "pending";

    // 3) Handler para pedir recomendación
    // dentro de tu handler onGetRecommendation:
    const onGetRecommendation = async () => {
        if (status !== "ready") return;
        if (currentUser) {
            const result = await requestRecommendation(
                currentUser?.id,
                selectedGroup.id,
                selectedGroup.members || []
            );
            if (!result.success) {
                console.error("Error al pedir recomendación:", result.message);
            } else {
                console.log("Recomendación recibida:", result.recommendation);
                const fetchUserData = async () => {
                    const result = await getUser();
                    if (result.success && result.data) {
                        dispatch(setUser(result.data));
                    } else {
                        console.error('Error fetching user data:', result.message);
                    }
                };
                fetchUserData();
            }
        }

    };

    // 4) Handler para clic en integrante inconcluso
    const handleMemberClick = (memberName: string, completed: boolean) => {
        if (!completed) {
            dispatch(setCurrentQuestionaireName(memberName));
            handleNavigation.navigateToQuestionnaire();
        }
    };

    return (
        <main className="page" id="travelDetailsPage">
            <GlobalSideBar />

            <div className="travelDetailsPageContent">
                <div className="travelDetailsCard">
                    <div className="travelHeader">
                        {status === "done" && imageUrl ? (
                            <img src={imageUrl} alt={`Destino ${destination}`} />
                        ) : (
                            <img src={newRecommendationBannerImage} alt="Mapa" />
                        )}
                    </div>

                    <div className="travelBody">
                        <div className="travelHeaderContent">
                            <h2>Grupo {id}</h2>
                            <button
                                className={`btn-header ${status === "pending"
                                    ? "btn-disabled"
                                    : status === "ready"
                                        ? "btn-recommend"
                                        : "btn-done"
                                    }`}
                                onClick={status === "ready" ? onGetRecommendation : undefined}
                                disabled={status !== "ready"}
                            >
                                {status === "pending"
                                    ? "Esperando respuestas"
                                    : status === "ready"
                                        ? "Obtener Recomendación"
                                        : "Recomendación hecha"}
                            </button>
                        </div>

                        <p className="subtitle">Lista de los integrantes</p>
                        <ul className="memberList">
                            {members.map((m, idx) => {
                                const isCompleted = m.questionnaireCompleted;
                                return (
                                    <li
                                        key={idx}
                                        className={!isCompleted ? "clickable" : undefined}
                                        onClick={() =>
                                            handleMemberClick(m.name, isCompleted)
                                        }
                                    >
                                        <span className="index">{idx + 1}</span>
                                        <span className="name">{m.name}</span>
                                        <span className="status">
                                            {isCompleted ? "Completado" : "Por completar"}
                                        </span>
                                        <svg
                                            className="icon-check"
                                            width="16"
                                            height="16"
                                            fill={isCompleted ? "#4CAF50" : "#ccc"}
                                        >
                                            {isCompleted ? (
                                                <path
                                                    d="M2 9 L6 13 L14 3"
                                                    stroke="#4CAF50"
                                                    strokeWidth="2"
                                                    fill="none"
                                                />
                                            ) : (
                                                <path
                                                    d="M2 2 L14 14 M14 2 L2 14"
                                                    stroke="#ccc"
                                                    strokeWidth="2"
                                                />
                                            )}
                                        </svg>
                                    </li>
                                );
                            })}
                        </ul>

                        {status === "done" && (
                            <>
                                <p className="recommendText">
                                    El mejor destino para este grupo de amigos es…
                                </p>
                                <p className="recommendation">{destination}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};
