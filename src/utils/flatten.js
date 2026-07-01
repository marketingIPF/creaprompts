export function flattenLibraries(libraries) {
  const out = [];

  libraries.forEach((lib) => {
    lib.data.forEach((room) => {
      if (room.prompts) {
        room.prompts.forEach((p) => {
          out.push({
            key: `${lib.id}::${room.id}::${p.id}`,
            libId: lib.id,
            libLabel: lib.label,
            libEmoji: lib.emoji,
            roomId: room.id,
            roomEmoji: room.emoji,
            roomTitle: room.title,
            itemTitle: p.title,
            number: p.number,
            prompt: p.prompt,
          });
        });
      }

      if (room.variants) {
        room.variants.forEach((v, vi) => {
          v.steps.forEach((s, si) => {
            out.push({
              key: `${lib.id}::${room.id}::v${vi}s${si}`,
              libId: lib.id,
              libLabel: lib.label,
              libEmoji: lib.emoji,
              roomId: room.id,
              roomEmoji: room.emoji,
              roomTitle: room.title,
              itemTitle: `${v.title} · ${s.label}`,
              number: null,
              prompt: s.prompt,
            });
          });
        });
      }
    });
  });

  return out;
}
