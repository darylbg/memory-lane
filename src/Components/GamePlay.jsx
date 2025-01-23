import React from "react";
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

export default function GamePlay() {
  const { shuffledGameSet, setShuffledGameSet, submitGame } = useGame();
  const [activeId, setActiveId] = React.useState(null);

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

      setShuffledGameSet((items) => arrayMove(items, oldIndex, newIndex));
    }
    setActiveId(null); // Reset active item after dragging
  };

  const handleDragCancel = () => {
    setActiveId(null); // Handle drag cancellation
  };

  return (
    <div className="flex justify-center items-center py-10">
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
                className=" h-[200px] w-[200px] object-cover rounded"
              />
              <p className="text-left px-2 font-handwriting text-md font-semibold mt-2">moving</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
