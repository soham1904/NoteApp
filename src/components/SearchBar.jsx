export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="search-row">
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search notes by title, content or tag…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search notes"
        />
      </div>
      {value && (
        <button className="btn" onClick={() => onChange("")}>✕ Clear</button>
      )}
      <span className="result-count">
        {resultCount} note{resultCount !== 1 ? "s" : ""}
      </span>
    </div>
  );
}