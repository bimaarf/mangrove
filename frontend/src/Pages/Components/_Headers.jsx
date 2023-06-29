import React, { useState } from "react";
import ImageLogo from "../../Images/logo-122x140.png";
import { useNavigate } from "react-router-dom";
import { MapLocation } from "./Modal/MapLocation";
import { JumlahMangrove } from "./Modal/JumlahMangrove";
import { Donatur } from "./Modal/Donatur";
import secureLocalStorage from "react-secure-storage";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
export const Headers = ({ setAuthCheck, authCheck }) => {
  const navRedirect = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loadSubmit, setLoadSubmit] = useState(false);
  const handleLogout = async (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post("api/logout")
        .then((res) => {
          setLoadSubmit(false);
          navRedirect("/");
          toast.success("Anda telah logout");
          removeCookie("auth_token");
          secureLocalStorage.clear();
          setDropdown(false);
        })
        .catch((err) => {
          setLoadSubmit(false);
          navRedirect("/");
          toast.success("Anda telah logout");
          removeCookie("auth_token");
          secureLocalStorage.clear();
          setDropdown(false);
        });
    });
  };
  return (
    <>
      <MapLocation />
      <JumlahMangrove />
      <Donatur />
      <div className="lg:flex justify-between items-center bg-black bg-opacity-40 backdrop-filter backdrop-blur-lg border-b fixed w-full z-50 md:px-10 px-2 py-2">
        <div
          onClick={() => {
            navRedirect("/");
            setDropdown(false);
          }}
          className="flex justify-start items-center gap-3 cursor-pointer">
          <img src={ImageLogo} alt="" width={50} />
          <div>
            <h1 className="text-white font-medium hover:text-cyan-500 duration-300 hover:underline-offset-2 hover:underline hover:scale-105">
              Taman Mangrove Mempawah
            </h1>
            <p className="text-white">Jam Operasional : 09.00 WIB</p>
          </div>
        </div>
        <div
          className={`flex xl:justify-end items-center gap-1 md:gap-4 md:mt-6 pb-4 lg:pb-0 lg:mt-0 mt-4 overflow-x-auto`}>
          <div
            onClick={() => {
              navRedirect("/");
              setDropdown(false);
            }}
            className="flex text-white cursor-pointer border py-1 px-2 whitespace-nowrap md:px-4 rounded hover:md:px-5 hover:text-gray-300 text-xs md:text-xl duration-200 justify-center items-center gap-1">
            <i className="fa fa-home"></i>
            <span>Beranda</span>
          </div>
          <label
            htmlFor="my_modal_6"
            className="flex text-white cursor-pointer border py-1 px-2 whitespace-nowrap md:px-4 rounded hover:md:px-5 hover:text-gray-300 text-xs md:text-xl duration-200 justify-center items-center gap-1">
            <i className="fa fa-map-marker"></i>
            <span>Lokasi Tanam</span>
          </label>
          <div
            onClick={() => {
              navRedirect("/gallery");
              setDropdown(false);
            }}
            className="flex text-white cursor-pointer border py-1 px-2 whitespace-nowrap md:px-4 rounded hover:md:px-5 hover:text-gray-300 text-xs md:text-xl duration-200 justify-center items-center gap-1">
            <i className="fa fa-picture-o"></i>
            <span>Gallery</span>
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
            onClick={() => {
              navRedirect("/tentang-kami");
              setDropdown(false);
            }}
            className="flex text-white cursor-pointer border py-1 px-2 whitespace-nowrap md:px-4 rounded hover:md:px-5 hover:text-gray-300 text-xs md:text-xl duration-200 justify-center items-center gap-1">
            <i className="fa fa-search"></i>
            <span>Tentang Kami</span>
          </div>
          {authCheck && secureLocalStorage.getItem("auth_token") ? (
            <div
              onClick={() => setDropdown(dropdown ? false : true)}
              className="flex text-white cursor-pointer border py-1 px-2 whitespace-nowrap md:px-4 rounded hover:md:px-5 hover:text-gray-300 text-xs md:text-xl duration-200 justify-center items-center gap-1">
              <i className="fa fa-user"></i>
              <span>
                {" "}
                {secureLocalStorage.getItem("auth_token") &&
                  secureLocalStorage.getItem("auth_name").split(" ")[0]}
              </span>
            </div>
          ) : (
            <div
              onClick={() => {
                navRedirect("/login");
                setDropdown(false);
              }}
              className="flex text-white cursor-pointer border py-1 px-2 whitespace-nowrap md:px-4 rounded hover:md:px-5 hover:text-gray-300 text-xs md:text-xl duration-200 justify-center items-center gap-1">
              <i className="fa fa-user"></i>
              <span>Masuk</span>
            </div>
          )}
          {dropdown && (
            <ul className="p-2 shadow absolute top-28 md:top-16 md:right-5 right-2 z-[1] bg-gray-100 rounded-lg w-52">
              <li
                onClick={() => {
                  navRedirect("/administrator/kelola-gallery");
                  setDropdown(false);
                }}>
                <p className="text-gray-800 rounded font-normal bg-gray-200 hover:bg-gray-300 bg-opacity-30 duration-200 cursor-pointer p-2">
                  Halaman Admin
                </p>
              </li>
              <li onClick={handleLogout}>
                <div
                  className={`${
                    loadSubmit
                      ? "bg-red-600 text-white "
                      : "bg-gray-200 bg-opacity-30 text-gray-800 hover:bg-red-600 hover:text-white "
                  } flex justify-start items-center rounded font-normal hover:bg-red-600duration-200 cursor-pointer p-2 mt-2`}>
                  <p>Logout</p>
                  {loadSubmit && (
                    <svg
                      role="status"
                      className="w-3 h-3 mt-0.5 ml-2 bg-red-600 text-red-600 mr-2 animate-spin mb-0.5"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
