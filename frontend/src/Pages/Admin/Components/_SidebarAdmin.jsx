import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SidebarAdmin = () => {
  const location = useLocation();
  const navRedirect = useNavigate();
  return (
    <>
      <div className="bg-white w-2/4 h-2/4 rounded-xl hidden md:block md:pb-10">
        <div
          className="bg-white rounded-3xl p-10 font-medium"
          style={{ height: "80vh" }}>
          <div className="flex justify-start items-center gap-3 border-b pb-4">
            <i className="fa fa-user-circle text-5xl text-yellow-500"></i>
            <h1 className="text-gray-700 font-normal text-2xl">
              Administrator
            </h1>
          </div>
          <div
            onClick={() => navRedirect("/administrator/kelola-gallery")}
            className={`${
              location.pathname === "/administrator/kelola-gallery"
                ? "bg-yellow-500 text-white"
                : "hover:bg-yellow-500 text-gray-700 hover:text-white"
            } flex gap-3 p-3 cursor-pointer text-xl  duration-200 ease-in-out rounded-xl mt-4 justify-start items-center`}>
            <i className="fa fa-paste"></i>
            <h1 className="font-normal">Kelola Gallery</h1>
          </div>
          <div
            onClick={() => navRedirect("/administrator/kelola-blog")}
            className={`${
              location.pathname === "/administrator/kelola-blog"
                ? "bg-yellow-500 text-white"
                : "hover:bg-yellow-500 text-gray-700 hover:text-white"
            } flex gap-3 p-3 cursor-pointer text-xl  duration-200 ease-in-out rounded-xl mt-4 justify-start items-center`}>
            <i className="fa fa-paste"></i>
            <h1 className="font-normal">Kelola Blog</h1>
          </div>
          <div
            onClick={() => navRedirect("/administrator/kelola-mangrove")}
            className={`${
              location.pathname === "/administrator/kelola-mangrove"
                ? "bg-yellow-500 text-white"
                : "hover:bg-yellow-500 text-gray-700 hover:text-white"
            } flex gap-3 p-3 cursor-pointer text-xl  duration-200 ease-in-out rounded-xl mt-4 justify-start items-center`}>
            <i className="fa fa-paste"></i>
            <h1 className="font-normal">Kelola Mangrove</h1>
          </div>
          <div
            onClick={() =>
              navRedirect("/administrator/kelola-struktur-organisasi")
            }
            className={`${
              location.pathname === "/administrator/kelola-struktur-organisasi"
                ? "bg-yellow-500 text-white"
                : "hover:bg-yellow-500 text-gray-700 hover:text-white"
            } flex gap-3 p-3 cursor-pointer text-xl  duration-200 ease-in-out rounded-xl mt-4 justify-start items-center`}>
            <i className="fa fa-paste"></i>
            <h1 className="font-normal">Struktur Organisasi</h1>
          </div>
          <div className="flex gap-3 p-3 cursor-pointer text-xl mt-40 bg-red-500 hover:bg-red-600 text-white hover:text-white duration-200 ease-in-out rounded-xl justify-start items-center">
            <i className="fa fa-power-off"></i>
            <h1 className="font-normal -ml-1">Logout</h1>
          </div>
        </div>
      </div>
      <div className="my-4 flex justify-center items-center gap-2 md:hidden">
        <div
          onClick={() => navRedirect("/administrator/kelola-gallery")}
          className="bg-cyan-600 hover:bg-cyan-700 flex justify-start items-center gap-3 text-white rounded bg-opacity-50 hover:bg-opacity-50 p-2">
          <i className="fa fa-paste"></i>
          <h1>Kelola Gallery</h1>
        </div>
        <div
          onClick={() => navRedirect("/administrator/kelola-blog")}
          className="bg-cyan-600 hover:bg-cyan-700 flex justify-start items-center gap-3 text-white rounded bg-opacity-50 hover:bg-opacity-50 p-2">
          <i className="fa fa-paste"></i>
          <h1>Kelola Blog</h1>
        </div>
        <div
          onClick={() => navRedirect("/administrator/kelola-mangrove")}
          className="bg-cyan-600 hover:bg-cyan-700 flex justify-start items-center gap-3 text-white rounded bg-opacity-50 hover:bg-opacity-50 p-2">
          <i className="fa fa-paste"></i>
          <h1>Kelola Jumlah Mangrove</h1>
        </div>
        <div
          onClick={() =>
            navRedirect("/administrator/kelola-struktur-organisasi")
          }
          className="bg-cyan-600 hover:bg-cyan-700 flex justify-start items-center gap-3 text-white rounded bg-opacity-50 hover:bg-opacity-50 p-2">
          <i className="fa fa-paste"></i>
          <h1>Struktur Organisasi</h1>
        </div>
      </div>
    </>
  );
};
