import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

export const ImageModal = ({ item, getGalleryAPI }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.post("api/admin/gallery/delete/" + item.id).then((res) => {
        if (res.data.status === 201) return toast.warning("Server error");
        toast.success("berhasil dihapus");
        getGalleryAPI();
        document.getElementById(`images${item.id}`).click();
      });
    });
  };
  return (
    <>
      <input type="checkbox" id={`images${item.id}`} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-opacity-70 backdrop-filter backdrop-brightness-100 bg-gray-900 text-white">
          <h1 className="text-center font-semibold text-2xl mt-6 mb-10">
            Detail Gambar
          </h1>
          <div className="flex justify-center">
            <img
              src={process.env.REACT_APP_API + "Images/Gallery/" + item.image}
              alt=""
            />
          </div>
          <div className="modal-action">
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 duration-200 rounded px-10 py-1.5">
              Hapus
            </button>
            <label
              htmlFor={`images${item.id}`}
              className="bg-gray-500 hover:bg-gray-600 duration-200 cursor-pointer rounded px-10 py-1.5">
              Tutup
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
