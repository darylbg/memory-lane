import React, { useContext, createContext, useState, useEffect } from "react";
import { getTheme } from "./themeConfig";
import { useNavigate } from "react-router-dom";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme("violet_evergarden"));
  const [gameState, setGameState] = useState("not_started");
  const [allImages, setAllImages] = useState([]);
  const [shuffledGameSet, setShuffledGameSet] = useState([]);
  const [orderedGameSet, setOrderedGameSet] = useState([]);
  const [score, setScore] = useState({
    hints_used: 0,
    time_elapsed: 0,
    game_set_count: 0,
    high_score: 0,
  });
  // console.log(score);
  const [hints, setHints] = useState([]);

  const navigate = useNavigate();

  // Function to generate hints
  const generateHints = (submittedSet) => {
    if (!orderedGameSet) {
      console.warn("Submitted set or ordered game set is undefined.");
      return [];
    }

    const newHints = [];
    submittedSet.forEach((item, index) => {
      if (!item || !item.id) {
        console.warn(`Invalid item at index ${index} in submitted set.`);
        return;
      }

      const correctIndex = orderedGameSet.findIndex(
        (orderedItem) => orderedItem && orderedItem.id === item.id
      );

      if (item.id !== orderedGameSet[index]?.id) {
        newHints.push(
          `Hint: The photo at position ${index + 1} should be at position ${
            correctIndex + 1
          }.`
        );
      }
    });

    return newHints;
  };

  const playGame = (allImages) => {
    if (!allImages || allImages.length === 0) {
      console.warn("No images available to play the game.");
      return;
    }

    const validImages = allImages.filter(
      (image) => image && image.id && image.createdAt
    );
    if (validImages.length < 2) {
      console.warn("Not enough valid images to play.");
      return;
    }

    const shuffledImages = [...validImages].sort(() => 0.5 - Math.random());
    const selectedImages = shuffledImages.slice(
      0,
      Math.min(10, validImages.length)
    );

    const shuffledGameSet = [...selectedImages].sort(() => 0.5 - Math.random());
    const orderedGameSet = [...selectedImages].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    setShuffledGameSet(shuffledGameSet);
    setOrderedGameSet(orderedGameSet);
    setGameState("playing");

    setScore((prevScore) => ({
      ...prevScore,
      game_set_count: shuffledGameSet.length,
      time_elapsed: 0,
      hints_used: 0

    }));
  };

  const submitGame = (submittedSet) => {
    if (!submittedSet || submittedSet.length !== orderedGameSet.length) {
      console.warn("Invalid submission.");
      return false;
    }

    const isSuccess = submittedSet.every(
      (item, index) => item.id === orderedGameSet[index].id
    );

    if (isSuccess) {
      // console.log("Game success! You matched the order.");
      setGameState("completed");
      navigate("/complete");
    } else {
      // console.log("Game failed. Generating hints...");
      const newHints = generateHints(submittedSet);
      setHints(newHints);
    }

    return isSuccess;
  };

  const resetGame = () => {
    setGameState("not_started");
    setScore({
      hints_used: 0,
      time_elapsed: 0,
      game_set_count: 0,
      high_score: 0,
    });
    setHints([]);
  };

  useEffect(() => {
    let timer;
    if (gameState === "playing") {
      timer = setInterval(() => {
        setScore((prevScore) => ({
          ...prevScore,
          time_elapsed: prevScore.time_elapsed + 1,
        }));
      }, 1000); // Increment every second
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Cleanup on unmount or game state change
  }, [gameState]);

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
        hints,
        setHints,
        setScore,
        resetGame,
        playGame,
        generateHints,
        shuffledGameSet,
        setShuffledGameSet, 
        orderedGameSet,
        submitGame,
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
