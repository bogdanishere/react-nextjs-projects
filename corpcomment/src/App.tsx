import HashtagList from "./components/HashtagList";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import { useEffect } from "react";
import { useFeedbackItemStore } from "./stores/feedbackItemStore";
// import FeedbackItemsContext from "./components/FeedbackItemsContext";

function App() {
  const { fetchFeedbackItems, refetch, setRefetch } = useFeedbackItemStore();
  useEffect(() => {
    if (!refetch) fetchFeedbackItems();
    setRefetch(false);
  }, [refetch, fetchFeedbackItems, setRefetch]);

  return (
    <div className="app">
      <Footer />
      {/* <FeedbackItemsContext> */}
      <Container />
      <HashtagList />
      {/* </FeedbackItemsContext> */}
    </div>
  );
}

export default App;
