import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const BlogUpdate = ({ item, getCategory, getBlogAPI }) => {
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [formInput, setFormInput] = useState({
    title: item.title,
    body: item.body,
    category_id: item.category_id,
  });
  const handleChange = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadSubmit(true);
    const data = {
      title: formInput.title,
      body: formInput.body,
      category_id: formInput.category_id,
    };
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post("api/admin/blog/update/" + item.id, data)
        .then((res) => {
          setLoadSubmit(false);
          if (res.data.status === 101)
            return toast.warning("Judul postingan sudah ada");
          if (res.data.status === 202)
            return toast.warning("Title maksimal:255");
          if (res.data.status === 201)
            return toast.warning("Masukkan data dengan benar");
          toast.success("Berhasil diubah");
          document.getElementById(`update-blog${item.id}`).click();
          getBlogAPI();
        })
        .catch(() => {
          setLoadSubmit(false);
        });
    });
  };
  return (
    <>
      <input
        type="checkbox"
        id={`update-blog${item.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-opacity-70 backdrop-filter backdrop-brightness-100 bg-gray-900 text-white">
          <h1 className="text-center font-semibold text-xl md:text-2xl md:mt-6 md:mb-10">
            Update Kategori
          </h1>
          <form>
            <div className="mt-2 flex justify-center gap-2">
              <div className="w-1/2">
                <label htmlFor="title">Title</label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleChange}
                  value={formInput.title}
                  placeholder="Masukkan Title"
                  className="outline-none border border-gray-400 px-2 py-1 bg-opacity-20 bg-white focus:border-green-500 active:scale-105 duration-300 form-control w-full"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="category_id">Kategori</label>
                <select
                  onChange={handleChange}
                  defaultValue={formInput.category_id}
                  className="outline-none border border-gray-400 px-2 bg-opacity-20 bg-white focus:border-green-500 duration-300 form-control w-full"
                  name="category_id"
                  id="category_id"
                  style={{ paddingTop: 4.5, paddingBottom: 4.5 }}>
                  {getCategory.map((categ, keyCateg) => (
                    <option
                      key={keyCateg}
                      value={JSON.stringify(categ.id)}
                      className="text-black">
                      {categ.category_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-2">
              <label htmlFor="body">Konten</label>
              <textarea
                required
                name="body"
                id="body"
                cols="30"
                onChange={handleChange}
                rows="10"
                value={formInput.body}
                placeholder="Masukkan Title"
                className="outline-none border border-gray-400 px-2 py-1 bg-opacity-20 bg-white focus:border-green-500 active:scale-105 duration-300 form-control w-full"></textarea>
            </div>
            <div className="modal-action">
              <button
                onClick={handleSubmit}
                type="submit"
                disabled={loadSubmit ? true : false}
                className="bg-yellow-600 flex items-center gap-1 hover:bg-yellow-700 duration-200 rounded px-10 py-1.5">
                <span>Update</span>
                {loadSubmit && (
                  <i className="fa-solid fa-spinner animate-spin"></i>
                )}
              </button>
              <label
                htmlFor={`update-blog${item.id}`}
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
