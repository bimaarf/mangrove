import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const UpdateMangrove = ({ getMangroveAPI, item }) => {
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [formInput, setFormInput] = useState({ label: item.label, y: item.y });
  const handleChange = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post("api/admin/mangrove/update/" + item.id, formInput)
        .then((res) => {
          setLoadSubmit(false);
          if (res.data.status === 201) return toast.error("Server Error");
          toast.success("Kategori diubah");
          document.getElementById(`update-mangrove${item.id}`).click();
          getMangroveAPI();
        })
        .catch(() => {
          setLoadSubmit(false);
    toast.error("Server Error");
        });
    });
  };
  return (
    <>
      <input
        type="checkbox"
        id={`update-mangrove${item.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-opacity-70 backdrop-filter backdrop-brightness-100 bg-gray-900 text-white">
          <h1 className="text-center font-semibold text-xl md:text-2xl md:mt-6 md:mb-10">
            Update Data Mangrove
          </h1>
          <div className="lg:flex justify-start items-center gap-1">
            <div className="mt-4  w-full lg:w-2/3">
              <label htmlFor="label" className="font-medium">
                Label
              </label>
              <input
                onChange={handleChange}
                value={formInput.label}
                type="text"
                name="label"
                id="label"
                placeholder="Masukkan Label..."
                className="outline-none border px-2 py-3 text-gray-100 bg-opacity-25 bg-white focus:border-green-500 border-gray-700 active:scale-105 duration-300 form-control w-full"
              />
            </div>
            <div className="mt-4 w-full lg:w-1/3">
              <label htmlFor="label" className="font-medium">
                Jumlah
              </label>
              <input
                onChange={handleChange}
                value={formInput.y}
                type="text"
                name="y"
                id="y"
                placeholder="Masukkan Jumlah..."
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
              htmlFor={`update-mangrove${item.id}`}
              className="bg-gray-500 hover:bg-gray-600 duration-200 text-md lg:text-xl cursor-pointer rounded px-10 md:px-20 py-2 md:py-4">
              Tutup
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
