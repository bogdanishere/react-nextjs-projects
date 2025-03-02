import { TriangleUpIcon } from "@radix-ui/react-icons";
import { type TFeedbackItem } from "../../lib/types";
import { useState } from "react";

type FeedbackItemProps = {
  feedbackItem: TFeedbackItem;
};

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);

  const handleUpVote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUpvoteCount((prev) => prev + 1);
    e.currentTarget.disabled = true;
    e.stopPropagation();
  };

  return (
    <li
      className={`feedback ${open && "feedback--expand"}`}
      onClick={() => setOpen((prev) => !prev)}
    >
      <button onClick={handleUpVote}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>

      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>
      <p>{feedbackItem.daysAgo === 0 ? "now" : `${feedbackItem.daysAgo}d`}</p>
    </li>
  );
}
