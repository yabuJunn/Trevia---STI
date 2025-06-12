import "./dashboardTravelRecomendation.css"

type GroupCardProps =
    | {
        type: 'beforeRecommendation';
        members: string[];
        onClick: () => void;
    }
    | {
        type: 'afterRecommendation';
        members: string[];
        destination: string;
        imageUrl: string;
        onClick: () => void;
    }
    | {
        type: 'newGroup';
        onClick: () => void;
    };

import imageWorldMap from "../../../assets/jpg/dashboardPage/world-map.jpg"

export const GroupCard: React.FC<GroupCardProps> = (props) => {
  if (props.type === 'newGroup') {
    return (
      <div className="new-group-card" onClick={props.onClick}>
        <div className="new-group-card__text">
          <p className="new-group-card__title">Nuevo grupo</p>
          <p className="new-group-card__plus">+</p>
        </div>
      </div>
    );
  }

  const { members, onClick } = props;
  const memberNames = members.join(', ');

  return (
    <div className="group-card">
      <div className="group-card__image">
        <img
          src={
            props.type === 'beforeRecommendation'
              ? imageWorldMap
              : props.imageUrl
          }
          alt="Group preview"
        />
      </div>
      <div className="group-card__body">
        <div>
          <p className="group-card__title">
            {props.type === 'beforeRecommendation'
              ? 'Recomendación...'
              : `Recomendación: ${props.destination}`}
          </p>
          <p className="group-card__members">
            Integrantes {memberNames}
          </p>
        </div>
        <button
          className="group-card__button"
          onClick={onClick}
        >
          {props.type === 'beforeRecommendation' ? 'Completar' : 'Ver'}
        </button>
      </div>
    </div>
  );
};