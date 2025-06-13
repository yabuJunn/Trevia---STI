import "./travelDetails.css";

import { useState } from "react";

import { GlobalSideBar } from "../../components/navigation/globalSideBar/globalSideBar";

import newRecommendationBannerImage from "../../assets/jpg/travelDetailsPage/newRecommendationBannerImage.png"

// Estado posible: "pending" | "ready" | "done"
export const TravelDetailsPage = () => {
    const [status, setStatus] = useState<"pending" | "ready" | "done">("pending");

    // Datos de ejemplo
    const grupo = "Grupo 1";
    const integrantes = [
        { id: 1, name: "Pepito Pérez", answered: false },
        { id: 2, name: "Juan López", answered: false },
        { id: 3, name: "María Gómez", answered: false },
        { id: 4, name: "Ana Ruiz", answered: false },
    ];

    // Handler para simular cambio de estado
    const onComplete = () => setStatus("ready");
    const onRecommend = () => setStatus("done");

    return (
        <main className="page" id="travelDetailsPage">
            <GlobalSideBar />

            <div className="travelDetailsPageContent">
                <div className="travelDetailsCard">
                    {/* HEADER: imagen o fondo */}
                    <div className="travelHeader">
                        {status === "done" ? (
                            <img src="/assets/destino-final.jpg" alt="Destino" />
                        ) : (
                            <img src={newRecommendationBannerImage} alt="Mapa" />
                        )}

                    </div>

                    {/* CUERPO */}
                    <div className="travelBody">
                        <div className="travelHeaderContent">
                            <h2>{grupo}</h2>
                            <button
                                className={`btn-header ${status === "pending"
                                    ? "btn-complete"
                                    : status === "ready"
                                        ? "btn-recommend"
                                        : "btn-done"
                                    }`}
                                onClick={
                                    status === "pending"
                                        ? onComplete
                                        : status === "ready"
                                            ? onRecommend
                                            : undefined
                                }
                                disabled={status === "done"}
                            >
                                {status === "pending"
                                    ? "Completar"
                                    : status === "ready"
                                        ? "Obtener Recomendación"
                                        : "Recomendación hecha"}
                            </button>
                        </div>
                        <p className="subtitle">Lista de los integrantes</p>

                        <ul className="memberList">
                            {integrantes.map((m) => (
                                <li key={m.id}>
                                    <span className="index">{m.id}</span>
                                    <span className="name">{m.name}</span>
                                    <span className="status">
                                        {status === "pending"
                                            ? m.answered
                                                ? "Completado"
                                                : "Por completar"
                                            : "Completado"}
                                    </span>
                                    <svg
                                        className="icon-check"
                                        width="16"
                                        height="16"
                                        fill={status === "pending" && !m.answered ? "#ccc" : "#4CAF50"}
                                    >
                                        {/* ícono de check o cruz */}
                                        {status === "pending" && !m.answered ? (
                                            <path d="M2 2 L14 14 M14 2 L2 14" stroke="#ccc" strokeWidth="2" />
                                        ) : (
                                            <path d="M2 9 L6 13 L14 3" stroke="#4CAF50" strokeWidth="2" fill="none" />
                                        )}
                                    </svg>
                                </li>
                            ))}
                        </ul>

                        {status === "done" && (
                            <>
                                <p className="recommendText">
                                    El mejor destino para este grupo de amigos es…
                                </p>
                                <p className="recommendation">Pasto</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};
