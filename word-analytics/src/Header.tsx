import BackgroundImage from "./BackgroundImage";

export default function Header() {
  return (
    <header>
      <BackgroundImage />
      <Title />
    </header>
  );
}

function Title() {
  return (
    <h1 className="first-heading">
      Word<span className="first-heading--thin">Analytics</span>
    </h1>
  );
}
