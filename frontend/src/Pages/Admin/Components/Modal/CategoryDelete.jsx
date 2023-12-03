import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const DeleteCategory = ({ getCategoryAPI, item }) => {
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [formInput, setFormInput] = useState(item.category_name);
  const handleChange = (e) => {
    e.persist();
    setFormInput(e.target.value);
  };
  const handleSubmit = async (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post("api/admin/category/delete/" + item.id)
        .then((res) => {
          setLoadSubmit(false);
          if (res.data.status === 201)
            return toast.error("Kategori digunakan pada blog");
          toast.success("Kategori dihapus");
          document.getElementById(`delete-category${item.id}`).click();
          setFormInput(formInput);
          getCategoryAPI();
        })
        .catch(() => {
          setLoadSubmit(false);
          toast.error("Kategori digunakan pada blog");
        });
    });
  };
  return (
    <>
      <input
        type="checkbox"
        id={`delete-category${item.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-opacity-70 backdrop-filter backdrop-brightness-100 bg-gray-900 text-white">
          <h1 className="text-center font-semibold text-xl md:text-2xl md:mt-6 md:mb-10">
            Hapus Kategori : {item.category_name} ?
          </h1>
          <div className="modal-action flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loadSubmit ? true : false}
              className="bg-red-600 flex items-center gap-1 hover:bg-red-700 duration-200 text-md lg:text-xl rounded px-10 md:px-20 py-2 md:py-4">
              <span>Hapus</span>
              {loadSubmit && (
                <i className="fa-solid fa-spinner animate-spin"></i>
              )}
            </button>

            <label
              htmlFor={`delete-category${item.id}`}
              className="bg-gray-500 hover:bg-gray-600 duration-200 text-md lg:text-xl cursor-pointer rounded px-10 md:px-20 py-2 md:py-4">
              Tutup
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
