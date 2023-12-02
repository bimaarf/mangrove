import React from "react";

import ImageBackground from "../../../Images/mitra.png";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const Donatur = () => {
  const [getMitra, setMitra] = useState("");
  const __GET_MITRA_API = () => {
    axios.get("api/mitra-donatur/view").then((res) => setMitra(res.data));
  };
  useEffect(() => {
    __GET_MITRA_API();
  }, []);
  return (
    <>
      <input type="checkbox" id="mitra" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-opacity-70 backdrop-filter backdrop-brightness-100 bg-gray-900 text-white">
          <h1 className="text-center font-semibold text-2xl mt-6 mb-10">
            Mitra / Donatur
          </h1>
          <div className="flex justify-center">
            <table className="table mt-4 border-t border-dashed w-full table-auto">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Pemberi Dana</th>
                  <th>Kegiatan</th>
                  <th>Tahun</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {getMitra &&
                getMitra.map((item, key) => (
                  <tbody key={key}>
                    <tr>
                      <td>{key + 1}</td>
                      <td>{item.pemberi_dana}</td>
                      <td>{item.kegiatan}</td>
                      <td>{item.tahun}</td>
                    </tr>
                  </tbody>
                ))}
            </table>
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
