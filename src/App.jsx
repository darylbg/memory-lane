import "./index.css";
import { useGame } from "./GameContext";
import TopBar from "./Components/TopBar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GameImageUpload from "./Components/GameImageUpload";
import GameThemes from "./Components/GameThemes";
import GameComplete from "./Components/GameComplete";
import GamePlay from "./Components/GamePlay";
import GameWelcome from "./Components/GameWelcome";
import { GameProvider } from "./GameContext";

function App() {
  const { theme, switchTheme } = useGame();
  return (
        <div
          className="h-dvh w-screen flex justify-center bg-no-repeat bg-cover bg-center overflow-x-hidden"
          style={{ backgroundImage: `url(${theme.background_image})` }}
        >
          <div className="flex flex-1 flex-col p-2 max-w-screen-xl">
            {/* top bar */}
            <TopBar />
            <div className="flex flex-1 flex-col justify-center pt-2 pb-10">
              <Routes>
                <Route path="" element={<GameWelcome />} />
                <Route path="/image-upload" element={<GameImageUpload />} />
                <Route path="/themes" element={<GameThemes />} />
                <Route path="/play" element={<GamePlay />} />
                <Route path="/complete" element={<GameComplete />} />
              </Routes>
            </div>
          </div>
        </div>
  );
}

export default App;
