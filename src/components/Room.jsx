import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

function countItems(room) {
  if (room.prompts) return room.prompts.length;
  if (room.variants) return room.variants.length;
  return 0;
}

export default function Room({ room, libId, highlightKey }) {
  const roomPrefix = `${libId}::${room.id}::`;
  const containsHighlight = Boolean(highlightKey && highlightKey.startsWith(roomPrefix));
  const [open, setOpen] = useState(containsHighlight);
  const count = countItems(room);

  // El enlace directo puede resolverse en un efecto posterior al primer render
  // (la URL se parsea después de montar), así que reaccionamos también aquí.
  useEffect(() => {
    if (containsHighlight) setOpen(true);
  }, [containsHighlight]);

  return (
    <div className="room">
      <div className="room-header" onClick={() => setOpen(!open)}>
        <span className="room-emoji">{room.emoji}</span>
        <span className="room-title">
          {room.title}
          {room.rule && <span className="room-rule">{room.rule}</span>}
        </span>
        <span className="room-count">{count}</span>
        <svg className={`chevron${open ? ' open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {open && (
        <div className="room-body">
          {room.prompts &&
            room.prompts.map((p) => {
              const key = `${roomPrefix}${p.id}`;
              return (
                <PromptCard
                  key={key}
                  id={key}
                  number={p.number}
                  title={p.title}
                  prompt={p.prompt}
                  defaultOpen={key === highlightKey}
                  highlight={key === highlightKey}
                />
              );
            })}

          {room.variants &&
            room.variants.map((v, vi) => (
              <div className="variant" key={vi}>
                <div className="variant-title">{v.title}</div>
                <div className="variant-steps">
                  {v.steps.map((s, si) => {
                    const key = `${roomPrefix}v${vi}s${si}`;
                    return (
                      <PromptCard
                        key={key}
                        id={key}
                        title={s.label}
                        prompt={s.prompt}
                        defaultOpen={key === highlightKey}
                        highlight={key === highlightKey}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
