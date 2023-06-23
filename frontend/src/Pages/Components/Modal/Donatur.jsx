import React from "react";

import ImageBackground from "../../../Images/mitra.png";

export const Donatur = () => {
  return (
    <>
      <input type="checkbox" id="mitra" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
            <h1 className="text-center font-medium text-3xl">Mitra</h1>
          <div className="flex justify-center">
            <img src={ImageBackground} alt="" />
          </div>
          <div className="modal-action">
            <label htmlFor="mitra" className="btn">
              Tutup
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
