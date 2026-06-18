import { getTagColor } from "../utils/tagColors";

export default function TagFilter({ tags, activeTag, onSelect }) {
  return (
    <div className="tag-filter" role="group" aria-label="Filter by tag">
      <span className="tag-filter-label">🏷 Filter:</span>
      <button
        className={`tag-pill ${!activeTag ? "active-tag" : "inactive"}`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {tags.map((tag) => {
        const { bg, text, border } = getTagColor(tag);
        const isActive = activeTag === tag;
        return (
          <button
            key={tag}
            className={`tag-pill ${isActive ? "active-tag" : "inactive"}`}
            style={isActive ? { background: bg, color: text, borderColor: border } : {}}
            onClick={() => onSelect(tag)}
            aria-pressed={isActive}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}