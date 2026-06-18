export default function EmptyState({ hasNotes, onClear }) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state__icon">{hasNotes ? "🔍" : "📓"}</div>
      <p>
        {hasNotes
          ? "No notes match your search or filter."
          : "No notes yet. Click New note to get started."}
      </p>
      {hasNotes && (
        <button className="btn" onClick={onClear}>
          Clear filters
        </button>
      )}
    </div>
  );
}