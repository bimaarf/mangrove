import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ImagesBg from "../../Images/bg-home.jpg";
import { Footer } from "../Components/_Footer";
import { SidebarAdmin } from "./Components/_SidebarAdmin";
import { DataMangrove, MangroveProvider } from "./Data/DataMangrove";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const PageMangrove = () => {
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [formInput, setFormInput] = useState({
    label: "",
    y: "",
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
            setFormInput({ label: "", y: "" });
          }
        })
        .catch(() => {
          setLoadSubmit(false);
          toast.error("Server error");
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
                Kelola Jumlah Mangrove :{" "}
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
                    type="text"
                    name="y"
                    id="y"
                    placeholder="Masukkan Jumlah..."
                    className="outline-none border px-2 py-1 focus-border-green-500 active:scale-105 duration-300 form-control w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSubmit}
                  className="flex justify-center items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 text-sm rounded-md">
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
