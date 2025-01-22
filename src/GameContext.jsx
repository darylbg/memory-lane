import React, { useContext, createContext, useState } from "react";
import { getTheme } from "./themeConfig";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme("violet_evergarden"));
  const [gameState, setGameState] = useState("not_started");
  const [allImages, setAllImages] = useState([]);
  const [shuffledGameSet, setShuffledGameSet] = useState([]);
  const [orderedGameSet, SetOrderedGameSet] = useState([]);
  const [score, setScore] = useState(0);
  const [hints, setHints] = useState([]);

  // set shuffled set of up to 10 images
  const setupGame = () => {
    if (allImages.length <= 1) {
      console.log("not enough images")
      return;
    } else {
      console.log("game start");
      setGameState("playing");
    }
  }
  // Function to reset the game
  const resetGame = () => {
    setGameState("not_started");
    setScore(0);
    setHints([]);
  };

  // Function to add a hint
  const addHint = (hint) => {
    setHints((prevHints) => [...prevHints, hint]);
  };

  // Switch themes
  const switchTheme = (themeName) => {
    const selectedTheme = getTheme(themeName);
    setTheme(selectedTheme);
  };

  return (
    <GameContext.Provider
      value={{
        theme,
        setTheme,
        switchTheme,
        gameState,
        setGameState,
        allImages,
        setAllImages,
        score,
        setScore,
        hints,
        setHints,
        resetGame,
        addHint,
        setupGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the GameContext
export const useGame = () => {
  return useContext(GameContext);
};
