import axios from "axios";
import React, { useEffect, useState } from "react";
import ImagesBg from "../Images/bg-home.jpg";
import { Footer } from "./Components/_Footer";
export const Gallery = () => {
  const [getGallery, setGallery] = useState("");
  const getGalleryAPI = async () => {
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios.get("api/gallery/get").then((res) => {
        setGallery(res.data);
      });
    });
  };
  useEffect(() => {
    getGalleryAPI();
  }, []);
  return (
    <>
      <div style={{ backgroundImage: `url(${ImagesBg})` }}>
        <div className="mx-auto pt-32">
          <div className="text-white flex items-center gap-1 font-medium mt-4 md:mt-0 mb-4 ml-3 md:ml-10 text-xl md:text-3xl ">
            <i className="fa fa-image"></i>
            <h1 className="underline underline-offset-8">Gallery</h1>
          </div>
          <div className="flex flex-wrap">
            {getGallery &&
              getGallery.map((item, key) => (
                <div
                  key={key}
                  className="flex cursor-zoom-in md:w-1/4 w-full m-4 md:m-0 flex-wrap">
                  <div className="w-full relative overflow-hidden bg-cover bg-no-repeat">
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
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
