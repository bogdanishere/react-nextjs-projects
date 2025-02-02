import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import { useFeedbackItems } from "../hooks/useFeedbackItems";

type TFeedbackItemsContext = {
  feedbackItems: TFeedbackItem[];
  loading: boolean;
  error: string | null;
  selectedHashtag: string | null;
  refetch: boolean;
  handleAddToList: (text: string) => void;
  handleFilterByHashtag: (hashtag: string) => void;
  handleReset: () => void;
  allFeedbackItems: TFeedbackItem[];
};

type TFeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

const FeedbackItemsContextt = createContext<TFeedbackItemsContext | null>(null);

export default function FeedbackItemsContext({
  children,
}: TFeedbackItemsContextProviderProps) {
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);

  const {
    feedbackItems,
    loading,
    error,
    refetch,
    setRefetch,
    setFeedbackItems,
    setLoading,
    setError,
  } = useFeedbackItems();

  const handleAddToList = async (text: string) => {
    const company =
      text
        .split(" ")
        .find((word) => word.includes("#"))
        ?.substring(1) || "";

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      company,
      text,
      upvoteCount: 0,
      daysAgo: 0,
      badgeLetter: company.substring(0, 1).toUpperCase() || "",
    };
    setFeedbackItems((prev) => [...prev, newItem]);

    try {
      await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );
    } catch (error) {
      setError("Failed to add feedback" + error);
    }
  };

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
  }, [refetch, setError, setLoading, setFeedbackItems, setRefetch]);

  const handleFilterByHashtag = (hashtag: string) => {
    setSelectedHashtag(hashtag);
  };

  const filteredFeedbackItems = useMemo(
    () =>
      selectedHashtag
        ? feedbackItems.filter((item) => item.company === selectedHashtag)
        : feedbackItems,
    [selectedHashtag, feedbackItems]
  );

  const handleReset = () => {
    setSelectedHashtag(null);
    setRefetch(true);
  };

  return (
    <FeedbackItemsContextt.Provider
      value={{
        feedbackItems: selectedHashtag ? filteredFeedbackItems : feedbackItems,
        allFeedbackItems: feedbackItems,
        loading,
        error,
        selectedHashtag,
        refetch,
        handleAddToList,
        handleFilterByHashtag,
        handleReset,
      }}
    >
      {children}
    </FeedbackItemsContextt.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFeedbackItemsContext = () => {
  const context = useContext(FeedbackItemsContextt);
  if (!context) {
    throw new Error(
      "useFeedbackItemsContext must be used within FeedbackItemsContextProvider"
    );
  }
  return context;
};
