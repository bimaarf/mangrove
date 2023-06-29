import React, { useEffect, useState } from "react";
import ImagesBg from "../../Images/bg-home.jpg";
import { Footer } from "../Components/_Footer";
import { SidebarAdmin } from "./Components/_SidebarAdmin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ImageModal } from "./Components/Modal/Image";

export const PageGallery = () => {
  const [imageFormat, setImageFormat] = useState([]);
  const [loadSubmit, setLoadSubmit] = useState(false);
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
  const handleSubmit = async (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    const pushServer = new FormData();
    imageFormat.forEach((file) => {
      pushServer.append("image[]", file.fileName);
    });
    const data = pushServer;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.post("api/admin/gallery/store", data, config).then((res) => {
        setTimeout(() => {
          setLoadSubmit(false);
        }, 2000);

        if (res.data.status === 203) return toast.warning("Masukkan gambar");
        if (res.data.status === 202)
          return toast.warning("Masukkan data dengan benar");
        toast.success("Gambar berhasil ditambahkan");
        setImageFormat([]);
        getGalleryAPI();
      });
    });
  };

  const [getGallery, setGallery] = useState("");
  const getGalleryAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/admin/gallery/view").then((res) => {
        setGallery(res.data);
      });
    });
  };
  useEffect(() => {
    getGalleryAPI();
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
                Kelola Halaman Gallery
              </h1>
              <label className="text-gray-700 text-sm md:text-md font-semibold">
                Upload Gambar
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
                    className="w-full h-28 mt-2 cursor-pointer relative overflow-hidden bg-cover bg-no-repeat">
                    <img
                      id="myImg"
                      src={item.url}
                      className="block h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110 shadow-md"
                      alt={item.url}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleSubmit}
                disabled={loadSubmit ? true : false}
                className="bg-green-600 hover:bg-green-700 duration-200 px-10 py-1 text-white rounded w-1/3 float-right">
                Upload
              </button>
              <div className="grid md:grid-cols-4 grid-cols-2 gap-1 mt-20">
                {getGallery &&
                  getGallery.map((item, key) => (
                    <label key={key}>
                      <div
                        htmlFor={`images${item.id}`}
                        className="w-full h-32 mt-2 cursor-pointer relative overflow-hidden bg-cover bg-no-repeat">
                        <img
                          alt="gallery"
                          className="block h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110 shadow-md"
                          src={
                            process.env.REACT_APP_API +
                            "Images/Gallery/" +
                            item.image
                          }
                        />
                      </div>
                      <ImageModal item={item} getGalleryAPI={getGalleryAPI} />
                    </label>
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
