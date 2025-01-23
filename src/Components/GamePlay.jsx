import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem"; // A separate component for each draggable item
import { CSS } from "@dnd-kit/utilities";
import { useGame } from "../GameContext";

export default function GamePlay() {
  const { shuffledGameSet, orderedGameSet, setShuffledGameSet } = useGame();
  console.log(shuffledGameSet);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      // Find the index of the dragged and target items
      const oldIndex = shuffledGameSet.findIndex((item) => item.id === active.id);
      const newIndex = shuffledGameSet.findIndex((item) => item.id === over.id);

      // Update the order in the state
      setShuffledGameSet((items) => arrayMove(items, oldIndex, newIndex));
    }
  };
  return (
    <div className="flex flex-wrap gap-10">
      <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={shuffledGameSet.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shuffledGameSet.map((item) => (
            <SortableItem key={item.id} id={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
    </div>
  );
}
