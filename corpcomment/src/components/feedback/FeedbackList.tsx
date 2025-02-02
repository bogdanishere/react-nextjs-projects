import FeedbackItem from "./FeedbackItem";
import Spinner from "./../Spinner";
import ErrorMessage from "./../ErrorMessage";
import { useFeedbackItemStore } from "../../stores/feedbackItemStore";
// import { useFeedbackItemsContext } from "../FeedbackItemsContext";

export default function FeedbackList() {
  // const { feedbackItems, loading, error } = useFeedbackItemsContext();
  const { feedbackItems, selectedCompany, loading, error } =
    useFeedbackItemStore();

  const feedbackItemsFilteredByCompany = selectedCompany
    ? feedbackItems?.filter((feedback) => feedback.company === selectedCompany)
    : feedbackItems;
  return (
    <ol className="feedback-list">
      {loading && <Spinner />}

      {error && <ErrorMessage message={error} />}

      {feedbackItemsFilteredByCompany?.map((feedback) => (
        <FeedbackItem key={feedback?.id} feedbackItem={feedback} />
      ))}
    </ol>
  );
}
