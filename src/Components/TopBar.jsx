import React, { useRef, useState, useEffect } from "react";
import { useGame } from "../GameContext";
import speaker_icon from "../Assets/Icons/speaker_icon.png";
import delete_icon from "../Assets/Icons/delete_icon.png";
import flash_icon from "../Assets/Icons/flash_icon.png";
import ButtonComponent from "./Primitive Components/ButtonComponent";

export default function TopBar() {
  const { theme, gameState, score, setScore, hints } = useGame();
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const iframeRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [randomStartIndex, setRandomStartIndex] = useState(0);

  console.log(randomStartIndex)

  useEffect(() => {
    // Generate a random start index (adjusting range based on expected playlist size)
    const randomIndex = Math.floor(Math.random() * 20); // Assuming max 20 tracks
    setRandomStartIndex(randomIndex);
    setMuted(false);
  }, [theme]);

  const handleShowHint = () => {
    if (hints.length === 0) {
      alert("No hints available. Submit the game first to generate hints.");
      return;
    }
    alert(hints[currentHintIndex]);
    setCurrentHintIndex((prevIndex) => (prevIndex + 1) % hints.length);
    setScore((prevScore) => ({
      ...prevScore,
      hints_used: prevScore.hints_used + 1,
    }));
  };

  const toggleMute = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        `{"event":"command","func":"${muted ? "unMute" : "mute"}","args":""}`,
        "*"
      );
      setMuted(!muted);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col justify-between">
        {gameState === "playing" && (
          <span className="font-semibold text-white text-outline">
            ARRANGE IN ORDER
          </span>
        )}
        {score.high_score !== 0 && (
          <span className="block sm:hidden font-semibold text-white text-outline">
            BEST SCORE: {score.high_score}
          </span>
        )}
      </div>
      <div className="flex gap-5 items-center">
        {score.high_score !== 0 && (
          <span className="hidden sm:block font-semibold text-white text-outline">
            BEST SCORE: {score.high_score}
          </span>
        )}
        {gameState === "playing" && (
          <ButtonComponent
            action={handleShowHint}
            text="HINT"
            icon={flash_icon}
            custom_class="thirdary-button large-box-shadow"
          />
        )}
        <button
          onClick={toggleMute}
          className="bg-white rounded p-1 h-fit group large-box-shadow relative"
        >
          <iframe
            title="player"
            ref={iframeRef}
            width="0"
            height="0"
            src={`https://www.youtube.com/embed/videoseries?list=${theme.playlist_id}&autoplay=1&loop=1&enablejsapi=1&index=${randomStartIndex}`}
            allow="autoplay; encrypted-media"
          ></iframe>
          <img
            src={speaker_icon}
            alt="audio on"
            className="scale-x-[-1] h-[30px] w-[30px] transition-transform duration-200 ease-in-out group-hover:scale-x-[-1] group-hover:scale-[110%]"
          />
          {muted && (
            <img
              src={delete_icon}
              alt="audio muted"
              className="h-[17px] w-[17px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </button>
      </div>
    </div>
  );
}
