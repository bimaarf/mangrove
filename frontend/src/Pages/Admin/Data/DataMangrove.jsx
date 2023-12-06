import React, { useState, useContext, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

import axios from "axios";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Create context
const MangroveContext = React.createContext();

export function MangroveProvider({ children }) {
  const [getMangrove, setMangrove] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateMangrove = (newData) => {
    setMangrove(newData);
    setLoading(false);
  };

  useEffect(() => {
    // Fetch data Mangrove when the component is mounted
    axios
      .get("api/mangrove/view")
      .then((res) => {
        updateMangrove(res.data);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this effect runs once

  return (
    <MangroveContext.Provider
      value={{ getMangrove, updateMangrove, loading, error }}>
      {children}
    </MangroveContext.Provider>
  );
}

export function useMangrove() {
  return useContext(MangroveContext);
}

export const DataMangrove = () => {
  const { getMangrove, updateMangrove, loading, error } = useMangrove();

  const options = {
    title: {
      text: "Jumlah Mangrove Ditanam",
    },
    data: [
      {
        type: "column",
        dataPoints: getMangrove,
      },
    ],
  };

  const reloadMangroveData = () => {
    // Reload Mangrove data
    axios
      .get("api/mangrove/view")
      .then((res) => {
        updateMangrove(res.data);
      })
      .catch((err) => {
        console.error("Error reloading data:", err);
      });
  };

  return (
    <div>
      <CanvasJSChart options={options} />
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <div className="flex justify-center mt-4">
        <button
          className="bg-orange-500 rounded text-white px-4 py-2 hover:bg-orange-600"
          onClick={reloadMangroveData}>
          Reload Data
        </button>
      </div>
    </div>
  );
};
