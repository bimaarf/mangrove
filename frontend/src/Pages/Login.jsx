import React from "react";
import { Headers } from "./Components/_Headers";
import ImagesBg from "../Images/bg-home.jpg";
import { Footer } from "./Components/_Footer";

export const Login = () => {
  return (
    <>
      <Headers />
      <div style={{ backgroundImage: `url(${ImagesBg})` }}>
        <div className="py-48 flex justify-center">
          <div className="shadow text-white rounded-xl bg-slate-800 bg-opacity-70 backdrop-filter backdrop-brightness-100 md:w-1/2 lg:w-2/5 w-full mx-2 px-4 py-10 md:px-14 md:py-20">
            <div className="text-4xl font-semibold text-center">
              <h1>Login</h1>
            </div>
            <div className="mt-10">
              <label htmlFor="email">Masukkan Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control rounded outline-none border border-gray-600 focus:border-gray-100 bg-opacity-50 text-black placeholder:text-gray-700 bg-white active:scale-105 duration-200 w-full py-2 px-1.5"
                placeholder="e.g example@gmail.com"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="email">Masukkan Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control rounded outline-none border border-gray-600 focus:border-gray-100 bg-opacity-50 text-black placeholder:text-gray-700 bg-white active:scale-105 duration-200 w-full py-2 px-1.5"
                placeholder="xxxxx"
              />
            </div>
            <div className="mt-10">
              <button className="bg-green-600 w-full hover:bg-green-700 active:scale-105 duration-200 rounded text-white px-10 py-2">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
