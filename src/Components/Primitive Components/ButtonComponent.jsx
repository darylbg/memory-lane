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
  return (
    <button
      disabled={disabled}
      onClick={action}
      style={{
        borderRadius: rounded ? "50px" : "4px",
        justifyContent: icon ? "space-between" : "center",
        height: text ? "44px" : "fit-content",
      }}
      className={`flex gap-5 h-[44px] items-center py-1 px-2 font-semibold ${custom_class}`}
    >
      {text}{" "}
      {icon && <img src={icon} alt={icon} className="h-[30px] w-[30px]" />}
    </button>
  );
}

export function NavLinkComponent({ to, text, icon, rounded, custom_class }) {
  return (
    <NavLink
      to={`${to}`}
      style={{ borderRadius: rounded ? "50px" : "4px" }}
      className={`flex gap-5  h-fit justify-between items-center py-1 px-2 font-semibold ${custom_class}`}
    >
      {text}{" "}
      {icon && <img src={icon} alt={icon} className="h-[30px] w-[30px]" />}
    </NavLink>
  );
}
