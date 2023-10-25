import React, { useState, useContext, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Membuat konteks
const MangroveContext = React.createContext();

export function MangroveProvider({ children }) {
  const [getMangrove, setMangrove] = useState([]);

  const updateMangrove = (newData) => {
    setMangrove(newData);
  };

  return (
    <MangroveContext.Provider value={{ getMangrove, updateMangrove }}>
      {children}
    </MangroveContext.Provider>
  );
}

export function useMangrove() {
  return useContext(MangroveContext);
}

export const DataMangrove = () => {
  const { getMangrove, updateMangrove } = useMangrove();

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
    axios.get("api/mangrove/view").then((res) => {
      updateMangrove(res.data);
    });
  };

  useEffect(() => {
    __Get_Mangrove_API();
  }, [updateMangrove]);

  return <CanvasJSChart options={options} />;
};
