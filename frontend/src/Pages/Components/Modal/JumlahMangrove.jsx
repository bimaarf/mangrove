import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import { DataMangrove, MangroveProvider } from "../../Admin/Data/DataMangrove";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export const JumlahMangrove = () => {
  var CanvasJS = CanvasJSReact.CanvasJS;
  const [getMangrove, setMangrove] = useState([]); // Initialize as an array
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
    axios.get("api/mangrove/view").then((res) => setMangrove(res.data));
  };
  useEffect(() => {
    __Get_Mangrove_API();
  }, []);
  return (
    <>
      <input type="checkbox" id="jumlah-mangrove" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 pt-14 max-w-5xl bg-opacity-70 backdrop-filter backdrop-brightness-100 bg-gray-900 text-white">
          <MangroveProvider>
            <DataMangrove />
          </MangroveProvider>
          <div className="modal-action">
            <label htmlFor="jumlah-mangrove" className="btn">
              Tutup
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
