import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const AddCategory = ({ getCategoryAPI }) => {
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [formInput, setFormInput] = useState("");
  const handleChange = (e) => {
    e.persist();
    setFormInput(e.target.value);
  };
  const handleSubmit = async (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    const data = {
      category_name: formInput,
    };
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.post("api/admin/category/store", data).then((res) => {
        setLoadSubmit(false);
        if (res.data.status === 202) return toast.warning("Kategori sudah ada");
        if (res.data.status === 201) return toast.error("Ketikkan sesuatu");
        toast.success("Kategori ditambah");
        document.getElementById("add-category").click();
        setFormInput("");
        getCategoryAPI();
      });
    });
  };
  return (
    <>
      <input type="checkbox" id={`add-category`} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-opacity-70 backdrop-filter backdrop-brightness-100 bg-gray-900 text-white">
          <h1 className="text-center font-semibold text-xl md:text-2xl md:mt-6 md:mb-10">
            Tambah Kategori
          </h1>
          <form>
            <label htmlFor="category_name">Nama Kategori</label>
            <input
              required
              onChange={handleChange}
              type="text"
              value={formInput}
              name="category_name"
              id="category_name"
              placeholder="Masukkan nama kategori"
              className="outline-none border border-gray-400 px-2 py-1 bg-opacity-20 bg-white focus:border-green-500 active:scale-105 duration-300 form-control w-full md:w-1/2"
            />
            <div className="modal-action">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loadSubmit ? true : false}
                className="bg-cyan-600 flex items-center gap-1 hover:bg-cyan-700 duration-200 rounded px-10 py-1.5">
                <span>Tambah</span>
                {loadSubmit && (
                  <i className="fa-solid fa-spinner animate-spin"></i>
                )}
              </button>
              <label
                htmlFor={`add-category`}
                className="bg-gray-500 hover:bg-gray-600 duration-200 cursor-pointer rounded px-10 py-1.5">
                Tutup
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
