import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ImagesBg from "../../Images/bg-home.jpg";
import { Footer } from "../Components/_Footer";
import { SidebarAdmin } from "./Components/_SidebarAdmin";
import { DataMangrove, MangroveProvider } from "./Data/DataMangrove";
import { DeleteMangrove } from "./Components/Modal/MangroveDelete";
import { UpdateMangrove } from "./Components/Modal/MangroveUpdate";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const PageMangrove = () => {
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [formInput, setFormInput] = useState({
    label: "",
    y: "",
    tahun: "",
  });

  const handleChange = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadSubmit(true);

    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post("api/admin/mangrove/store", formInput)
        .then((res) => {
          setLoadSubmit(false);
          if (res.data.status === 201) {
            toast.warning("Server error");
          } else {
            toast.success("Berhasil ditambahkan");
            setFormInput({ label: "", y: "", tahun: "" });
            __GET_MANGROVE_API();
          }
        })
        .catch(() => {
          setLoadSubmit(false);
          toast.error("Server error");
        });
    });
  };

  const [getMangrove, setMangrove] = useState([]);
  const __GET_MANGROVE_API = () => {
    axios.get("api/mangrove/view").then((res) => setMangrove(res.data));
  };
  useEffect(() => {
    __GET_MANGROVE_API();
  }, []);
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
                Kelola Jumlah Mangrove
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
                    className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full"
                  />
                </div>
                <div className="mt-4 w-full lg:w-1/3">
                  <label htmlFor="label" className="font-medium">
                    Jumlah
                  </label>
                  <input
                    onChange={handleChange}
                    value={formInput.y}
                    type="number"
                    name="y"
                    id="y"
                    placeholder="Masukkan Jumlah..."
                    className="outline-none border px-2 py-1 focus-border-green-500 active:scale-105 duration-300 form-control w-full"
                  />
                </div>
                <div className="mt-4 w-full lg:w-1/3">
                  <label htmlFor="tahun" className="font-medium">
                    Tahun
                  </label>
                  <input
                    value={formInput.tahun}
                    onChange={handleChange}
                    type="number"
                    name="tahun"
                    id="tahun"
                    placeholder="Masukkan tahun..."
                    className="outline-none border px-2 py-1 focus-border-green-500 active:scale-105 duration-300 form-control w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end items-center gap-1 mt-6">
                <label
                  htmlFor="jumlah-mangrove"
                  className="flex justify-center cursor-pointer items-baseline gap-1 bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 text-sm rounded-md">
                  <i className="fa-solid fa-chart-simple"></i>
                  <span>Lihat Chart</span>
                </label>
                <button
                  disabled={loadSubmit ? true : false}
                  onClick={handleSubmit}
                  className="flex justify-center items-baseline gap-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 text-sm rounded-md">
                  <span>Tambahkan</span>
                  {loadSubmit ? (
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  ) : (
                    <i className="fa-solid fa-plus"></i>
                  )}
                </button>
              </div>
              <MangroveProvider>
                <DataMangrove updateMangrove={handleSubmit} />
              </MangroveProvider>
              <div className="overflow-x-auto">
                <table className="table mt-4 border-t border-dashed w-full table-auto">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tempat</th>
                      <th>Jumlah Mangrove</th>
                      <th>Tahun</th>
                      <th>xyz</th>
                    </tr>
                  </thead>
                  {getMangrove &&
                    getMangrove.map((item, key) => (
                      <tbody key={key}>
                        <tr>
                          <td>{key + 1}</td>
                          <td>{item.label}</td>
                          <td>{item.y}</td>
                          <td>{item.tahun}</td>
                          <td>
                            <div className="flex justify-end items-center gap-1">
                              <UpdateMangrove
                                getMangroveAPI={__GET_MANGROVE_API}
                                item={item}
                              />
                              <DeleteMangrove
                                getMangroveAPI={__GET_MANGROVE_API}
                                item={item}
                              />
                              <label
                                htmlFor={`update-mangrove${item.id}`}
                                className="fa-solid fa-pencil cursor-pointer px-3 py-1 rounded bg-orange-600 hover:bg-orange-700 text-sm text-white"></label>
                              <label
                                htmlFor={`delete-mangrove${item.id}`}
                                className="fa-solid fa-trash cursor-pointer px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-sm text-white"></label>
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
