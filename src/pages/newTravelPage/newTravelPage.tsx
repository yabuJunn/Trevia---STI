import "./newTravelPage.css";

import { useState } from "react";

import newTravelBackgroundImage from "../../assets/jpg/newTravel/newTravelBackground.jpg";

export const NewTravelPage = () => {
    const [nameInput, setNameInput] = useState("");
    const [members, setMembers] = useState<string[]>([]);

    const handleAdd = () => {
        const trimmed = nameInput.trim();
        if (!trimmed) return;
        setMembers(prev => [...prev, trimmed]);
        setNameInput("");
    };

    return (
        <section className="newTravelPage">
            {/* Fondo */}
            <div className="newTravelBackground">
                <img src={newTravelBackgroundImage} alt="Fondo viaje" />
            </div>

            {/* Contenido superpuesto */}
            <div className="newTravelOverlay">
                <h2>Ingresa las personas con las que quieres ir</h2>

                <div className="inputContainer">
                    <input
                        type="text"
                        placeholder="Pepito Pérez"
                        value={nameInput}
                        onChange={e => setNameInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleAdd()}
                    />
                    <button
                        className="btn-add-member"
                        onClick={handleAdd}
                        disabled={!nameInput.trim()}
                    >
                        +
                    </button>


                </div>

                <button className="btn-next" onClick={() => console.log("Crear:", members)}>
                    <span>Siguiente</span>
                </button>

                <ul className="memberList">
                    {members.map((m, i) => (
                        <li key={i}>
                            <span className="member-index">{i + 1}</span>
                            <span className="member-name">{m}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
