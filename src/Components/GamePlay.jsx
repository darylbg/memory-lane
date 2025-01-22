import React from "react";
import { useGame } from "../GameContext";

export default function GamePlay() {
  const { allImages } = useGame();
  return (
    <div className="flex flex-wrap gap-10">
      {allImages.length === 0 ? (
        <p>UPLOAD IMAGES TO PLAY</p>
      ) : (
        allImages.map((image, index) => {
          return (
            <div key={index} className="flex flex-col">
              <div className="h-[200px] w-[200px]">
                <img className="h-full w-full object-cover" src={image.imageUrl} alt={image.id} />
              </div>
              <div><span>{index + 1}</span></div>
              
            </div>
          );
        })
      )}
    </div>
  );
}
