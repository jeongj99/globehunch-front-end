import Navbar from "../components/Navbar";
import "./Tutorial.css";
import TutorialVideo from "../components/Tutorial/TutorialVideo";
import TutorialTitleDescription from "../components/Tutorial/TutorialTitleDescription";

export default function Tutorial() {

  return (
    <>
      <Navbar />
      <main className="help-page-container">
        <TutorialTitleDescription />
        <TutorialVideo />
      </main>
    </>
  );
}