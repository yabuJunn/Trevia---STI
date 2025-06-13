// src/pages/TravelDetailsPage.tsx
import React from "react";
import "./travelDetails.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { GlobalSideBar } from "../../components/navigation/globalSideBar/globalSideBar";
import { NavigationHook } from "../../hooks/navigationHook";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import newRecommendationBannerImage from "../../assets/jpg/travelDetailsPage/newRecommendationBannerImage.png";
import { setCurrentQuestionaireName } from "../../store/groupsTravelSlice";
import { getUser } from "../../services/supabase/supabaseGetUser";
import { setUser } from "../../store/userSlice";

export const TravelDetailsPage: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUserData = async () => {
            const result = await getUser();
            if (result.success && result.data) {
                dispatch(setUser(result.data));
            } else {
                console.error('Error fetching user data:', result.message);
            }
        };
        fetchUserData();
    }, [dispatch]);

    const { handleNavigation } = NavigationHook()
    const userGroups = useSelector(
        (state: RootState) => state.user.profile?.groups
    );
    const selectedGroupId = useSelector(
        (state: RootState) => state.group.selectedGroup
    );

    const selectedGroup =
        userGroups?.find((g) => g.id === selectedGroupId) ?? null;

    const status: "pending" | "done" =
        selectedGroup?.type === "afterRecommendation" ? "done" : "pending";

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

    const onComplete = async () => {
        // await updateGroupType(userId, id, 'afterRecommendation');
        // refresca el slice o recarga el grupo
    };

    const handleMemberClick = (memberName: string, completed: boolean) => {
        if (!completed) {
            // puedes ajustar la ruta según tu router
            dispatch(setCurrentQuestionaireName(memberName))
            handleNavigation.navigateToQuestionnaire()
        }
    };



    return (
        <main className="page" id="travelDetailsPage">
            <GlobalSideBar />

            <div className="travelDetailsPageContent">
                <div className="travelDetailsCard">
                    <div className="travelHeader">
                        {status === "done" && type === "afterRecommendation" && imageUrl ? (
                            <img src={imageUrl} alt={`Destino ${destination}`} />
                        ) : (
                            <img src={newRecommendationBannerImage} alt="Mapa" />
                        )}
                    </div>

                    <div className="travelBody">
                        <div className="travelHeaderContent">
                            <h2>Grupo {id}</h2>
                            <button
                                className={`btn-header ${status === "pending" ? "btn-complete" : "btn-done"
                                    }`}
                                onClick={status === "pending" ? onComplete : undefined}
                                disabled={status === "done"}
                            >
                                {status === "pending" ? "Completar" : "Recomendación hecha"}
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
                                        onClick={() => handleMemberClick(m.name, isCompleted)}
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

                        {status === "done" && type === "afterRecommendation" && (
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
