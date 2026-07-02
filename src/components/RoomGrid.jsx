export default function RoomGrid({ rooms, onSelect }) {
  return (
    <div className="room-grid">
      {rooms.map((room, i) => {
        const count = room.prompts ? room.prompts.length : room.variants ? room.variants.length : 0;
        return (
          <button
            key={room.id}
            className="room-card"
            style={{ animationDelay: `${i * 40}ms` }}
            onClick={() => onSelect(room.id)}
          >
            <span className="room-card-emoji">{room.emoji}</span>
            <span className="room-card-title">{room.title}</span>
            <span className="room-card-count">
              {count} {count === 1 ? 'prompt' : 'prompts'}
            </span>
          </button>
        );
      })}
    </div>
  );
}
