import { useEffect, useState } from "react";
import { TFeedbackItem } from "../lib/types";

export const useFeedbackItems = () => {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks");
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
        setLoading(false);
      } catch (error) {
        setError("Something went wrong" + error);
        setLoading(false);
      }
    };

    if (!refetch) {
      fetchData();
    }
    setRefetch(false);
  }, [refetch]);

  return {
    feedbackItems,
    loading,
    error,
    refetch,
    setRefetch,
    setFeedbackItems,
    setLoading,
    setError,
  };
};
