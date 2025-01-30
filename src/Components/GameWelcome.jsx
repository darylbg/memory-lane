import React from "react";
import { NavLinkComponent } from "./Primitive Components/ButtonComponent";
import settings_icon from "../Assets/Icons/settings_icon.png";
import images_icon from "../Assets/Icons/images_icon.png";
import play_icon from "../Assets/Icons/play_icon.png";
import ModalComponent from "./Primitive Components/ModalComponent";
import { useGame } from "../GameContext";

export default function GameWelcome() {
  const { allImages, playGame } = useGame();

  return (
    <ModalComponent>
      <h2 className="text-xl font-medium text-center">
        {allImages.length < 2
          ? "Upload between 2 and 20 photos, "
          : "You are ready to play, "}
        a random selection will be chosen for you to arrange in order by date.
        Aim for the lowest score by using less time, fewer attempts, and minimal
        hints.
      </h2>
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
        text={
          allImages.length === 0
            ? "UPLOAD PHOTOS TO PLAY"
            : allImages.length === 1
            ? "ADD MORE PHOTOS TO PLAY"
            : "PLAY GAME"
        }
        to="/play"
        icon={play_icon}
        custom_class="secondary-button"
      />
    </ModalComponent>
  );
}
