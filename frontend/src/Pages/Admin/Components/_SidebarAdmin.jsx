import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SidebarAdmin = () => {
  const location = useLocation();
  const navRedirect = useNavigate();
  const menu = [
    {
      label: "Kelola Gallery",
      icon: "fa-solid fa-image",
      url: "/administrator/kelola-gallery",
    },
    {
      label: "Kelola Mangrove",
      icon: "fa-solid fa-leaf",
      url: "/administrator/kelola-mangrove",
    },
    {
      label: "Kelola Blog",
      icon: "fa-solid fa-bell",
      url: "/administrator/kelola-blog",
    },
    {
      label: "Struktur Organisasi",
      icon: "fa-solid fa-sitemap",
      url: "/administrator/kelola-struktur-organisasi",
    },
    {
      label: "Kelola Mitra & Donatur",
      icon: "fa-solid fa-minimize",
      url: "/administrator/kelola-mitra-donatur",
    },
    {
      label: "Kelola Pengunjung",
      icon: "fa-solid fa-person-hiking",
      url: "/administrator/kelola-pengunjung",
    },
  ];
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
          {menu.map((item, key) => (
            <div
              key={key}
              onClick={() => navRedirect(item.url)}
              className={`${
                location.pathname === item.url
                  ? "bg-yellow-500 text-white"
                  : "hover:bg-yellow-500 text-gray-700 hover:text-white"
              } flex gap-3 p-3 cursor-pointer text-xl  duration-200 ease-in-out rounded-xl mt-4 justify-start items-center glass`}>
              <i className={item.icon}></i>
              <h1 className="font-normal">{item.label}</h1>
            </div>
          ))}
          <div className="flex gap-3 p-3 cursor-pointer text-xl mt-40 bg-red-500 hover:bg-red-600 text-white hover:text-white duration-200 ease-in-out rounded-xl justify-start items-center">
            <i className="fa fa-power-off"></i>
            <h1 className="font-normal -ml-1">Logout</h1>
          </div>
        </div>
      </div>
      <div className="btm-nav md:hidden bg-white z-50 text-sm">
        {menu.map((item, key) => (
          <button
            onClick={() => navRedirect(item.url)}
            key={key}
            className={`${
              location.pathname === item.url &&
              "active bg-gray-500 rounded-t-xl text-white"
            } w-full p-1 duration-500 ease-linear`}>
            <i className={item.icon}></i>
            <span className="btm-nav-label">{item.label.split(" ")[1]}</span>
          </button>
        ))}
      </div>
    </>
  );
};
