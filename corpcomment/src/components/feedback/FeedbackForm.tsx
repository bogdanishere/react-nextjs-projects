import { useRef, useState } from "react";
import { MAX_CHARACTERS } from "../../constants";
import { useFeedbackItemStore } from "../../stores/feedbackItemStore";
// import { useFeedbackItemsContext } from "../FeedbackItemsContext";

export default function FeedbackForm() {
  // const { handleAddToList } = useFeedbackItemsContext();
  const { handleAddToList } = useFeedbackItemStore();
  const [text, setText] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const handleSendFeedback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length === 0) {
      formRef.current?.style.setProperty("border", "1px solid red");
      return;
    }
    if (text.split(" ").find((word) => word.includes("#")) === undefined) {
      formRef.current?.style.setProperty("border", "1px solid red");
      return;
    }

    handleAddToList(text);

    setText("");

    formRef.current?.style.setProperty("border", "none");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_CHARACTERS) {
      return;
    }
    setText(e.target.value);
  };

  const charCount = MAX_CHARACTERS - text.length;

  return (
    <form className="form" ref={formRef} onSubmit={handleSendFeedback}>
      <textarea
        value={text}
        id="feedback-textarea"
        placeholder=""
        spellCheck={false}
        maxLength={MAX_CHARACTERS}
        onChange={handleChange}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to hashtag the company
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button type="submit">
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
