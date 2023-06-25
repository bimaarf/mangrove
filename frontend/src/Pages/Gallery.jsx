import React from "react";
import ImagesBg from "../Images/bg-home.jpg";
import ImgSlider1 from "../Images/img-slider-1.jpg";
import ImgSlider10 from "../Images/img-slider-10.png";
import ImgSlider11 from "../Images/img-slider-11.png";
import ImgSlider2 from "../Images/img-slider-2.jpg";
import ImgSlider3 from "../Images/img-slider-3.jpg";
import ImgSlider5 from "../Images/img-slider-5.jpg";
import ImgSlider6 from "../Images/img-slider-6.jpg";
import ImgSlider7 from "../Images/img-slider-7.png";
import ImgSlider8 from "../Images/img-slider-8.png";
import ImgSlider9 from "../Images/img-slider-9.png";
import ImgSlider4 from "../Images/mangrove-home.jpg";
import { Footer } from "./Components/_Footer";
export const Gallery = () => {
  return (
    <>
      <div className="" style={{ backgroundImage: `url(${ImagesBg})` }}>
        <div className="mx-auto pt-32">
          <div className="text-white flex items-center gap-1 font-medium mt-4 md:mt-0 mb-4 ml-3 md:ml-10 text-xl md:text-3xl ">
            <i className="fa fa-image"></i>
            <h1 className="underline underline-offset-8">Gallery</h1>
          </div>
          <div className="flex flex-wrap">
            <div className="flex md:w-1/4 w-full m-4 md:m-0 flex-wrap">
              <div className="w-full relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  alt="gallery"
                  className="block h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110 shadow-md"
                  src={ImgSlider1}
                />
              </div>
            </div>
            <div className="flex md:w-1/4 w-full m-4 md:m-0 flex-wrap">
              <div className="w-full relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  alt="gallery"
                  className="block h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110 shadow-md"
                  src={ImgSlider2}
                />
              </div>
            </div>
            <div className="flex md:w-1/4 w-full m-4 md:m-0 flex-wrap">
              <div className="w-full relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  alt="gallery"
                  className="block h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110 shadow-md"
                  src={ImgSlider3}
                />
              </div>
            </div>
            <div className="flex md:w-1/4 w-full m-4 md:m-0 flex-wrap">
              <div className="w-full relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  alt="gallery"
                  className="block h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110 shadow-md"
                  src={ImgSlider4}
                />
              </div>
            </div>
            <div className="flex md:w-1/4 w-full m-4 md:m-0 flex-wrap">
              <div className="w-full relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  alt="gallery"
                  className="block h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110 shadow-md"
                  src={ImgSlider5}
                />
              </div>
            </div>
            <div className="flex md:w-1/4 w-full m-4 md:m-0 flex-wrap">
              <div className="w-full relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  alt="gallery"
                  className="block h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110 shadow-md"
                  src={ImgSlider6}
                />
              </div>
            </div>
            <div className="flex md:w-1/4 w-full m-4 md:m-0 flex-wrap">
              <div className="w-full relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  alt="gallery"
                  className="block h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110 shadow-md"
                  src={ImgSlider7}
                />
              </div>
            </div>
            <div className="flex md:w-1/4 w-full m-4 md:m-0 flex-wrap">
              <div className="w-full relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  alt="gallery"
                  className="block h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110 shadow-md"
                  src={ImgSlider8}
                />
              </div>
            </div>
            <div className="flex md:w-1/4 w-full m-4 md:m-0 flex-wrap">
              <div className="w-full relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  alt="gallery"
                  className="block h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110 shadow-md"
                  src={ImgSlider9}
                />
              </div>
            </div>
            <div className="flex md:w-1/4 w-full m-4 md:m-0 flex-wrap">
              <div className="w-full relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  alt="gallery"
                  className="block h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110 shadow-md"
                  src={ImgSlider10}
                />
              </div>
            </div>
            <div className="flex md:w-1/4 w-full m-4 md:m-0 flex-wrap">
              <div className="w-full relative overflow-hidden bg-cover bg-no-repeat">
                <img
                  alt="gallery"
                  className="block h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110 shadow-md"
                  src={ImgSlider11}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
