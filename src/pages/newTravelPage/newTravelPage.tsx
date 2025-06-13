import "./newTravelPage.css";

import { useEffect, useState } from "react";
import { addNewGroup } from "../../services/supabase/supabaseCreateGroups";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { NavigationHook } from "../../hooks/navigationHook";
import { useDispatch } from "react-redux";

import newTravelBackgroundImage from "../../assets/jpg/newTravel/newTravelBackground.jpg";
import { getUser } from "../../services/supabase/supabaseGetUser";
import { setUser } from "../../store/userSlice";

export const NewTravelPage = () => {
    const [nameInput, setNameInput] = useState("");
    const [members, setMembers] = useState<string[]>([]);
    const { handleNavigation } = NavigationHook()
    const user = useSelector((state: RootState) => state.user.profile);
    const [error, setError] = useState<string | null>(null)
    const dispatch = useDispatch()

    const handleAdd = () => {
        const trimmed = nameInput.trim();
        if (!trimmed) return;
        setMembers(prev => [...prev, trimmed]);
        setNameInput("");
    };

    const handleNext = async () => {
        if (members.length >= 2) {
            if (user?.id) {
                const result = await addNewGroup(user.id, members);
                if (result.success) {
                    console.log('Grupo creado:', result.newGroup);
                    handleNavigation.navigateToDashboard()
                } else {
                    console.error('Error al crear grupo:', result.message);
                    setError("Error al crear grupo:" + result.message)
                }
            } else {
                console.error('Error al crear grupo:', "User id es nulo");
                setError("Agrega mas personas al grupo")
            }
        } else {
            setError("Agrega mas personas al grupo")
        }
    };

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
                        placeholder="Ingresa el nombre de tu amigo"
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

                {error && <p id="errorRegister">{error}</p>}

                <button className="btn-next" onClick={() => handleNext()}>
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
