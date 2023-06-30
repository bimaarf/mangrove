import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const DeleteBlog = ({ getBlogAPI, item }) => {
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [formInput, setFormInput] = useState(item.category_name);
  const handleSubmit = async (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post("api/admin/blog/delete/" + item.id)
        .then((res) => {
          setLoadSubmit(false);
          if (res.data.status === 201)
            return toast.error("Kategori digunakan pada blog");
          toast.success("Kategori dihapus");
          document.getElementById(`delete-blog${item.id}`).click();
          setFormInput(formInput);
          getBlogAPI();
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
        id={`delete-blog${item.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-opacity-70 backdrop-filter backdrop-brightness-100 bg-gray-900 text-white">
          <h1 className="text-center font-semibold text-xl md:text-2xl md:mt-6 md:mb-10">
            Hapus Blog :{" "}
            {item.title.length > 50
              ? item.title.substring(0, 50) + "..."
              : item.title}
          </h1>
          <div className="modal-action flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loadSubmit ? true : false}
              className="bg-red-600 hover:bg-red-700 duration-200 text-md lg:text-xl rounded px-10 md:px-20 py-2 md:py-4">
              Hapus
            </button>
            <label
              htmlFor={`delete-blog${item.id}`}
              className="bg-gray-500 hover:bg-gray-600 duration-200 text-md lg:text-xl cursor-pointer rounded px-10 md:px-20 py-2 md:py-4">
              Tutup
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
