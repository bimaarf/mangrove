import React, { useEffect, useState } from "react";
import ImagesBg from "../../Images/bg-home.jpg";
import { Footer } from "../Components/_Footer";
import { SidebarAdmin } from "./Components/_SidebarAdmin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ImageModal } from "./Components/Modal/Image";
import { AddCategory } from "./Components/Modal/CategoryAdd";
import { UpdateCategory } from "./Components/Modal/CategoryUpdate";
import { DeleteCategory } from "./Components/Modal/CategoryDelete";
import { BlogAdmin } from "./Components/_BlogAdmin";
import { LoadingScreen } from "../../LoadingScreen";

export const PageBlog = () => {
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
    navRedirect("/administrator/kelola-blog");
  };

  const [getCategory, setCategory] = useState("");
  const getCategoryAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/admin/category/view").then((res) => {
        setCategory(res.data);
      });
    });
  };
  useEffect(() => {
    getCategoryAPI();
  }, []);
  const [formInput, setFormInput] = useState({
    title: "",
    body: "",
    category_id: "",
  });
  const handleChange = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    console.log(imageFormat.length);
    const pushServer = new FormData();
    pushServer.append("title", formInput.title);
    pushServer.append("body", formInput.body);
    pushServer.append("category_id", formInput.category_id);
    if (imageFormat.length > 0) {
      imageFormat.forEach((file) => {
        pushServer.append("image[]", file.fileName);
      });
    }
    const data = pushServer;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.post("api/admin/blog/store", data, config).then((res) => {
        setLoadSubmit(false);
        if (res.data.status === 101)
          return toast.warning("Judul postingan sudah ada");
        if (res.data.status === 202)
          return toast.warning("Masukkan data dengan benar");
        toast.success("Berhasil ditambahkan");
        setFormInput({
          title: "",
          body: "",
          category_id: "",
        });
        setImageFormat([]);
        getBlogAPI();
      });
    });
  };

  const [getBlog, setBlog] = useState("");
  const getBlogAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/admin/blog/view").then((res) => {
        setBlog(res.data);
      });
    });
  };
  useEffect(() => {
    getBlogAPI();
  }, []);
  return (
    <>
      <div
        className="h-96"
        style={{
          backgroundImage: `url(${ImagesBg})`,
        }}></div>
      {loadSubmit && <LoadingScreen />}
      <div className="bg-gray-200 bg-opacity-40">
        <div className="md:container md:mx-auto pb-10 md:pt-32 pt-36 mx-2">
          <div className="md:flex md:columns-2 md:gap-10 -mt-96">
            <SidebarAdmin />
            <div className="bg-white md:rounded-xl rounded-sm shadow md:shadow-none w-full p-3 md:p-10 ">
              <h1 className="md:text-2xl text-xl font-bold text-gray-800">
                Kelola Halaman Gallery
              </h1>
              <div className="lg:flex lg:flex-row-reverse md:columns-2 gap-1">
                <div className="lg:w-1/3 sm:w-1/2 w-full lg:mt-0 mt-4 bg-slate-200 rounded-md p-2">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-400 border-dashed pb-2">
                    <h1 className="text-gray-700 text-sm md:text-md font-semibold">
                      Katgori
                    </h1>
                    <label
                      htmlFor="add-category"
                      className="bg-cyan-600 cursor-pointer flex items-center gap-1 hover:bg-cyan-700 duration-200 px-10 py-1 text-white rounded-sm text-sm">
                      <i className="fa fa-plus"></i>
                      <span className="hidden xl:block">Tambah</span>
                    </label>
                  </div>
                  <AddCategory getCategoryAPI={getCategoryAPI} />
                  <div className="ml-1">
                    {getCategory &&
                      getCategory.map((item, key) => (
                        <div key={key}>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-gray-700">
                              {item.category_name}
                            </p>
                            <div className="flex justify-center text-sm items-center gap-2">
                              <label
                                htmlFor={`update-category${item.id}`}
                                className="fa fa-pencil py-1 px-4 cursor-pointer text-white rounded bg-yellow-600 hover:bg-yellow-700 text-sm hover:scale-110 duration-300"></label>
                              <label
                                htmlFor={`delete-category${item.id}`}
                                className="fa fa-trash py-1 cursor-pointer px-4 text-white rounded bg-red-600 hover:bg-red-700 text-sm hover:scale-110 duration-300"></label>
                            </div>
                          </div>
                          <UpdateCategory
                            item={item}
                            getCategoryAPI={getCategoryAPI}
                          />
                          <DeleteCategory
                            item={item}
                            getCategoryAPI={getCategoryAPI}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="w-full my-2 lg:my-0">
                  <label className="text-gray-700 text-sm md:text-md font-semibold">
                    Upload Gambar
                  </label>{" "}
                  <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
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
                          className="block h-full w-full mx-2 object-cover object-center transition duration-300 ease-in-out hover:scale-110 shadow-md"
                          alt={item.url}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <label htmlFor="title">Title</label>
                <input
                  onChange={handleChange}
                  value={formInput.title}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Masukkan Title..."
                  className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full lg:w-2/3"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="category_id">Kategori</label>
                <select
                  onChange={handleChange}
                  className="outline-none border px-2 py-1 focus:border-green-500 duration-300 form-control w-full lg:w-2/3"
                  name="category_id"
                  id="category_id">
                  <option value="">-- Pilih --</option>
                  {getCategory &&
                    getCategory.map((item, key) => (
                      <option key={key} value={item.id}>
                        {item.category_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mt-2">
                <label htmlFor="body">Konten</label>
                <textarea
                  onChange={handleChange}
                  value={formInput.body}
                  name="body"
                  id="body"
                  cols="30"
                  rows="10"
                  placeholder="Masukkan Konten..."
                  className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full lg:w-2/3"></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={loadSubmit ? true : false}
                  className="bg-green-600 cursor-pointer hover:bg-green-700 duration-200 px-10 py-1 text-white rounded lg:w-1/3 mt-4">
                  Tambahkan
                </button>
              </div>
              {getBlog && (
                <BlogAdmin
                  getBlog={getBlog}
                  getCategory={getCategory}
                  getBlogAPI={getBlogAPI}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
