import React from "react";
import ModalComponent from "../Components/Primitive Components/ModalComponent";
import { useGame } from "../GameContext";

export default function GameComplete() {
  const { orderedGameSet } = useGame();
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

  return (
    <div className="flex flex-col gap-10 self-center">
      <div className="flex gap-5">
        {orderedGameSet?.map((item, index) => {
          return (
            <div key={index} className="flex flex-col p-1 bg-gray-200 shadow-lg rounded-sm">
              <img
                src={item.imageUrl}
                alt=""
                className="h-[100px] w-[100px] object-cover"
              />
              <div className="mt-1 flex justify-between">
                <span className="font-handwriting text-sm font-semibold">
                  {index}.
                </span>
                <span className="font-handwriting text-sm font-regular italic">{formatDate(item.createdAt)}</span>{" "}
              </div>
            </div>
          );
        })}
      </div>
      <ModalComponent>success</ModalComponent>
    </div>
  );
}
