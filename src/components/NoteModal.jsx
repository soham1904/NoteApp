import { useState } from "react";
import { getTagColor } from "../utils/tagColors";

export default function NoteModal({ mode, note, onSave, onClose }) {
  const [title, setTitle] = useState(note?.title || "");
  const [body, setBody] = useState(note?.body || "");
  const [tags, setTags] = useState(note?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!title.trim()) e.title = "Title is required.";
    if (!body.trim()) e.body = "Note content is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    onSave({ id: note?.id, title: title.trim(), body: body.trim(), tags });
  }

  function addTag() {
    const t = tagInput
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-");
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput("");
  }

  function removeTag(tag) {
    setTags(tags.filter((t) => t !== tag));
  }

  function handleTagKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={mode === "edit" ? "Edit note" : "New note"}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>{mode === "edit" ? "Edit note" : "New note"}</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="field">
          <label htmlFor="note-title">Title</label>
          <input
            id="note-title"
            type="text"
            maxLength={120}
            placeholder="Note title…"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((p) => ({ ...p, title: "" }));
            }}
            autoFocus
          />
          {errors.title && (
            <p className="field__error" role="alert">{errors.title}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="note-body">Content</label>
          <textarea
            id="note-body"
            maxLength={4000}
            placeholder="Write your note here…"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              setErrors((p) => ({ ...p, body: "" }));
            }}
          />
          {errors.body && (
            <p className="field__error" role="alert">{errors.body}</p>
          )}
        </div>

        <div className="field">
          <label>Tags</label>
          {tags.length > 0 && (
            <div className="current-tags">
              {tags.map((tag) => {
                const { bg, text, border } = getTagColor(tag);
                return (
                  <span
                    key={tag}
                    className="tag-pill"
                    style={{ background: bg, color: text, borderColor: border }}
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "inherit",
                        fontSize: "10px",
                        padding: "0 0 0 4px",
                      }}
                      aria-label={`Remove tag ${tag}`}
                    >
                      ✕
                    </button>
                  </span>
                );
              })}
            </div>
          )}
          <div className="tag-input-row">
            <input
              type="text"
              placeholder="Add a tag…"
              maxLength={30}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              aria-label="Tag input"
            />
            <button className="btn" onClick={addTag}>
              + Add
            </button>
          </div>
          <p className="field__hint">
            Press Enter or comma to add · Letters, numbers and hyphens only
          </p>
        </div>

        <div className="modal__footer">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>
            {mode === "edit" ? "Save changes" : "Create note"}
          </button>
        </div>
      </div>
    </div>
  );
}