import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/navbar";

function App() {
  return (
    <>
      <header className="w-full">
        <Navbar />
      </header>
      <Outlet />
    </>
  );
}

export default App;