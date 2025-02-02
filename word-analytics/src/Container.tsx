import { useState } from "react";
import {
  NUMBER_OF_CHARACTERS_FACEBOOK,
  NUMBER_OF_CHARACTERS_INSTAGRAM,
} from "./constants";

export default function Container() {
  const [value, setValue] = useState("");

  return (
    <main className="container">
      <Textarea value={value} setValue={setValue} />
      <Stats value={value} />
    </main>
  );
}

function Textarea({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  const [warningText, setWarningText] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    let newValue = event.target.value;

    if (newValue.includes("<script>")) {
      setWarningText("No scripts allowed");
      newValue = newValue.replace("<script>", "");
    } else if (newValue.includes("@")) {
      newValue = newValue.replace("@", "");
      setWarningText("No @ symbol allowed");
    } else {
      setWarningText("");
    }
    setValue(newValue);
  }
  return (
    <div className="textarea">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Enter your text"
        spellCheck="false"
      />
      {warningText && <Warning>{warningText}</Warning>}
    </div>
  );
}

function Stats({ value }: { value: string }) {
  const stats = [
    {
      id: 1,
      name: "words",
      value: value.split(/\s+/).filter((word) => word !== "").length,
    },
    {
      id: 2,
      name: "characters",
      value: value.replace(/\s+/g, "").length,
    },
    {
      id: 3,
      name: "instagram",
      value: NUMBER_OF_CHARACTERS_INSTAGRAM - value.replace(/\s+/g, "").length,
    },
    {
      id: 4,
      name: "facebook",
      value: NUMBER_OF_CHARACTERS_FACEBOOK - value.replace(/\s+/g, "").length,
    },
  ];

  return (
    <section className="stats">
      {stats.map((stat) => (
        <SectionsStats
          key={stat.id}
          numberOfCharacters={stat.value}
          nameOfSection={stat.name}
        />
      ))}
    </section>
  );
}

interface SectionStatsProps {
  numberOfCharacters: number;
  nameOfSection: string;
}

function SectionsStats({
  numberOfCharacters,
  nameOfSection,
}: SectionStatsProps) {
  return (
    <section className="stat">
      <span
        className={`stat__number ${
          numberOfCharacters < 0 ? " stat__number--limit" : ""
        }`}
      >
        {numberOfCharacters}
      </span>
      <span className="second-heading">{nameOfSection}</span>
    </section>
  );
}

function Warning({ children }: { children?: React.ReactNode }) {
  return <p className="warning">{children}</p>;
}
