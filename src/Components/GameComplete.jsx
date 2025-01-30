import React from "react";
import ModalComponent from "../Components/Primitive Components/ModalComponent";
import { useGame } from "../GameContext";
import GameWelcome from "./GameWelcome";
import { NavLinkComponent } from "./Primitive Components/ButtonComponent";
import settings_icon from "../Assets/Icons/settings_icon.png";
import images_icon from "../Assets/Icons/images_icon.png";
import play_icon from "../Assets/Icons/play_icon.png";

export default function GameComplete() {
  const { orderedGameSet, allImages, gameState, playGame, score, setScore } =
    useGame();
  

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString); 
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date); 
  };

  const calculateScore = (score) => {
    // (time elapsed) + (hints used * 10) + (Math.log(11 - cards) * 30)
    const total_score = Math.round(
      score.time_elapsed +
        score.hints_used * 10 +
        Math.log(11 - score.game_set_count) * 30
    );
    if (score.high_score === 0 || total_score < score.high_score) {
      setScore((prevScore) => ({
        ...prevScore,
        high_score: total_score,
      }));
    }
    // console.log("total score", total_score);
    return total_score;
  };

  if (gameState !== "completed") {
    return <GameWelcome />;
  }

  return (
    <div className="flex flex-col gap-10 self-center">
      <div>
        <div className="flex gap-5 justify-center max-w-full flex-wrap">
          {orderedGameSet?.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col p-1 bg-gray-200 shadow-lg rounded-sm"
              >
                <img
                  src={item.imageUrl}
                  alt="image"
                  className="h-[100px] w-[100px] object-cover"
                />
                <div className="mt-1 flex justify-start">
                  <span className="font-handwriting text-sm font-regular italic">
                    {formatDate(item.createdAt)}
                  </span>{" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ModalComponent>
        <h2 className="text-xl font-medium text-center">GAME COMPLETE</h2>
        <div>
          <h4 className="font-medium text-sm">AIM FOR THE LOWEST SCORE</h4>
          <h4 className="font-medium font-italic text-sm">
            Total Score = (time elapsed) + (hints used × 10) + (30 × log(11 -
            cards played))
          </h4>
        </div>
        <div>
          <div>
            <span>HINTS USED: </span>
            <span className="font-medium">{score.hints_used}</span>
          </div>
          <div>
            <span>TIME ELAPSED: </span>
            <span className="font-medium">{score.time_elapsed}</span>
          </div>
          <div>
            <span>PHOTOS PLAYED: </span>
            <span className="font-medium">{score.game_set_count}</span>
          </div>
          <div>
            <span  className="font-medium">SCORE: </span>
            <span className="font-medium">{calculateScore(score)}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <NavLinkComponent
            text="THEMES"
            to="/themes"
            icon={settings_icon}
            custom_class="primary-button"
          />
          <NavLinkComponent
            text={
              allImages.length >= 1
                ? `UPDATE PHOTOS (${allImages.length})`
                : "UPLOAD PHOTOS"
            }
            to="/image-upload"
            icon={images_icon}
            custom_class="primary-button"
          />
        </div>
        <NavLinkComponent
          action={() => playGame(allImages)} // Pass a function reference instead of calling it
          disabled={allImages.length <= 1}
          rounded={true}
          text="PLAY AGAIN"
          to="/play"
          icon={play_icon}
          custom_class="secondary-button"
        />
      </ModalComponent>
    </div>
  );
}
