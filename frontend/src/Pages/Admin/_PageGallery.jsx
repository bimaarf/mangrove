import React, { useState } from "react";
import ImagesBg from "../../Images/bg-home.jpg";
import { Footer } from "../Components/_Footer";
import { SidebarAdmin } from "./Components/_SidebarAdmin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const PageGallery = () => {
  const [imageFormat, setImageFormat] = useState([]);
  const navRedirect = useNavigate();
  const handleInputImage = (e) => {
    const file = e.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      toast.warning("Format tidak sesuai");
    } else {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        // localStorage.setItem("header-image", reader.result);
        setImageFormat([
          ...imageFormat,
          { url: reader.result, fileName: file },
        ]);
      });
      reader.readAsDataURL(file);
    }
  };
  const handleDelImage = (e, index) => {
    e.preventDefault();
    imageFormat.splice(index, 1);
    setImageFormat(imageFormat);
    navRedirect("/administrator/kelola-gallery");
  };
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${ImagesBg})`,
        }}>
        <div className="md:container md:mx-auto pb-10 md:pt-32 pt-36 mx-2">
          <div className="md:flex md:columns-2 md:gap-10">
            <SidebarAdmin />
            <div className="bg-white md:rounded-xl rounded-sm shadow md:shadow-none w-full p-3 md:p-10 ">
              <h1 className="md:text-2xl text-xl font-bold text-gray-800">
                Kelola Gallery
              </h1>
              <label className="text-gray-700 text-sm md:text-md font-semibold">
                Upload Gambar Produk
              </label>{" "}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <label className="flex cursor-pointer shadow-sm scale-90 flex-col w-full h-32 border border-green-500 border-dashed hover:bg-slate-100 hover:border-green-600 duration-200">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-orange-400 text-xs mt-5 p-1 text-center scale-75">
                        Format JPG / JPEG / PNG
                      </p>
                    </>
                  </div>
                  <input
                    id="input-image"
                    onChange={handleInputImage}
                    type="file"
                    accept="image/*"
                    name="image[]"
                    className="opacity-0"
                    required
                  />
                </label>
                {imageFormat.map((item, index) => (
                  <div
                    key={index}
                    onClick={(e) => handleDelImage(e, index)}
                    className="flex items-center shadow-sm justify-around border gap-4 m-1 p-1 hover:bg-slate-100 cursor-pointer">
                    <img
                      id="myImg"
                      src={item.url}
                      className=" text-gray-400 group-hover:text-gray-600 w-36"
                      alt={item.url}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
