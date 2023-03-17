import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

function Table() {
  const [columns, setColumns] = useState([]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const table = svg.append("table");
    const thead = table.append("thead");
    const tbody = table.append("tbody");
    const tr = thead.append("tr");
    columns.forEach((column) => {
      tr.append("th").text(column);
    });
    // Add rows to tbody
    // ...
  }, [columns]);

  return (
    <div>
      <div>Drag columns from here:</div>
      <div>
        {["Column 1", "Column 2", "Column 3"].map((column) => (
          <div
            key={column}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData("text/plain", column);
            }}
          >
            {column}
          </div>
        ))}
      </div>
      <div>Drop columns here:</div>
      <div
        className="table"
        onDrop={(event) => {
          event.preventDefault();
          const column = event.dataTransfer.getData("text/plain");
          setColumns([...columns, column]);
        }}
        onDragOver={(event) => {
          event.preventDefault();
        }}
      >
        <div className="row header">
          {columns.map((column) => (
            <div key={column} className="cell">
              {column}
            </div>
          ))}
        </div>
        {["Row 1", "Row 2", "Row 3"].map((row) => (
          <div key={row} className="row">
            {columns.map((column) => (
              <div key={column} className="cell">
                {`${row}, ${column}`}
              </div>
            ))}
          </div>
        ))}
      </div>
      <svg ref={svgRef} />
    </div>
  );
}

export default Table;
