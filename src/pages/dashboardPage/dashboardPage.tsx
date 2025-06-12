import "./dashboardPage.css";
import { GlobalSideBar } from "../../components/navigation/globalSideBar/globalSideBar";
import { GroupCard } from "../../components/dashboardPage/dashboardTravelRecomendation/dashboardTravelRecomendation";

// Mock de datos como base para Supabase
const mockGroups = [
  {
    id: 1,
    type: "beforeRecommendation" as const,
    members: ["Pepito Pérez", "Sofía Pérez", "Valentina Pérez"],
  },
  {
    id: 2,
    type: "afterRecommendation" as const,
    destination: "Pasto",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // ejemplo libre
    members: ["Pepito Pérez", "Sofía Pérez", "Valentina Pérez"],
  },
  {
    id: 3,
    type: "newGroup" as const,
  },
];

export const DashboardPage = () => {
  const handleClick = (id: number) => {
    console.log("Clic en grupo ID:", id);
  };

  return (
    <>
      <main className="page" id="dashboardPage">
        <GlobalSideBar />

        <div className="dashboardPageContent">
          <div className="dashboardPageHeader">
            <h1>¡Hola, Sofia!</h1>
            <p>
              Desde aquí podrás gestionar tus viajes, ver tus recomendaciones y
              mucho más.
            </p>
          </div>

          <div className="dashboardPageMainContent flex gap-6 flex-wrap">
            {mockGroups.map((group) => {
              if (group.type === "beforeRecommendation") {
                return (
                  <GroupCard
                    key={group.id}
                    type="beforeRecommendation"
                    members={group.members}
                    onClick={() => handleClick(group.id)}
                  />
                );
              }

              if (group.type === "afterRecommendation") {
                return (
                  <GroupCard
                    key={group.id}
                    type="afterRecommendation"
                    members={group.members}
                    destination={group.destination}
                    imageUrl={group.imageUrl}
                    onClick={() => handleClick(group.id)}
                  />
                );
              }

              return (
                <GroupCard
                  key={group.id}
                  type="newGroup"
                  onClick={() => handleClick(group.id)}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};