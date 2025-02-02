import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useJobItemsContext } from "../hooks/useJobItemsContext";

export default function PaginationControls() {
  const {
    page: currentPage,
    totalNumberOfPages: lastPage,
    handleChangePage,
  } = useJobItemsContext();

  return (
    <section className="pagination">
      {currentPage !== 1 && (
        <button
          className="pagination__button pagination__button--previous"
          disabled={currentPage < 1}
          onClick={() => handleChangePage("prev")}
        >
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </button>
      )}
      {lastPage > currentPage && (
        <button
          className="pagination__button pagination__button--next"
          onClick={(e) => {
            handleChangePage("next");
            (e.target as HTMLButtonElement).blur();
          }}
        >
          Page {currentPage + 1} <ArrowRightIcon />
        </button>
      )}
    </section>
  );
}
