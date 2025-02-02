import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

type Items = {
  feedbackItems: TFeedbackItem[];
  loading: boolean;
  error: string | null;
  refetch: boolean;
  selectedCompany: string;
};
type Actions = {
  handleAddToList: (text: string) => void;
  setFeedbackItems: (feedbackItems: TFeedbackItem[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setRefetch: (refetch: boolean) => void;
  setSelectedCompany: (selectedCompany: string) => void;
  handleFilterByCompany: (company: string) => void;
  handleReset: () => void;
  fetchFeedbackItems: () => void;
};

export const useFeedbackItemStore = create<Items & Actions>((set) => ({
  feedbackItems: [],
  loading: false,
  error: null,
  refetch: false,
  selectedCompany: "",
  handleAddToList: (text) => {
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
    set((state) => ({ feedbackItems: [...state.feedbackItems, newItem] }));
  },
  setFeedbackItems: (feedbackItems) => set({ feedbackItems }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setRefetch: (refetch) => set({ refetch }),
  setSelectedCompany: (selectedCompany) => set({ selectedCompany }),
  handleFilterByCompany: (company) => set({ selectedCompany: company }),
  handleReset: () => set({ selectedCompany: "", refetch: true }),
  fetchFeedbackItems: async () => {
    set({ loading: true });
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch feedbacks");
      }
      const data = await response.json();
      set({ feedbackItems: data.feedbacks, loading: false });
    } catch (error) {
      set({ error: "Something went wrong" + error, loading: false });
    }
  },
}));
