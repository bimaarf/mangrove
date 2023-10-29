import React, { useState, useContext, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Membuat konteks
const MangroveContext = React.createContext();

export function MangroveProvider({ children }) {
  const [getMangrove, setMangrove] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateMangrove = (newData) => {
    setMangrove(newData);
  };

  useEffect(() => {
    // Panggil data Mangrove saat komponen dimuat
    axios.get("api/mangrove/view").then((res) => {
      updateMangrove(res.data);
      setLoading(false);
    });
  }, []); // Empty dependency array ensures this effect runs once

  return (
    <MangroveContext.Provider value={{ getMangrove, updateMangrove, loading }}>
      {children}
    </MangroveContext.Provider>
  );
}

export function useMangrove() {
  return useContext(MangroveContext);
}

export const DataMangrove = () => {
  const { getMangrove, updateMangrove, loading } = useMangrove();

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

  const __Get_Mangrove_API = () => {
    // Reload data Mangrove
    axios.get("api/mangrove/view").then((res) => {
      updateMangrove(res.data);
    });
  };

  if (loading) {
    return <p>Loading...</p>; // Tampilkan pesan loading saat data sedang diambil
  }

  return (
    <div>
      <CanvasJSChart options={options} />
      <div className="flex justify-center">
        <button
          className="bg-orange-500 rounded text-white px-4 py-1 animate-pulse text-xs"
          onClick={__Get_Mangrove_API}>
          Reload Data
        </button>
      </div>
    </div>
  );
};
