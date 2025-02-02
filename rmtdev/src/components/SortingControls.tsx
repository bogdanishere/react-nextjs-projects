import { useJobItemsContext } from "../hooks/useJobItemsContext";

export default function SortingControls() {
  const { sortingMeth: sortingMethod, handleSorting } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        className={`sorting__button sorting__button--relevant ${
          sortingMethod === "relevant" && "sorting__button--active"
        }`}
        onClick={() => handleSorting("relevant")}
      >
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--recent ${
          sortingMethod === "recent" && "sorting__button--active"
        }`}
        onClick={() => handleSorting("recent")}
      >
        Recent
      </button>
    </section>
  );
}
