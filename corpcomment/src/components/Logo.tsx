import { useFeedbackItemStore } from "../stores/feedbackItemStore";
// import { useFeedbackItemsContext } from "./FeedbackItemsContext";

export default function Logo() {
  // const { handleReset: onReset } = useFeedbackItemsContext();
  const { handleReset: onReset } = useFeedbackItemStore();
  return (
    <button className="logo" onClick={onReset}>
      <img src="https://bytegrad.com/course-assets/js/1/logo.svg" alt="logo" />
    </button>
  );
}
