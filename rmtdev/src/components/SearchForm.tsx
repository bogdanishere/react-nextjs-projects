import { useSearchTextQuery } from "../hooks/useSearchTextQuery";

export default function SearchForm() {
  const { searchQuery, handleSearchQuery } = useSearchTextQuery();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchQuery(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchQuery}
        onChange={handleInput}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
