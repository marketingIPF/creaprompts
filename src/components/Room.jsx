import { useState } from 'react';
import PromptCard from './PromptCard';

function countItems(room) {
  if (room.prompts) return room.prompts.length;
  if (room.variants) return room.variants.length;
  return 0;
}

export default function Room({ room, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const count = countItems(room);

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
            room.prompts.map((p) => (
              <PromptCard key={p.id} number={p.number} title={p.title} prompt={p.prompt} />
            ))}

          {room.variants &&
            room.variants.map((v, i) => (
              <div className="variant" key={i}>
                <div className="variant-title">{v.title}</div>
                <div className="variant-steps">
                  {v.steps.map((s, j) => (
                    <PromptCard key={j} title={s.label} prompt={s.prompt} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
