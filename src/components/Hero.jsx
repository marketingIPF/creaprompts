import { useState } from 'react';
import { HERO_STYLES } from '../data/heroStyles';

function HeroTile({ style, onSelect }) {
  const [broken, setBroken] = useState(false);

  return (
    <button className="hero-tile" onClick={() => onSelect(style.title)}>
      {broken ? (
        <div className="hero-tile-fallback">🖼️</div>
      ) : (
        <img src={style.file} alt={style.title} onError={() => setBroken(true)} loading="lazy" />
      )}
      <span className="hero-tile-label">{style.title}</span>
    </button>
  );
}

export default function Hero({ onSelectStyle }) {
  return (
    <div className="hero">
      <div className="hero-heading">
        <span>🛋️ Estilos de Salón</span>
        <small>Pulsa una imagen para abrir su prompt</small>
      </div>
      <div className="hero-strip">
        {HERO_STYLES.map((style) => (
          <HeroTile key={style.title} style={style} onSelect={onSelectStyle} />
        ))}
      </div>
    </div>
  );
}
