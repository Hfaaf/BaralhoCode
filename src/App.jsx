import { useState } from "react";
import Home from "./pages/Nav";
import Footer from "./pages/Footer";
import Jogar from "./pages/Jogar";
import ComoJogar from "./pages/ComoJogar";

export default function App() {
  const [page, setPage] = useState("jogar");

  return (
    <>
      <Home setPage={setPage} page={page} />
      {page === "jogar" && <Jogar />}
      {page === "como-jogar" && <ComoJogar />}
      <Footer />
    </>
  );
}