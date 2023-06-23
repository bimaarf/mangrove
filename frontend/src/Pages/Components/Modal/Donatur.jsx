import React from "react";

import ImageBackground from "../../../Images/mitra.png";

export const Donatur = () => {
  return (
    <>
      <input type="checkbox" id="mitra" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-opacity-70 backdrop-filter backdrop-brightness-100 bg-gray-900 text-white">
          <h1 className="text-center font-semibold text-2xl mt-6 mb-10">
            Mitra / Donatur
          </h1>
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
