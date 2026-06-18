import { useState, useEffect, useCallback } from "react";
import NoteCard from "./components/NoteCard";
import NoteModal from "./components/NoteModal";
import TagFilter from "./components/TagFilter";
import SearchBar from "./components/SearchBar";
import EmptyState from "./components/EmptyState";
import { loadNotes, saveNotes } from "./utils/storage";
import { filterNotes, getAllTags } from "./utils/noteHelpers";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState(() => loadNotes());
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [modal, setModal] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const handleCreate = useCallback((noteData) => {
    const newNote = {
      id: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...noteData,
    };
    setNotes((prev) => [newNote, ...prev]);
    setModal(null);
  }, []);

  const handleUpdate = useCallback((noteData) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === noteData.id
          ? { ...n, ...noteData, updatedAt: Date.now() }
          : n
      )
    );
    setModal(null);
    setEditingNote(null);
  }, []);

  const handleDelete = useCallback(
    (id) => {
      if (!window.confirm("Delete this note?")) return;
      setNotes((prev) => prev.filter((n) => n.id !== id));
      setActiveTag((tag) => {
        const remaining = notes.filter((n) => n.id !== id);
        const tags = getAllTags(remaining);
        return tags.includes(tag) ? tag : null;
      });
    },
    [notes]
  );

  const openNew = () => { setEditingNote(null); setModal("new"); };
  const openEdit = (note) => { setEditingNote(note); setModal("edit"); };
  const closeModal = () => { setModal(null); setEditingNote(null); };

  const visible = filterNotes(notes, search, activeTag);
  const allTags = getAllTags(notes);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <span className="logo-icon" aria-hidden="true">📓</span>
          <h1>NoteTag</h1>
        </div>
        <button className="btn btn-primary" onClick={openNew}>
          + New note
        </button>
      </header>

      <main className="app-main">
        <SearchBar
          value={search}
          onChange={setSearch}
          resultCount={visible.length}
        />
        {allTags.length > 0 && (
          <TagFilter
            tags={allTags}
            activeTag={activeTag}
            onSelect={(tag) => setActiveTag(activeTag === tag ? null : tag)}
            notes={notes}
          />
        )}
        {visible.length === 0 ? (
          <EmptyState
            hasNotes={notes.length > 0}
            onClear={() => { setSearch(""); setActiveTag(null); }}
          />
        ) : (
          <div className="notes-grid" role="list" aria-label="Notes">
            {visible.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={openEdit}
                onDelete={handleDelete}
                activeTag={activeTag}
                onTagClick={(tag) =>
                  setActiveTag(activeTag === tag ? null : tag)
                }
              />
            ))}
          </div>
        )}
      </main>

      {(modal === "new" || modal === "edit") && (
        <NoteModal
          mode={modal}
          note={editingNote}
          onSave={modal === "edit" ? handleUpdate : handleCreate}
          onClose={closeModal}
        />
      )}
    </div>
  );
}