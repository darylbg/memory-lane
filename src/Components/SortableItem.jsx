import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ id, item }) => {
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
    transition,
    zIndex: isDragging ? 10 : 0,
  };

  return (
    <div className="background-gray-200">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`border p-2 rounded-lg bg-gray-100 hover:shadow-md ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <img
          src={item.imageUrl}
          alt={`Image ${id}`}
          className="w-full h-auto object-cover rounded"
        />
        <p className="text-center text-sm mt-2">{item.createdAt}</p>
      </div>
    </div>
  );
};
