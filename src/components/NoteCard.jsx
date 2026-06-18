import { getTagColor } from "../utils/tagColors";
import { formatDate } from "../utils/noteHelpers";

export default function NoteCard({ note, onEdit, onDelete, onTagClick }) {
  return (
    <article className="note-card" role="listitem">
      <div className="note-card__title">{note.title}</div>
      <div className="note-card__body">{note.body}</div>

      {note.tags.length > 0 && (
        <div className="note-card__tags">
          {note.tags.map((tag) => {
            const { bg, text, border } = getTagColor(tag);
            return (
              <button
                key={tag}
                className="tag-pill"
                style={{ background: bg, color: text, borderColor: border }}
                onClick={() => onTagClick(tag)}
                aria-label={`Filter by tag: ${tag}`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}

      <div className="note-card__meta">
        <span>{formatDate(note.updatedAt || note.createdAt)}</span>
        <div className="note-card__actions">
          <button
            className="btn-icon"
            onClick={() => onEdit(note)}
            title="Edit note"
            aria-label={`Edit ${note.title}`}
          >
            ✏️
          </button>
          <button
            className="btn-icon danger"
            onClick={() => onDelete(note.id)}
            title="Delete note"
            aria-label={`Delete ${note.title}`}
          >
            🗑️
          </button>
        </div>
      </div>
    </article>
  );
}