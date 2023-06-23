import React from "react";
import ImageLogo from "../../Images/logo-122x140.png";
import { useNavigate } from "react-router-dom";
import { MapLocation } from "./Modal/MapLocation";
import { JumlahMangrove } from "./Modal/JumlahMangrove";
import { Donatur } from "./Modal/Donatur";
export const Headers = () => {
  const navRedirect = useNavigate();
  return (
    <>
      <MapLocation />
      <JumlahMangrove />
      <Donatur />
      <div className="md:flex  justify-between items-center bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg border-b fixed w-full z-50 md:px-10 px-2 py-2">
        <div
          onClick={() => navRedirect("/")}
          className="flex justify-start items-center gap-3 cursor-pointer">
          <img src={ImageLogo} alt="" width={50} />
          <div>
            <h1 className="text-white font-medium hover:text-cyan-500 duration-300 hover:underline-offset-2 hover:underline hover:scale-105">
              Taman Mangrove Mempawah
            </h1>
            <p className="text-white">Jam Operasional : 09.00 WIB</p>
          </div>
        </div>
        <div className="flex md:justify-end justify-start items-center gap-1 md:gap-4 md:mt-0 mt-4 overflow-x-auto">
          <label
            htmlFor="my_modal_6"
            className="flex text-white cursor-pointer border py-1 px-2 whitespace-nowrap md:px-4 rounded hover:md:px-5 hover:text-gray-300 text-xs md:text-xl duration-200 justify-center items-center gap-1">
            <i className="fa fa-map-marker"></i>
            <span>Lokasi Tanam</span>
          </label>
          <div
            onClick={() => navRedirect("/gallery")}
            className="flex text-white cursor-pointer border py-1 px-2 whitespace-nowrap md:px-4 rounded hover:md:px-5 hover:text-gray-300 text-xs md:text-xl duration-200 justify-center items-center gap-1">
            <i className="fa fa-picture-o"></i>
            <span>Galerry</span>
          </div>
          <label
            htmlFor="jumlah-mangrove"
            className="flex text-white cursor-pointer border py-1 px-2 whitespace-nowrap md:px-4 rounded hover:md:px-5 hover:text-gray-300 text-xs md:text-xl duration-200 justify-center items-center gap-1">
            <i className="fa fa-table"></i>
            <span>Jumlah Mangrove</span>
          </label>
          <label
            htmlFor="mitra"
            className="flex text-white cursor-pointer border py-1 px-2 whitespace-nowrap md:px-4 rounded hover:md:px-5 hover:text-gray-300 text-xs md:text-xl duration-200 justify-center items-center gap-1">
            <i className="fa fa-usd"></i>
            <span>Mitra</span>
          </label>
          <div
            onClick={() => navRedirect("/tentang-kami")}
            className="flex text-white cursor-pointer border py-1 px-2 whitespace-nowrap md:px-4 rounded hover:md:px-5 hover:text-gray-300 text-xs md:text-xl duration-200 justify-center items-center gap-1">
            <i className="fa fa-search"></i>
            <span>Tentang Kami</span>
          </div>
        </div>
      </div>
    </>
  );
};
