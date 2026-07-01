import { useEffect, useRef, useState } from 'react';
import CopyButton from './CopyButton';
import ShareButton from './ShareButton';
import { useFavorites } from '../context/FavoritesContext';

export default function PromptCard({ id, number, title, prompt, tag, defaultOpen = false, highlight = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(id);
  const ref = useRef(null);

  useEffect(() => {
    if (highlight && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`card${highlight ? ' card-highlight' : ''}`} ref={ref}>
      <div className="card-head" onClick={() => setOpen(!open)}>
        {number != null && <span className="card-number">{String(number).padStart(2, '0')}</span>}
        <div className="card-head-text">
          {tag && <span className="card-tag">{tag}</span>}
          <span className="card-title">{title}</span>
        </div>
        <span className="card-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className={`icon-btn${fav ? ' starred' : ''}`}
            onClick={() => toggleFavorite(id)}
            title={fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            {fav ? '★' : '☆'}
          </button>
          <ShareButton id={id} />
          <CopyButton text={prompt} />
        </span>
        <svg
          className={`card-chevron${open ? ' open' : ''}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {open && <pre className="card-prompt">{prompt}</pre>}
    </div>
  );
}
