import React, { useEffect, useState } from "react";
import DataTable from "./datatable";
require("es6-promise").polyfill();
require("isomorphic-fetch");

const Home = () => {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [searchColumn, setSearchColumn] = useState(["firstName", "lastName"]);
  const columns = data[0] && Object.keys(data[0]);

  useEffect(() => {
    fetch("https://devmentor.live/api/examples/contacts?api_key=b7c58b")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  // searching

  const search = (rows) => {
    return rows.filter((row) =>
      searchColumn.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  };
  return (
    <div>
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      ></input>
      {columns &&
        columns.map((column) => (
          <label>
            <input
              type="checkbox"
              checked={searchColumn.includes(column)}
              onChange={(e) => {
                const checked = searchColumn.includes(column);
                setSearchColumn((prev) =>
                  checked
                    ? prev.filter((sc) => sc !== column)
                    : [...prev, column]
                );
              }}
            />
            {column}
          </label>
        ))}

      <DataTable data={search(data)} />
    </div>
  );
};

export default Home;
