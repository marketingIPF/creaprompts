import PromptCard from './PromptCard';

export default function RoomDetail({ room, libId, highlightKey, onBack }) {
  const roomPrefix = `${libId}::${room.id}::`;

  return (
    <div className="room-detail">
      <div className="room-detail-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Estancias
        </button>
        <span className="room-detail-emoji">{room.emoji}</span>
        <div className="room-detail-text">
          <span className="room-detail-title">{room.title}</span>
          {room.rule && <span className="room-rule">{room.rule}</span>}
        </div>
      </div>

      <div className="room-detail-body">
        {room.prompts &&
          room.prompts.map((p, i) => {
            const key = `${roomPrefix}${p.id}`;
            return (
              <div key={key} className="stagger-item" style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}>
                <PromptCard
                  id={key}
                  number={p.number}
                  title={p.title}
                  prompt={p.prompt}
                  defaultOpen={key === highlightKey}
                  highlight={key === highlightKey}
                />
              </div>
            );
          })}

        {room.variants &&
          room.variants.map((v, vi) => (
            <div className="variant stagger-item" key={vi} style={{ animationDelay: `${Math.min(vi, 12) * 30}ms` }}>
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
    </div>
  );
}
