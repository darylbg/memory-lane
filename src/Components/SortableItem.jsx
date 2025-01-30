import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ id, item, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 150ms ease-in-out",
    zIndex: isDragging ? 10 : 0,
    opacity: isDragging ? 0.8 : 1, // Fade out the dragged item slightly
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-2 bg-gray-200 rounded-lg shadow-lg ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <img
        src={item.imageUrl}
        alt={`Image ${id}`}
        className=" h-[200px] w-[200px] object-cover rounded"
      />
      <p className="text-left px-2 mt-2 font-handwriting text-md font-semibold">
        {isDragging ? "moving" : `${index + 1}.`}
      </p>
    </div>
  );
};
