import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const ModalMitraUpdate = ({ item, __GET_MITRA_API }) => {
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [formInput, setFormInput] = useState({
    pemberi_dana: item.pemberi_dana,
    kegiatan: item.kegiatan,
    tahun: item.tahun,
  });
  const handleChange = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadSubmit(true);
    try {
      await axios.get("sanctum/csrf-cookie");
      const response = await axios.post(
        `api/admin/mitra-donatur/update/${item.id}`,
        formInput
      );
      document.getElementById(`modal-mitra-update-${item.id}`).click();
      setLoadSubmit(false);

      if (response.data.status === 201)
        return toast.warn("masukkan data dengan benar");
      __GET_MITRA_API();
      toast.success("Berhasil diupdate");
    } catch (error) {
      document.getElementById(`modal-mitra-update-${item.id}`).click();
      setLoadSubmit(false);

      return toast.error("server error");
    }
  };
  return (
    <>
      <input
        type="checkbox"
        id={`modal-mitra-update-${item.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-opacity-70 backdrop-filter backdrop-brightness-100 bg-gray-900 text-white">
          <h1 className="text-center font-semibold text-xl md:text-2xl md:mt-6 md:mb-10">
            Update Data Pengunjung
          </h1>
          <div className="lg:flex justify-start items-center gap-1">
            <div className="mt-4  w-full lg:w-2/3">
              <label htmlFor="pemberi_dana" className="font-medium">
                Nama Pengunjung
              </label>
              <input
                type="text"
                onChange={handleChange}
                value={formInput.pemberi_dana}
                name="pemberi_dana"
                id="pemberi_dana"
                placeholder="Masukkan nama pengunjung..."
                className="outline-none border px-2 py-3 text-gray-100 bg-opacity-25 bg-white focus:border-green-500 border-gray-700 active:scale-105 duration-300 form-control w-full"
              />
            </div>
            <div className="mt-4 w-full lg:w-1/3">
              <label htmlFor="kegiatan" className="font-medium">
                Nama Kegiatan
              </label>
              <input
                value={formInput.kegiatan}
                onChange={handleChange}
                type="text"
                name="kegiatan"
                id="kegiatan"
                placeholder="Masukkan nama kegiatan..."
                className="outline-none border px-2 py-3 text-gray-100 bg-opacity-25 bg-white focus-border-green-500 border-gray-700 active:scale-105 duration-300 form-control w-full"
              />
            </div>
            <div className="mt-4 w-full lg:w-1/3">
              <label htmlFor="tahun" className="font-medium">
                Tahun
              </label>
              <input
                value={formInput.tahun}
                onChange={handleChange}
                type="text"
                name="tahun"
                id="tahun"
                placeholder="Masukkan tahun..."
                className="outline-none border px-2 py-3 text-gray-100 bg-opacity-25 bg-white focus-border-green-500 border-gray-700 active:scale-105 duration-300 form-control w-full"
              />
            </div>
          </div>
          <div className="modal-action flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loadSubmit ? true : false}
              className="bg-red-600 hover:bg-red-700 duration-200 text-md lg:text-xl rounded px-10 md:px-20 py-2 md:py-4">
              <span>Update</span>
              {loadSubmit && (
                <i className="fa-solid fa-spinner animate-spin"></i>
              )}
            </button>
            <label
              htmlFor={`modal-mitra-update-${item.id}`}
              className="bg-gray-500 hover:bg-gray-600 duration-200 text-md lg:text-xl cursor-pointer rounded px-10 md:px-20 py-2 md:py-4">
              Tutup
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
