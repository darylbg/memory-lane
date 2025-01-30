import React, { useState } from "react";
import ButtonComponent from "./Primitive Components/ButtonComponent";
import { NavLinkComponent } from "./Primitive Components/ButtonComponent";
import check_icon from "../Assets/Icons/check_icon.png";
import back_icon from "../Assets/Icons/back_icon.png";
import ModalComponent from "./Primitive Components/ModalComponent";
import { useGame } from "../GameContext";

export default function GameThemes() {
  const { theme, switchTheme } = useGame();

  const randomTheme = () => {
    const altThemes = [
      "black_metal", "slutty", "euro_trash", "hardstyle"
    ];
  
    const randomIndex = Math.floor(Math.random() * altThemes.length); // Proper random index generation
    switchTheme(altThemes[randomIndex]); 
  };


  return (
    <ModalComponent>
      <div className="flex items-center ">
        <NavLinkComponent to="/" icon={back_icon} custom_class="back-button" />
        <h2 className="text-lg font-medium text-balance text-center translate-x-1/2">
          SWITCH THEMES
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        <ButtonComponent
          text="VIOLET EVERGARDEN"
          action={() => switchTheme("violet_evergarden")}
          icon={theme.name === "violet_evergarden" ? check_icon : null}
          custom_class={`${
            theme.name === "violet_evergarden"
              ? "primary-button-active"
              : "primary-button"
          }`}
        />
        <ButtonComponent
          text="ONLY SABRINA/CHAPPELL"
          action={() => switchTheme("sabrina_chappell")}
          icon={theme.name === "sabrina_chappell" ? check_icon : null}
          custom_class={`${
            theme.name === "sabrina_chappell"
              ? "primary-button-active"
              : "primary-button"
          }`}
        />
        <ButtonComponent
          text="(EMO)TIONALS"
          action={() => switchTheme("emo")}
          icon={theme.name === "emo" ? check_icon : null}
          custom_class={`${
            theme.name === "emo" ? "primary-button-active" : "primary-button"
          }`}
        />
        <ButtonComponent
          text="DABOOBADEEBIE"
          action={() => switchTheme("beabadoobee")}
          icon={theme.name === "beabadoobee" ? check_icon : null}
          custom_class={`${
            theme.name === "beabadoobee"
              ? "primary-button-active"
              : "primary-button"
          }`}
        />
        <ButtonComponent
          text="ANIME INTROS"
          action={() => switchTheme("anime_intros")}
          icon={theme.name === "anime_intros" ? check_icon : null}
          custom_class={`${
            theme.name === "anime_intros"
              ? "primary-button-active"
              : "primary-button"
          }`}
        />
        <ButtonComponent
          text="RANDOM THEME"
          action={randomTheme}
          icon={theme.name === "alt_theme" ? check_icon : null}
          custom_class={`${
            theme.name === "alt_theme"
              ? "primary-button-active"
              : "primary-button"
          }`}
        />
      </div>
    </ModalComponent>
  );
}
