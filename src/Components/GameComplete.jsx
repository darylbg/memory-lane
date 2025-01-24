import React from "react";
import ModalComponent from "../Components/Primitive Components/ModalComponent";
import { useGame } from "../GameContext";
import GameWelcome from "./GameWelcome";
import ButtonComponent from "./Primitive Components/ButtonComponent";
import { NavLinkComponent } from "./Primitive Components/ButtonComponent";
import settings_icon from "../Assets/Icons/settings_icon.png";
import images_icon from "../Assets/Icons/images_icon.png";
import play_icon from "../Assets/Icons/play_icon.png";
import Slider from "react-slick";
import Carousel from "react-multi-carousel";

export default function GameComplete() {
  const { orderedGameSet, allImages, gameState, playGame, score, setScore } =
    useGame();
  console.log(orderedGameSet);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert to Date object
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date); // Format the date as "29 Apr 2023"
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
    console.log("total score", total_score);
    return total_score;
  };

  if (gameState !== "completed") {
    return <GameWelcome />;
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="flex flex-col gap-10 self-center">
      <div>
        <div className="flex gap-5 justify-center max-w-full">
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
            {score.hints_used}
          </div>
          <div>
            <span>TIME ELAPSED: </span>
            {score.time_elapsed}
          </div>
          <div>
            <span>PHOTOS PLAYED: </span>
            {score.game_set_count}
          </div>
          <div>
            <span>TOTAL SCORE: </span>
            {calculateScore(score)}
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
