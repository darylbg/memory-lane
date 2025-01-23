import React, { useContext, createContext, useState } from "react";
import { getTheme } from "./themeConfig";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme("violet_evergarden"));
  // not_started, ready_to_play, playing, completed
  const [gameState, setGameState] = useState("not_started");
  const [allImages, setAllImages] = useState([]);
  const [shuffledGameSet, setShuffledGameSet] = useState([]);
  const [orderedGameSet, setOrderedGameSet] = useState([]);
  const [score, setScore] = useState(0);
  const [hints, setHints] = useState([]);

  console.log("all images:", allImages)

  // set shuffled set of up to 10 images
  const playGame = (allImages) => {
    if (!allImages || allImages.length === 0) {
      console.warn("No images available to play the game.");
      return;
    }
  
    const shuffledImages = [...allImages].sort(() => 0.5 - Math.random()); // Shuffle all images randomly
    const selectedImages = shuffledImages.slice(0, Math.min(10, allImages.length)); // Take up to 10 images
  
    const shuffledGameSet = [...selectedImages].sort(() => 0.5 - Math.random());
  
    const orderedGameSet = [...selectedImages].sort((a, b) =>
      new Date(a.createdAt) - new Date(b.createdAt)
    );
  
    setShuffledGameSet(shuffledGameSet); 
    setOrderedGameSet(orderedGameSet);  
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
        playGame,
        shuffledGameSet,
        setShuffledGameSet,
        orderedGameSet
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
