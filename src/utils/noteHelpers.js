export function getAllTags(notes) {
  const set = new Set();
  notes.forEach((n) => {
    if (Array.isArray(n.tags)) {
      n.tags.forEach((t) => {
        if (t && t.trim()) set.add(t.trim());
      });
    }
  });
  return [...set].sort();
}

export function filterNotes(notes, search, activeTag) {
  const q = search.trim().toLowerCase();
  return notes.filter((n) => {
    const matchSearch =
      !q ||
      n.title.toLowerCase().includes(q) ||
      n.body.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q));
    const matchTag = !activeTag || n.tags.includes(activeTag);
    return matchSearch && matchTag;
  });
}

export function formatDate(ts) {
  const d = new Date(ts);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) {
    return "Today " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}