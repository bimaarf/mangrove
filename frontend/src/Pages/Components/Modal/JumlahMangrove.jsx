import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export const JumlahMangrove = () => {
  var CanvasJS = CanvasJSReact.CanvasJS;
  const options = {
    title: {
      text: "Jumlah Mangrove Ditanam",
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Benteng, Kelurahan Terusan", y: 7500 },
          { label: "Desa Penibung", y: 20000 },
          { label: "Desa Sungai Bakau Kecil", y: 44000 },
          { label: "Desa Sungai Bakau Besar Laut", y: 57800 },
          { label: "Desa Pasir", y: 253000 },
          { label: "Desa Sengkubang", y: 3000 },
          { label: "Dusun Senggiring", y: 10200 },
          { label: "Desa Sui. Purun Kecil", y: 5000 },
          { label: "Muara Kuala Mpw", y: 2220 },
        ],
      },
    ],
  };
  return (
    <>
      <input type="checkbox" id="jumlah-mangrove" className="modal-toggle" />
      <div className="modal">
        <div className="pb-10 w-10/12">
          <CanvasJSChart
            options={options}
            /* onRef = {ref => this.chart = ref} */
          />
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
