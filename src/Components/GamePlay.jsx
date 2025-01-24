import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { useGame } from "../GameContext";
import ButtonComponent from "./Primitive Components/ButtonComponent";
import forward_icon from "../Assets/Icons/forward_icon.png";
import GameWelcome from "./GameWelcome";

export default function GamePlay() {
  const {
    shuffledGameSet,
    setShuffledGameSet,
    submitGame,
    hints,
    generateHints,
    setHints,
    gameState
  } = useGame();

  const [activeId, setActiveId] = useState(null);
  const [currentHintIndex, setCurrentHintIndex] = useState(0); // Track the current hint to display

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const activeItem = shuffledGameSet.find((item) => item.id === activeId);

  const handleDragStart = (event) => {
    setActiveId(event.active.id); // Track the dragged item
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
  
    if (over && active.id !== over.id) {
      const oldIndex = shuffledGameSet.findIndex((item) => item.id === active.id);
      const newIndex = shuffledGameSet.findIndex((item) => item.id === over.id);
  
      // Update shuffled set
      const newShuffledGameSet = arrayMove(shuffledGameSet, oldIndex, newIndex);
      setShuffledGameSet(newShuffledGameSet);
  
      // Generate hints based on the updated shuffled set
      const newHints = generateHints(newShuffledGameSet);
      setHints(newHints); // Update the hints state
    }
  
    setActiveId(null); // Reset active item after dragging
  };
  

  const handleDragCancel = () => {
    setActiveId(null); // Handle drag cancellation
  };

  const handleSubmit = () => {
    const isCorrect = submitGame(shuffledGameSet);
    if (isCorrect) {
      alert("Congratulations! You matched the correct order.");
    } else {
      alert("Incorrect order. Try again or check hints.");
    }
  };

  if (gameState !== "playing") {
    return <GameWelcome />
  }

  return (
    <div className="flex flex-col justify-center items-center pt-10 pb-2 gap-10">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={shuffledGameSet.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
            {shuffledGameSet.map((item, index) => (
              <SortableItem key={item.id} id={item.id} item={item} index={index} />
            ))}
          </div>
        </SortableContext>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeItem ? (
            <div className="p-2 bg-gray-200 rounded-lg shadow-lg">
              <img
                src={activeItem.imageUrl}
                alt={`Image ${activeItem.id}`}
                className="h-[200px] w-[200px] object-cover rounded"
              />
              <p className="text-left px-2 font-handwriting text-md font-semibold mt-2">moving</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      <div className="flex flex-col sm:flex-row w-full justify-end items-center gap-4">
        <ButtonComponent
          action={handleSubmit} // Pass handleSubmit here
          custom_class="secondary-button"
          text="SUBMIT GAME"
          icon={forward_icon}
        />
      </div>
    </div>
  );
}
