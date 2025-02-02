// import { useFeedbackItemsContext } from "./FeedbackItemsContext";

import { useFeedbackItemStore } from "../stores/feedbackItemStore";

export default function HashtagList() {
  // const { allFeedbackItems: feedbackItems, handleFilterByHashtag } =
  //   useFeedbackItemsContext();
  const { feedbackItems, handleFilterByCompany: handleFilterByHashtag } =
    useFeedbackItemStore();

  const hashtags = feedbackItems
    .map((feedback) => feedback.company)
    .filter((company, index, self) => self.indexOf(company) === index);

  return (
    <ul className="hashtags">
      {hashtags.map((hashtag, index) => (
        <HashTag
          key={index + hashtag}
          hashtagName={hashtag}
          handleFilterByHashtag={handleFilterByHashtag}
        />
      ))}
    </ul>
  );
}

type HashTagProps = {
  hashtagName: string;
  handleFilterByHashtag: (hashtag: string) => void;
};

function HashTag({ hashtagName, handleFilterByHashtag }: HashTagProps) {
  return (
    <li>
      <button onClick={() => handleFilterByHashtag(hashtagName)}>
        #{hashtagName}
      </button>
    </li>
  );
}
