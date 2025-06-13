import "./dashboardPage.css";

import { GlobalSideBar } from "../../components/navigation/globalSideBar/globalSideBar";
import { GroupCard } from "../../components/dashboardPage/dashboardTravelRecomendation/dashboardTravelRecomendation";
import { getUser, type group } from "../../services/supabase/supabaseGetUser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import type { RootState } from "../../store/store";
import React from "react";


// const mockGroups: group[] = [
//   {
//     id: 1,
//     type: 'beforeRecommendation',
//     members: [
//       { name: 'Pepito Pérez', questionnaireCompleted: false },
//       { name: 'Sofía Pérez', questionnaireCompleted: false },
//       { name: 'Valentina Pérez', questionnaireCompleted: false },
//     ],
//   },
//   {
//     id: 2,
//     type: 'afterRecommendation',
//     // puedes seguir manteniendo destination/imageUrl en el mock,
//     // aunque tu tipo real de `group` no lo incluya
//     destination: 'Pasto',
//     imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
//     members: [
//       { name: 'Pepito Pérez', questionnaireCompleted: true, questionnaireData: { 
//           destination: 'Pasto', activities: ['Playas'], budget: 'Medio ($$)',
//           lodging: 'Hotel', comfort: 'Media: Estoy abierto...', climate: 'Cálido y soleado'
//       } },
//       { name: 'Sofía Pérez', questionnaireCompleted: false },
//       { name: 'Valentina Pérez', questionnaireCompleted: false },
//     ],
//   },
//   {
//     id: 3,
//     type: 'newGroup',
//     // no members aquí
//   },
// ];

export const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.profile);

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

  const handleClick = (id: number) => {
    console.log('Clic en grupo ID:', id);
  };

  // Preparamos el array de grupos + el nuevo grupo al final
  const groupsWithNew = React.useMemo(() => {
    const existing: group[] = user?.groups ?? [];
    const nextId = existing.length > 0
      ? Math.max(...existing.map(g => g.id)) + 1
      : 1;
    return [
      ...existing,
      { id: nextId, type: 'newGroup' } as group
    ];
  }, [user?.groups]);

  return (
    <main className="page" id="dashboardPage">
      <GlobalSideBar />

      <div className="dashboardPageContent">
        <div className="dashboardPageHeader">
          <h1>¡Hola, {user?.name}!</h1>
          <p>
            Desde aquí podrás gestionar tus viajes, ver tus recomendaciones y
            mucho más.
          </p>
        </div>

        <div className="dashboardPageMainContent flex gap-6 flex-wrap">
          {groupsWithNew.map((grp) => {
            // Sacamos sólo los nombres para el GroupCard
            const memberNames = grp.members?.map(m => m.name) ?? [];

            if (grp.type === 'beforeRecommendation') {
              return (
                <GroupCard
                  key={grp.id}
                  type="beforeRecommendation"
                  members={memberNames}
                  onClick={() => handleClick(grp.id)}
                />
              );
            }

            if (grp.type === 'afterRecommendation') {
              return (
                <GroupCard
                  key={grp.id}
                  type="afterRecommendation"
                  members={memberNames}
                  destination={grp.destination!}
                  imageUrl={grp.imageUrl!}
                  onClick={() => handleClick(grp.id)}
                />
              );
            }

            // newGroup
            return (
              <GroupCard
                key={grp.id}
                type="newGroup"
                onClick={() => handleClick(grp.id)}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};