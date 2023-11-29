import React, { useState } from "react";
import ImagesBg from "../../Images/bg-home.jpg";
import { Footer } from "../Components/_Footer";
import { SidebarAdmin } from "./Components/_SidebarAdmin";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const Pengunjung = () => {
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [formInput, setFormInput] = useState({
    nama_pengunjung: "",
    nama_kegiatan: "",
    tahun: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadSubmit(true);
    const data = formInput;
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post("api/admin/pengunjung/store", data) // Make sure the endpoint is correct
        .then((res) => {
          setLoadSubmit(false);
          if (res.data.status === 201) return toast.warning("Server error");
          toast.success("Mitra berhasil disimpan");
          setFormInput({
            nama_pengunjung: "",
            nama_kegiatan: "",
            tahun: "",
          }); // Clear the form
          __GET_DATA_API();
        })
        .catch((error) => {
          toast.error("Gagal mengirim data. Silakan coba lagi.");
          setLoadSubmit(false);
        });
    });
  };

  const [getMitra, setMitra] = useState("");
  const __GET_DATA_API = () => {
    axios.get("api/pengunjung/view").then((res) => setMitra(res.data));
  };
  useEffect(() => {
    __GET_DATA_API();
  }, []);
  const handleDelete = (e) => {
    e.preventDefault();
    setLoadSubmit(true);
    axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post("api/admin/pengunjung/delete/" + e.target.value)
        .then((res) => {
          console.log(e.target.value);
          setLoadSubmit(false);
          if (res.data.status === 201) return toast.warning("server error");
          toast.success("berhasil dihapus");
          __GET_DATA_API();
        });
    });
  };
  return (
    <>
      <div
        className="h-96"
        style={{
          backgroundImage: `url(${ImagesBg})`,
        }}></div>
      <div className="bg-gray-200 bg-opacity-40">
        <div className="md:container md:mx-auto pb-10 md:pt-32 pt-36 mx-2">
          <div className="md:flex md:columns-2 md:gap-10 -mt-96">
            <SidebarAdmin />
            <div className="bg-white md:rounded-xl rounded-sm shadow md:shadow-none w-full p-3 md:p-10 ">
              <h1 className="md:text-2xl text-xl font-bold text-gray-800">
                Mitra
              </h1>

              <div className="md:flex justify-center items-center gap-1">
                <div className="mt-2 md:w-1/3">
                  <label
                    htmlFor="nama_pengunjung"
                    className="font-bold text-teal-600">
                    Nama Pengunjung
                  </label>
                  <input
                    value={formInput.nama_pengunjung}
                    type="text"
                    name="nama_pengunjung"
                    id="nama_pengunjung"
                    placeholder="Ketikkan sesuatu..."
                    className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full "
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-2 md:w-1/3">
                  <label
                    htmlFor="nama_kegiatan"
                    className="font-bold text-teal-600">
                    Nama Kegiatan
                  </label>
                  <input
                    value={formInput.nama_kegiatan}
                    type="text"
                    name="nama_kegiatan"
                    id="nama_kegiatan"
                    placeholder="Ketikkan sesuatu..."
                    className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full "
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-2 md:w-1/3">
                  <label htmlFor="tahun" className="font-bold text-teal-600">
                    Tahun
                  </label>
                  <input
                    value={formInput.tahun}
                    type="number"
                    name="tahun"
                    id="tahun"
                    placeholder="Ketikkan sesuatu..."
                    className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full "
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loadSubmit}
                  className="bg-cyan-600 hover-bg-cyan-700 duration-200 text-sm text-white rounded px-4 py-1 mt-4">
                  <span>Tambahkan</span>
                  {loadSubmit && (
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  )}
                </button>
              </div>
              <div className="overflow-x-auto">
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
                          <td>{item.nama_pengunjung}</td>
                          <td>{item.nama_kegiatan}</td>
                          <td>{item.tahun}</td>
                          <td>
                            <div className="flex justify-end items-center">
                              <button
                                disabled={loadSubmit ? true : false}
                                value={item.id}
                                onClick={handleDelete}
                                className="px-4 py-1 text-sm duration-200 bg-red-600 hover:bg-red-700 text-white rounded fa-solid fa-trash"></button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
