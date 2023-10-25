import axios from "axios";
import React, { useEffect, useState } from "react";
import ImagesBg from "../Images/bg-home.jpg";
import ImgSlider1 from "../Images/img-slider-1.jpg";
import { Footer } from "./Components/_Footer";
import { Link, useNavigate } from "react-router-dom";
export const Blog = () => {
  const [getBlog, setBlog] = useState("");
  const navRedirect = useNavigate();
  const getBlogAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/blog/view").then((res) => {
        setBlog(res.data);
      });
    });
  };
  useEffect(() => {
    getBlogAPI();
  }, []);
  return (
    <>
      <div style={{ backgroundImage: `url(${ImagesBg})` }}>
        <div className="mx-auto pt-32">
          <div className="text-white flex items-center gap-1 font-medium mt-4 md:mt-0 mb-4 ml-3 md:ml-10 text-xl md:text-3xl ">
            <i className="fa fa-globe"></i>
            <h1 className="underline underline-offset-8">Blog</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:px-20 px-6 pb-10">
            {getBlog &&
              getBlog.map((item, key) => (
                <div
                  key={key}
                  onClick={() => navRedirect(`/blog/v/:${item.slug}`)}
                  className="bg-white md:p-10 p-6 text-center mt-4 cursor-pointer hover:bg-gray-200 hover:bg-opacity-90 duration-300">
                  <img
                    src={
                      process.env.REACT_APP_API +
                      "Images/Blog/" +
                      JSON.parse(item.image)[0]
                    }
                    alt=""
                  />
                  <Link
                    to={`/blog/v/:${item.slug}`}
                    className="font-bold text-gray-800 text-md hover:text-orange-600 duration-200 lg:text-xl my-3">
                    {item.title.length > 100
                      ? item.title.substring(0, 100) + "..."
                      : item.title}
                  </Link>
                  <div className="flex justify-start items-center gap-1">
                    <i className="fa fa-tag text-orange-700"></i>
                    <span className="font-medium mx-1 text-orange-700">
                      {item.category_name}
                    </span>
                  </div>
                  <p className="text-start text-gray-800 font-medium">
                    {item.body.length > 250
                      ? item.body.substring(0, 250) + "..."
                      : item.body}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
