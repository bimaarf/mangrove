import React, { useState } from "react";
import { Headers } from "./Components/_Headers";
import ImagesBg from "../Images/bg-home.jpg";
import { Footer } from "./Components/_Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import secureLocalStorage from "react-secure-storage";
import validator from "validator";
import { LoadingScreen } from "../LoadingScreen";

export const Login = ({ setAuthCheck }) => {
  const navRedirect = useNavigate();
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [cookies, setCookie] = useCookies(["auth_token"]);
  const [emailValidator, setEmailValidator] = useState("");
  const validateEmail = (e) => {
    const email = e.target.value;
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
    if (validator.isEmail(email)) {
      e.persist();
      setEmailValidator("valid");
    } else {
      e.persist();
      setEmailValidator("invalid");
    }
  };
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    e.persist();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setLoadSubmit(true);
    e.preventDefault();
    const data = {
      email: formInput.email,
      password: formInput.password,
    };
    await axios.get("sanctum/csrf-cookie").then(() => {
      axios
        .post("api/login", data)
        .then((res) => {
          setLoadSubmit(false);
          if (res.data.status === 102)
            return toast.warning("email belum terdaftar");
          if (res.data.status === 101)
            return toast.warning("password anda salah");
          toast.success("login berhasil");
          setCookie("auth_token", res.data.token, {
            path: "/",
          });
          setAuthCheck(true);
          secureLocalStorage.setItem("auth_token", res.data.token);
          secureLocalStorage.setItem("auth_name", res.data.username);
          secureLocalStorage.setItem("auth_email", res.data.email);
          navRedirect("/administrator/kelola-gallery");
        })
        .catch(() => {
          toast.error("masukkan data dengan benar");
          setLoadSubmit(false);
        });
    });
  };
  return (
    <>
      <div style={{ backgroundImage: `url(${ImagesBg})` }}>
        {loadSubmit && <LoadingScreen />}
        <div className="py-48 flex justify-center">
          <form className="shadow text-white rounded-xl bg-slate-800 bg-opacity-70 backdrop-filter backdrop-brightness-100 md:w-1/2 lg:w-2/5 w-full mx-2 px-4 py-10 md:px-14 md:py-20">
            <div className="text-4xl font-semibold text-center">
              <h1>Login</h1>
            </div>
            <div className="mt-10">
              <label htmlFor="email">Masukkan Email</label>
              <input
                onChange={validateEmail}
                type="email"
                id="email"
                name="email"
                value={formInput.email}
                className="form-control rounded outline-none border border-gray-600 focus:border-gray-100 bg-opacity-50 text-black placeholder:text-gray-700 bg-white active:scale-105 duration-200 w-full py-2 px-1.5"
                placeholder="e.g example@gmail.com"
              />
              <span className="text-xs text-red-600 font-medium">
                {emailValidator === "" && emailValidator !== "invalid"
                  ? ""
                  : "" || emailValidator === "invalid"
                  ? "*email tidak valid!"
                  : ""}
              </span>
            </div>
            <div className="mt-4">
              <label htmlFor="email">Masukkan Password</label>
              <input
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                value={formInput.password}
                className="form-control rounded outline-none border border-gray-600 focus:border-gray-100 bg-opacity-50 text-black placeholder:text-gray-700 bg-white active:scale-105 duration-200 w-full py-2 px-1.5"
                placeholder="xxxxx"
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                onClick={handleSubmit}
                className={`${
                  loadSubmit ? "bg-green-700" : "bg-green-600"
                } w-full flex justify-center items-center hover:bg-green-700 active:scale-105 duration-200 rounded text-white px-10 py-2`}>
                {loadSubmit && (
                  <svg
                    role="status"
                    className="w-3 h-3 mt-0.5 -ml-4 mr-2 text-white animate-spin mb-0.5"
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
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
