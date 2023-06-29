import React, { useEffect, useState } from "react";
import ImagesBg from "../Images/bg-home.jpg";
import ImgSlider1 from "../Images/img-slider-1.jpg";
import ImgSlider2 from "../Images/img-slider-2.jpg";
import ImgSlider3 from "../Images/img-slider-3.jpg";
import ImgSlider5 from "../Images/img-slider-5.jpg";
import ImgSlider6 from "../Images/img-slider-6.jpg";
import ImgSlider7 from "../Images/img-slider-7.png";
import ImgSlider8 from "../Images/img-slider-8.png";
import ImgSlider4 from "../Images/mangrove-home.jpg";
import { Footer } from "./Components/_Footer";
import axios from "axios";
export const Home = () => {
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
      <div
        className="carousel w-full top-0 pt-0 bg-black"
        style={{ height: "80vh" }}>
        <div id="slide1" className="carousel-item relative w-full">
          <img src={ImagesBg} className="w-full object-cover" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide4"
              className="border py-4 px-5 hover:md:scale-110 active:scale-125 swap-indeterminate duration-300 hover:bg-black rounded-full bg-transparent text-white md:text-4xl hover:bg-opacity-10">
              ❮
            </a>
            <a
              href="#slide2"
              className="border py-4 px-5 hover:md:scale-110 active:scale-125 duration-300 hover:bg-black rounded-full bg-transparent text-white md:text-4xl hover:bg-opacity-10">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src={ImagesBg} className="w-full object-cover" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide1"
              className="border py-4 px-5 hover:md:scale-110 active:scale-110 duration-300 hover:bg-black rounded-full bg-transparent text-white md:text-4xl hover:bg-opacity-10">
              ❮
            </a>
            <a
              href="#slide3"
              className="border py-4 px-5 hover:md:scale-110 active:scale-110 duration-300 hover:bg-black rounded-full bg-transparent text-white md:text-4xl hover:bg-opacity-10">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src={ImagesBg} className="w-full object-cover" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide2"
              className="border py-4 px-5 hover:md:scale-110 active:scale-110 duration-300 hover:bg-black rounded-full bg-transparent text-white md:text-4xl hover:bg-opacity-10">
              ❮
            </a>
            <a
              href="#slide4"
              className="border py-4 px-5 hover:md:scale-110 active:scale-110 duration-300 hover:bg-black rounded-full bg-transparent text-white md:text-4xl hover:bg-opacity-10">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src={ImagesBg} className="w-full object-cover" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide3"
              className="border py-4 px-5 hover:md:scale-110 active:scale-110 duration-300 hover:bg-black rounded-full bg-transparent text-white md:text-4xl hover:bg-opacity-10">
              ❮
            </a>
            <a
              href="#slide1"
              className="border py-4 px-5 hover:md:scale-110 active:scale-110 duration-300 hover:bg-black rounded-full bg-transparent text-white md:text-4xl hover:bg-opacity-10">
              ❯
            </a>
          </div>
        </div>
      </div>
      <div className="bg-white md:p-28 p-4 space-y-10">
        <h1 className="text-center md:text-4xl text-3xl font-light">
          Taman Mangrove Mempawah
        </h1>
        <div className="flex justify-center my-6">
          <div className="border-t w-1/4 border-2 border-gray-400"></div>
        </div>
        <h1 className="text-center md:text-xl">
          Kawasan konservasi alam mangrove seluas 99,82 Ha yang dimanfaatkan
          untuk pariwisata dan rekreasi alam
        </h1>
        <div className="flex justify-center my-6">
          <div className="border-t w-1/4 border-2 border-gray-400"></div>
        </div>
      </div>
      <div className="" style={{ backgroundImage: `url(${ImagesBg})` }}>
        <div className="md:flex justify-center items-center gap-4 md:py-10 py-4 md:px-20 px-6">
          <div className="bg-white md:p-16 p-6 text-center mt-4">
            <i className="fa fa-globe text-6xl text-lime-600"></i>
            <h1>
              Kawasan yang sempat digarap oleh puluhan penambak liar ini mulai
              direstorasi tahun 1998. Perubahan kawasan dari hutan menjadi areal
              tambak ikan tidak hanya menghilangkan pepohonan namun juga merusak
              alam dan ekosistem mangrove. Berbagai kendala dihadapi untuk
              mengembalikan kawasan ini ke peruntukkannya semula.
            </h1>
          </div>
          <div className="bg-white md:p-16 p-6 text-center mt-4">
            <i className="fa fa-tint text-6xl text-cyan-600"></i>
            <h1>
              Merupakan ekosistem lahan basah yang didominasi oleh pepopohonan
              mangrove. Kawasan konservasi sangat dibutuhkan di Jakarta, ibu
              kota Indonesia yang sangat kekurangan akan lahan hijau terbuka,
              memiliki tingkat polusi udara yang cukup tinggi serta mulai
              mengalami erosi dan abrasi garis pantai.
            </h1>
          </div>
          <div className="bg-white md:p-16 p-6 text-center mt-4">
            <i className="fa fa-map text-6xl text-cyan-600"></i>
            <h1>
              Surga hijau seluas 99,82 hektar ini terletak di kelurahan Kamal
              Muara yang bersebelahan dengan kawasan elit Pantai Indah Kapuk di
              Jakarta Utara. Lokasinya membuat sangat mudah untuk dikunjungi
              baik melalui akses Tol dalam kota maupun Tol JORR atau dengan
              Transportasi Umum seperti Bis TransJakarta.
            </h1>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex flex-wrap">
            {getGallery &&
              getGallery.map((item, key) => (
                <div key={key} className="flex w-1/4 flex-wrap">
                  <div className="w-full relative overflow-hidden bg-cover bg-no-repeat">
                    <img
                      alt="gallery"
                      src={
                        process.env.REACT_APP_API +
                        "Images/Gallery/" +
                        item.image
                      }
                      className="block h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-110"
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
