import { useMemo, useState, useEffect } from 'react';
import Room from './components/Room';
import nanoBananaData from './data/nanoBanana.json';
import omniFlashData from './data/omniFlash.json';
import klingData from './data/kling.json';

const LIBRARIES = [
  {
    id: 'nano-banana',
    label: 'Home Staging',
    tool: 'Nano Banana / Gemini · Imagen',
    emoji: '🖼️',
    data: nanoBananaData,
    description:
      'Prompts de edición de fotos reales de inmuebles para home staging digital. Adjunta la foto original y copia el prompt completo en Nano Banana o Gemini.',
  },
  {
    id: 'omni-flash',
    label: 'Vídeo Reveal',
    tool: 'Gemini Omni Flash · Vídeo',
    emoji: '🎬',
    data: omniFlashData,
    description:
      'Prompts de 2 pasos para Stories/Reels: Paso 1 transforma la foto en un reveal animado, Paso 2 añade personas usando el espacio en la misma conversación con Omni.',
  },
  {
    id: 'kling',
    label: 'Transiciones',
    tool: 'Kling AI · Vídeo',
    emoji: '🌀',
    data: klingData,
    description:
      'Transiciones antes → después. Sube la foto original como start frame y la versión con Home Staging IA como end frame. 5s recomendados, 9:16 para Stories.',
  },
];

function normalize(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function matches(text, query) {
  return normalize(text).includes(query);
}

function filterRoom(room, query) {
  if (!query) return room;
  if (matches(room.title, query)) return room;

  if (room.prompts) {
    const prompts = room.prompts.filter(
      (p) => matches(p.title, query) || matches(p.prompt, query)
    );
    return prompts.length ? { ...room, prompts } : null;
  }

  if (room.variants) {
    const variants = room.variants
      .map((v) => {
        const steps = v.steps.filter((s) => matches(s.label, query) || matches(s.prompt, query));
        if (matches(v.title, query)) return v;
        return steps.length ? { ...v, steps } : null;
      })
      .filter(Boolean);
    return variants.length ? { ...room, variants } : null;
  }

  return null;
}

export default function App() {
  const [activeLib, setActiveLib] = useState(LIBRARIES[1].id);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const library = LIBRARIES.find((l) => l.id === activeLib);
  const q = normalize(query.trim());

  const filteredRooms = useMemo(() => {
    return library.data.map((room) => filterRoom(room, q)).filter(Boolean);
  }, [library, q]);

  return (
    <div className="app">
      <div className="topbar">
        <div className="brand">
          <img
            className="brand-logo"
            src={theme === 'dark' ? '/logos/rk-palanca-light-text.svg' : '/logos/rk-palanca-dark-text.svg'}
            alt="RK Palanca Fontestad"
          />
          <span className="brand-divider" />
          <small>Prompts</small>
        </div>

        <div className="search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            placeholder="Buscar estancia o estilo…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title="Cambiar modo"
        >
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
              <path
                d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="libtabs">
        {LIBRARIES.map((lib) => (
          <button
            key={lib.id}
            className={`libtab${lib.id === activeLib ? ' active' : ''}`}
            onClick={() => setActiveLib(lib.id)}
          >
            <span>{lib.emoji}</span>
            <span>{lib.label}</span>
            <span className="count">{lib.data.length}</span>
          </button>
        ))}
      </div>
      <div className="libtab-desc">
        <strong>{library.tool}</strong> — {library.description}
      </div>

      <div className="main">
        {filteredRooms.length === 0 ? (
          <div className="empty">No hay resultados para "{query}" en esta librería.</div>
        ) : (
          filteredRooms.map((room) => <Room key={room.id} room={room} />)
        )}
      </div>

      <div className="footer">
        <strong>RK Palanca Fontestad</strong> · Biblioteca interna de prompts · Home Staging Digital & Vídeo IA
        <br />
        Disclosure recomendado en RRSS: «Imágenes/vídeos generados con IA con fines ilustrativos»
      </div>
    </div>
  );
}
