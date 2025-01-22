import React from "react";
import ButtonComponent from "./Primitive Components/ButtonComponent";
import { NavLinkComponent } from "./Primitive Components/ButtonComponent";
import check_icon from "../Assets/Icons/check_icon.png";
import back_icon from "../Assets/Icons/back_icon.png";
import ModalComponent from "./Primitive Components/ModalComponent";
import { useGame } from "../GameContext";

export default function GameThemes() {
  const { theme, switchTheme } = useGame();
  const testButton = () => {
    console.log("tested");
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
          text="HELLO KITTY"
          action={() => switchTheme("hello_kitty")}
          icon={theme.name === "hello_kitty" ? check_icon : null}
          custom_class={`${
            theme.name === "hello_kitty"
              ? "primary-button-active"
              : "primary-button"
          }`}
        />
        <ButtonComponent
          text="E-GIRL"
          action={() => switchTheme("e_girl")}
          icon={theme.name === "e_girl" ? check_icon : null}
          custom_class={`${
            theme.name === "e_girl" ? "primary-button-active" : "primary-button"
          }`}
        />
      </div>
    </ModalComponent>
  );
}
