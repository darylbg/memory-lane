import React, { useRef, useState } from "react";
import { useGame } from "../GameContext";
import speaker_icon from "../Assets/Icons/speaker_icon.png";
import flash_icon from "../Assets/Icons/flash_icon.png";
import ButtonComponent from "./Primitive Components/ButtonComponent";

export default function TopBar() {
  const { theme, gameState, shuffledGameSet, setShuffledGameSet, submitGame, hints } = useGame();
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  console.log("gamestate:", gameState);

  const audio_ref = useRef(null);

  // Function to toggle audio on/off
  const toggleAudio = () => {
    console.log(audio_ref.current);
    const audio = audio_ref.current;
    if (audio.muted) {
      audio.muted = false;
    } else {
      audio.muted = true;
    }
  };

  const handleShowHint = () => {
    if (hints.length === 0) {
      alert("No hints available. Submit the game first to generate hints.");
      return;
    }

    const hint = hints[currentHintIndex];
    alert(hint); // Display the current hint
    setCurrentHintIndex((prevIndex) => (prevIndex + 1) % hints.length); // Cycle through hints
  };

  const textLeft = (gameState) => {
    switch (gameState) {
      case "not_started":
        return <span></span>;
        break;
    case "playing":
      return <span>ARRANGE IN ORDER</span>;
      default:
        return <span></span>;
    }
  }
  return (
    <div className="flex justify-between">
      <div>
        {textLeft(gameState)}
      </div>
      <div className="flex gap-5">
        <ButtonComponent
        action={handleShowHint}
          text="HINT"
          icon={flash_icon}
          custom_class="thirdary-button large-box-shadow"
        />
        <button
          onClick={toggleAudio}
          className="bg-white rounded p-1 h-fit group large-box-shadow"
        >
          <audio id="background_music" ref={audio_ref} loop autoPlay>
            {theme?.audio_tracks.map((track, index) => {
              console.log(track);
              return <source src={track} type="audio/mpeg" key={index} />;
            })}
          </audio>
          <img
            src={speaker_icon}
            alt="speaker icon"
            className="scale-x-[-1] h-[30px] w-[30px] transition-transform duration-200 ease-in-out group-hover:scale-x-[-1] group-hover:scale-[110%]"
          />
        </button>
      </div>
    </div>
  );
}
