const KEY = "notetag_notes_v1";

export function loadNotes() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : getDefaultNotes();
  } catch {
    return getDefaultNotes();
  }
}

export function saveNotes(notes) {
  localStorage.setItem(KEY, JSON.stringify(notes));
}

function getDefaultNotes() {
  return [
    {
      id: 1,
      title: "Welcome to NoteTag!",
      body: "Create notes, add tags, and search by tag to stay organized.",
      tags: ["getting-started", "tips"],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: 2,
      title: "Shopping list",
      body: "Milk, eggs, bread, butter, olive oil, tomatoes, pasta.",
      tags: ["personal", "errands"],
      createdAt: Date.now() - 3600000,
      updatedAt: Date.now() - 3600000,
    },
    {
      id: 3,
      title: "Meeting notes",
      body: "Discussed Q3 roadmap. Key items: launch v2 in August, hire two engineers, review pricing.",
      tags: ["work", "meetings"],
      createdAt: Date.now() - 7200000,
      updatedAt: Date.now() - 7200000,
    },
  ];
}