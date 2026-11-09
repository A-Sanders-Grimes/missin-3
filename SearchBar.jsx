export default function SearchBar({ query, setQuery, onSearch, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter car brand (e.g., honda, toyota)..."
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !query.trim()}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}