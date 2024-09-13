import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlicer";
import { Moon } from "lucide-react";
export default function Header() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.uiSlicer.mode);

  function toggleTheme() {
    dispatch(uiActions.toggleTheme());
  }

  let modeClasses;

  if (mode === "dark") {
    modeClasses = "bg-gray-700 text-gray-50";
  } else {
    modeClasses = "bg-gray-50 text-gray-950";
  }
  return (
    <header
      className={`shadow-lg fixed top-0 left-0 right-0 flex items-center justify-between py-5 px-14 ${modeClasses} transition-all z-10`}
    >
      <h1 className="text-xl font-extrabold">Where in the world?</h1>

      <div
        onClick={toggleTheme}
        className="relative font-semibold cursor-pointer"
      >
        <Moon size={24} fill="white" className="absolute -left-8" /> Dark Mode
      </div>
    </header>
  );
}
