import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format, differenceInDays } from "date-fns";
import { useState } from "react";

// Sortable header cell
function SortableHeader({ id, label, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <th
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide cursor-move select-none hover:bg-gray-100"
    >
      {label}
    </th>
  );
}

export default function BasicTable({ data }) {
  const today = new Date();

  const defaultColumns = [
    { id: "fullName", label: "Full Name" },
    { id: "email", label: "Email" },
    { id: "city", label: "City" },
    { id: "dsr", label: "DSR (Days Since Registration)" },
  ];

  const [columns, setColumns] = useState(defaultColumns);
  const [sortedData, setSortedData] = useState(data);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = columns.findIndex((c) => c.id === active.id);
    const newIndex = columns.findIndex((c) => c.id === over.id);
    setColumns(arrayMove(columns, oldIndex, newIndex));
  };

  const handleSort = (colId) => {
    if (sortColumn !== colId || sortDirection === "desc") {
      setSortColumn(colId);
      setSortDirection("asc");
      setSortedData(
        [...data].sort((a, b) => {
          if (colId === "fullName") {
            return `${a.firstName} ${a.lastName}`.localeCompare(
              `${b.firstName} ${b.lastName}`
            );
          }
          if (colId === "dsr") {
            return (
              differenceInDays(today, new Date(a.registeredAt)) -
              differenceInDays(today, new Date(b.registeredAt))
            );
          }
          return a[colId].localeCompare(b[colId]);
        })
      );
    } else {
      setSortDirection("desc");
      setSortedData(
        [...data].sort((a, b) => {
          if (colId === "fullName") {
            return `${b.firstName} ${b.lastName}`.localeCompare(
              `${a.firstName} ${a.lastName}`
            );
          }
          if (colId === "dsr") {
            return (
              differenceInDays(today, new Date(b.registeredAt)) -
              differenceInDays(today, new Date(a.registeredAt))
            );
          }
          return b[colId].localeCompare(a[colId]);
        })
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full text-left text-sm text-gray-800">
          <thead className="bg-gray-50">
            <SortableContext
              items={columns.map((c) => c.id)}
              strategy={horizontalListSortingStrategy}
            >
              <tr>
                {columns.map((col) => (
                  <SortableHeader
                    key={col.id}
                    id={col.id}
                    label={col.label}
                    onClick={() => handleSort(col.id)}
                  />
                ))}
              </tr>
            </SortableContext>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((person) => (
              <tr
                key={person.userId}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {columns.map((col) => {
                  let content;
                  if (col.id === "fullName")
                    content = `${person.firstName} ${person.lastName}`;
                  else if (col.id === "dsr")
                    content = differenceInDays(
                      today,
                      new Date(person.registeredAt)
                    );
                  else content = person[col.id];
                  return (
                    <td
                      key={col.id}
                      className="px-4 py-3 text-left text-sm text-gray-800"
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DndContext>
  );
}
