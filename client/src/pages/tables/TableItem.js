import React from "react";

const TableItem = ({ table }) => {
  return (
    <div className="group relative">
      <div
        className={`aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-3xl bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:min-h-48 flex items-center justify-center ${
          table.status === "unavailable" ? "bg-sky-500/50" : "outline-none"
        }`}
      >
        <h1 className="self-auto">Bàn {table.number}</h1>
      </div>
    </div>
  );
};

export default TableItem;
