export default function RoomGrid({ rooms, onSelect }) {
  return (
    <div className="room-grid">
      {rooms.map((room, i) => {
        const count = room.prompts ? room.prompts.length : room.variants ? room.variants.length : 0;
        const [main, sub] = splitTitle(room.title);
        return (
          <button
            key={room.id}
            className="room-card"
            style={{ animationDelay: `${i * 40}ms` }}
            onClick={() => onSelect(room.id)}
          >
            <span className="room-card-badge">{room.emoji}</span>
            <span className="room-card-title">
              {main}
              {sub && <small>{sub}</small>}
            </span>
            <span className="room-card-count">
              {count} {count === 1 ? 'prompt' : 'prompts'}
            </span>
            <svg className="room-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

// "SALÓN (Living Room)" -> ["Salón", "Living Room"]
function splitTitle(title) {
  const match = title.match(/^(.*?)\s*\((.*)\)\s*$/);
  if (!match) return [toTitleCase(title), null];
  return [toTitleCase(match[1]), match[2]];
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}
