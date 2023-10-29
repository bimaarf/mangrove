import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const DeleteMangrove = ({ getMangroveAPI, item }) => {
  const [loadSubmit, setLoadSubmit] = useState(false);

  const handleSubmit = async (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post("api/admin/mangrove/delete/" + item.id)
        .then((res) => {
          setLoadSubmit(false);
          if (res.data.status === 201)
            return toast.error("Server Error");
          toast.success("Data Mangrove dihapus");
          document.getElementById(`delete-mangrove${item.id}`).click();
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
        id={`delete-mangrove${item.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-opacity-70 backdrop-filter backdrop-brightness-100 bg-gray-900 text-white">
          <h1 className="text-center font-semibold text-xl md:text-2xl md:mt-6 md:mb-10">
            Hapus Kategori : {item.label} ?
          </h1>
          <div className="modal-action flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loadSubmit ? true : false}
              className="bg-red-600 hover:bg-red-700 duration-200 text-md lg:text-xl rounded px-10 md:px-20 py-2 md:py-4">
              <span>Hapus</span>
              {loadSubmit && (
                <i className="fa-solid fa-spinner animate-spin"></i>
              )}
            </button>
            <label
              htmlFor={`delete-mangrove${item.id}`}
              className="bg-gray-500 hover:bg-gray-600 duration-200 text-md lg:text-xl cursor-pointer rounded px-10 md:px-20 py-2 md:py-4">
              Tutup
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
