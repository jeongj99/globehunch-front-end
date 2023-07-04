import Navbar from "../components/Navbar";

import HomePageContents from "../components/Home/HomePageContents";
import Video from "../components/Home/Video";
import "./Home.css";

export default function Home() {

  return (
    <>
      <Navbar />
      <HomePageContents />
      <Video />
    </>
  );
}