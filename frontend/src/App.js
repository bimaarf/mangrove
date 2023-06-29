import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { About } from "./Pages/About";
import { PageGallery } from "./Pages/Admin/_PageGallery";
import { Gallery } from "./Pages/Gallery";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Headers } from "./Pages/Components/_Headers";
import { PageBlog } from "./Pages/Admin/_PageBlog";

axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] =
  "application/json/x-www-form-urlencoded; charset=UTF-8; multipart/form-data";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = secureLocalStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
function App() {
  const [authCheck, setAuthCheck] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  useEffect(() => {
    if (!cookies.auth_token || !secureLocalStorage.getItem("auth_token")) {
      secureLocalStorage.clear();
      removeCookie(["auth_token"]);
      setAuthCheck(false);
    } else {
      setAuthCheck(true);
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <Router>
        <Headers setAuthCheck={setAuthCheck} authCheck={authCheck} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/tentang-kami" element={<About />} />
          <Route
            path="/login"
            element={<Login setAuthCheck={setAuthCheck} />}
          />
          <Route
            path="/administrator/kelola-gallery"
            element={<PageGallery />}
          />
          <Route path="/administrator/kelola-blog" element={<PageBlog />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
