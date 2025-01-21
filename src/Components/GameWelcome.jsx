import React from "react";
import ButtonComponent from "./Primitive Components/ButtonComponent";
import { NavLinkComponent } from "./Primitive Components/ButtonComponent";
import settings_icon from "../Assets/Icons/settings_icon.png";
import images_icon from "../Assets/Icons/images_icon.png";
import play_icon from "../Assets/Icons/play_icon.png";

export default function GameWelcome() {
  const testButton = () => {
    console.log("i am clicked");
  };
  return (
    <div className="flex flex-col gap-10 self-center p-5 bg-white bg-opacity-90 rounded-xl w-[400px] max-w-100vw">
      <h2 className="text-xl font-medium text-center">
        Upload your photos, a random selection will be chosen for you to arrange in
        order by date. Aim for the lowest score by using less time, fewer
        attempts, and minimal hints.
      </h2>
      <div className="flex flex-col gap-2">
        <NavLinkComponent
          text="THEMES"
          to="/themes"
          icon={settings_icon}
          custom_class="primary-button"
        />
        <NavLinkComponent
          text="UPLOAD PHOTOS"
          to="/image-upload"
          icon={images_icon}
          custom_class="primary-button"
        />
      </div>
      <ButtonComponent
        disabled={true}
        rounded={true}
        text="UPLOAD PHOTOS TO PLAY"
        action={testButton}
        icon={play_icon}
        custom_class="secondary-button"
      />
    </div>
  );
}
