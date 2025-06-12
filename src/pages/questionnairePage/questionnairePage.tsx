import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import './questionnairePage.css';
import questionnaireBannerSideImage from '../../assets/jpg/questionnairePage/questionnairePageSideImage.jpg';

type FormData = {
  // Página 1
  destination: string;
  activities: string[];
  budget: string;
  // Página 2
  lodging: string;
  comfort: string;
  climate: string;
};

export const QuestionnairePage: React.FC = () => {
  const [page, setPage] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormData>({
    destination: '',
    activities: [],
    budget: '',
    lodging: '',
    comfort: '',
    climate: '',
  });

  const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((f) => {
      const next = checked
        ? [...f.activities, value]
        : f.activities.filter((a) => a !== value);
      return { ...f, activities: next };
    });
  };

  const goNext = () => setPage(2);
  const goBack = () => setPage(1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Datos capturados:', formData);
    // aquí podrías enviar a tu API / Supabase...
  };

  return (
    <section className="page" id="questionnairePage">
      <div className="questionnaire-image">
        <img src={questionnaireBannerSideImage} alt="Banner" />
      </div>
      <div className="questionnaire-content">
        <form onSubmit={handleSubmit}>
          {page === 1 && (
            <div className="question-page">
              <h2>1. ¿Qué tipo de destino prefieres?</h2>
              {['Playa','Montaña','Ciudad','Naturaleza','Aventura'].map((opt) => (
                <label key={opt}>
                  <input
                    type="radio"
                    name="destination"
                    value={opt}
                    checked={formData.destination === opt}
                    onChange={handleRadio}
                  />{' '}
                  {opt}
                </label>
              ))}

              <h2>2. ¿Qué actividades disfrutas más? (varias)</h2>
              {[
                'Senderismo',
                'Turismo gastronómico',
                'Vida nocturna',
                'Relajación / Spa',
                'Compras',
                'Museos y cultura',
              ].map((opt) => (
                <label key={opt}>
                  <input
                    type="checkbox"
                    name="activities"
                    value={opt}
                    checked={formData.activities.includes(opt)}
                    onChange={handleCheckbox}
                  />{' '}
                  {opt}
                </label>
              ))}

              <h2>3. ¿Cuál es tu presupuesto?</h2>
              {['Económico ($)','Medio ($$)','Alto ($$$)'].map((opt) => (
                <label key={opt}>
                  <input
                    type="radio"
                    name="budget"
                    value={opt}
                    checked={formData.budget === opt}
                    onChange={handleRadio}
                  />{' '}
                  {opt}
                </label>
              ))}

              <div className="buttons">
                <button type="button" onClick={goNext}>Siguiente →</button>
              </div>
            </div>
          )}

          {page === 2 && (
            <div className="question-page">
              <h2>4. ¿Qué tipo de alojamiento prefieres?</h2>
              {['Hostal','Hotel','Apartamento / Airbnb','Camping','Todo incluido'].map((opt) => (
                <label key={opt}>
                  <input
                    type="radio"
                    name="lodging"
                    value={opt}
                    checked={formData.lodging === opt}
                    onChange={handleRadio}
                  />{' '}
                  {opt}
                </label>
              ))}

              <h2>5. ¿Qué tan dispuesto estás a salir de tu zona de confort?</h2>
              {[
                'Baja: Prefiero lo seguro y planeado',
                'Media: Estoy abierto a nuevas experiencias',
                'Alta: ¡Amo la aventura y lo inesperado!',
              ].map((opt) => (
                <label key={opt}>
                  <input
                    type="radio"
                    name="comfort"
                    value={opt}
                    checked={formData.comfort === opt}
                    onChange={handleRadio}
                  />{' '}
                  {opt}
                </label>
              ))}

              <h2>6. ¿Qué tipo de clima prefieres?</h2>
              {['Cálido y soleado','Templado / Primaveral','Frío y nevado','No tengo preferencia'].map((opt) => (
                <label key={opt}>
                  <input
                    type="radio"
                    name="climate"
                    value={opt}
                    checked={formData.climate === opt}
                    onChange={handleRadio}
                  />{' '}
                  {opt}
                </label>
              ))}

              <div className="buttons">
                <button type="button" onClick={goBack}>← Anterior</button>
                <button type="submit">Completar</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
