import React from "react";
import { NavLink } from "react-router-dom";

export default function ButtonComponent({
  action,
  text,
  icon,
  rounded,
  custom_class,
  disabled,
}) {
  const handleClick = (event) => {
    event.stopPropagation(); // Prevent the event from propagating
    if (!disabled && action) {
      action(event);
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      style={{
        borderRadius: rounded ? "50px" : "4px",
        justifyContent: icon ? "space-between" : "center",
        height: text ? "44px" : "fit-content",
      }}
      className={`group flex gap-2 h-[44px] items-center py-1 px-2 font-semibold ${custom_class}`}
    >
      {text}{" "}
      {icon && (
        <img
          src={icon}
          alt={icon}
          className="h-[30px] w-[30px] transition-transform duration-200 ease-in-out group-hover:scale-[110%]"
        />
      )}
    </button>
  );
}

export function NavLinkComponent({
  action,
  to,
  text,
  icon,
  rounded,
  custom_class,
  disabled,
}) {
  const handleClick = (event) => {
    event.stopPropagation(); // Prevent the event from propagating
    if (!disabled && action) {
      action(event);
    }
  };

  return (
    <NavLink
      onClick={handleClick}
      to={disabled ? "" : `${to}`}
      style={{ borderRadius: rounded ? "50px" : "4px" }}
      className={`group flex gap-2 h-fit justify-between items-center py-1 px-2 font-semibold ${custom_class} ${
        disabled && text ? "navlink-disabled" : disabled ? "navlink-link-disabled" : ""
      }`}
    >
      {text}{" "}
      {icon && (
        <img
          src={icon}
          alt={icon}
          className="h-[30px] w-[30px] transition-transform duration-200 ease-in-out group-hover:scale-[110%]"
        />
      )}
    </NavLink>
  );
}
