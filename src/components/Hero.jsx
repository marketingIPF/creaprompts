import { useState } from 'react';
import { HERO_STYLES } from '../data/heroStyles';

export default function Hero({ onSelectStyle }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [broken, setBroken] = useState(false);
  const active = HERO_STYLES[activeIndex];

  const handlePick = (index) => {
    const style = HERO_STYLES[index];

    if (selectedTitle === style.title) {
      // Ya estaba seleccionado: deseleccionar y volver a la vista normal
      setSelectedTitle(null);
      onSelectStyle('');
      return;
    }

    setActiveIndex(index);
    setBroken(false);
    setSelectedTitle(style.title);
    onSelectStyle(style.title);
  };

  return (
    <div className="hero">
      <div className="hero-image">
        {broken ? (
          <div className="hero-image-fallback">🛋️</div>
        ) : (
          <img src={active.file} alt={active.title} onError={() => setBroken(true)} />
        )}
        <div className="hero-scrim" />
        <div className="hero-copy">
          <span className="hero-eyebrow">🛋️ Estilos más utilizados</span>
          <h1 className="hero-title">{active.title}</h1>
          <span className="hero-hint">Pulsa un estilo para ver todos sus prompts, en cualquier estancia</span>
        </div>
      </div>

      <div className="hero-pills">
        {HERO_STYLES.map((style, i) => (
          <button
            key={style.title}
            className={`hero-pill${selectedTitle === style.title ? ' active' : ''}`}
            onClick={() => handlePick(i)}
          >
            {style.title}
          </button>
        ))}
      </div>
    </div>
  );
}
