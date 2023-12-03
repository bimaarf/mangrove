import axios from "axios";
import React, { useEffect, useState } from "react";
export const JumlahPengunjung = ({ props }) => {
  const [getData, setData] = useState(props ? props : []);

  const __GET_DATA_API = () => {
    axios.get("api/pengunjung/view").then((res) => setData(res.data));
  };

  useEffect(() => {
    __GET_DATA_API();
  }, []);

  const handleRefresh = () => {
    __GET_DATA_API();
  };
  return (
    <>
      <input type="checkbox" id="jumlah-pengunjung" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 pt-14 max-w-5xl bg-opacity-70 backdrop-filter backdrop-brightness-100 bg-gray-900 text-white">
          <h1 className="text-center font-semibold border-b">Jumlah Pengunjung</h1>
          <table className="table">
            <thead>
              <tr className="text-white">
                <th>#</th>
                <th>Nama Pengunjung</th>
                <th>Nama Kegiatan</th>
                <th>Tahun</th>
              </tr>
            </thead>
            {getData ? (
              getData.map((item, key) => (
                <tbody>
                  <tr>
                    <td>{key + 1}</td>
                    <td>{item.nama_pengunjung}</td>
                    <td>{item.nama_kegiatan}</td>
                    <td>{item.tahun}</td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td>
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  </td>
                  <td>
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  </td>
                  <td>
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  </td>
                  <td>
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          <div className="flex justify-center">
            <button
              className="bg-orange-500 mt-4 rounded text-white px-4 py-1 animate-pulse text-xs"
              onClick={handleRefresh}>
              Reload Data
            </button>
          </div>
          <div className="modal-action">
            <label htmlFor="jumlah-pengunjung" className="btn">
              Tutup
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
