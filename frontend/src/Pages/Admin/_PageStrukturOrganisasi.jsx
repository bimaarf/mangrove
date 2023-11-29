import React, { useEffect, useState } from "react";
import ImagesBg from "../../Images/bg-home.jpg";
import { Footer } from "../Components/_Footer";
import { SidebarAdmin } from "./Components/_SidebarAdmin";
import axios from "axios";
import { toast } from "react-toastify";
export const StrukturOrganisasi = () => {
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [formInput, setFormInput] = useState({
    ketua: "",
    sekretaris: "",
    bendahara: "",
    perencanaan_dan_program: "",
    pendidikan_lingkungan_hidup: "",
    pengembangan_usaha: "",
    desa_pasir: "",
    desa_penibung: "",
    desa_sungai_bakau_besar: "",
    desa_sungai_bakau_kecil: "",
    desa_sungai_purun_kecil: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevFormInput) => ({ ...prevFormInput, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadSubmit(true);
    const data = formInput;

    try {
      await axios.get("sanctum/csrf-cookie");
      const res = await axios.post(
        "api/admin/struktur-organisasi/update",
        data
      );

      setLoadSubmit(false);
      if (res.data.status === 201) {
        return toast.warning("server error");
      }

      toast.success("Berhasil diubah");
    } catch (error) {
      toast.error("Gagal mengirim data. Silakan coba lagi.");
      setLoadSubmit(false);
    }
  };
  const __GET__STR_API = async () => {
    try {
      const res = await axios.get("api/struktur-organisasi/view");
      setFormInput(
        res.data[0] || {
          ketua: "",
          sekretaris: "",
          bendahara: "",
          perencanaan_dan_program: "",
          pendidikan_lingkungan_hidup: "",
          pengembangan_usaha: "",
          desa_pasir: "",
          desa_penibung: "",
          desa_sungai_bakau_besar: "",
          desa_sungai_bakau_kecil: "",
          desa_sungai_purun_kecil: "",
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      // Set default values in case of an error
      setFormInput({
        ketua: "",
        sekretaris: "",
        bendahara: "",
        perencanaan_dan_program: "",
        pendidikan_lingkungan_hidup: "",
        pengembangan_usaha: "",
        desa_pasir: "",
        desa_penibung: "",
        desa_sungai_bakau_besar: "",
        desa_sungai_bakau_kecil: "",
        desa_sungai_purun_kecil: "",
      });
    }
  };

  useEffect(() => {
    __GET__STR_API();
  }, []);

  return (
    <>
      <div
        className="h-96"
        style={{
          backgroundImage: `url(${ImagesBg})`,
        }}></div>
      <div className="bg-gray-200 bg-opacity-40">
        <div className="md:container md:mx-auto pb-10 md:pt-32 pt-36 mx-2">
          <div className="md:flex md:columns-2 md:gap-10 -mt-96">
            <SidebarAdmin />
            <div className="bg-white md:rounded-xl rounded-sm shadow md:shadow-none w-full p-3 md:p-10 ">
              <h1 className="md:text-2xl text-xl font-bold text-gray-800">
                Struktur Organisasi
              </h1>

              {/* data */}
              <div className="mt-2">
                <label htmlFor="ketua" className="font-bold text-teal-600">
                  Ketua
                </label>
                <input
                  defaultValue={formInput.ketua}
                  type="text"
                  name="ketua"
                  id="ketua"
                  placeholder="Ketikkan sesuatu..."
                  className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full lg:w-2/3"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="sekretaris" className="font-bold text-teal-600">
                  Sekretaris
                </label>
                <input
                  defaultValue={formInput.sekretaris}
                  type="text"
                  name="sekretaris"
                  id="sekretaris"
                  placeholder="Ketikkan sesuatu..."
                  className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full lg:w-2/3"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="bendahara" className="font-bold text-teal-600">
                  Bendahara
                </label>
                <input
                  defaultValue={formInput.bendahara}
                  type="text"
                  name="bendahara"
                  id="bendahara"
                  placeholder="Ketikkan sesuatu..."
                  className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full lg:w-2/3"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="perencanaan_dan_program"
                  className="font-bold text-teal-600">
                  Koord. Bidang Perencanaan Dan Program
                </label>
                <input
                  defaultValue={formInput.perencanaan_dan_program}
                  type="text"
                  name="perencanaan_dan_program"
                  id="perencanaan_dan_program"
                  placeholder="Ketikkan sesuatu..."
                  className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full lg:w-2/3"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="pendidikan_lingkungan_hidup"
                  className="font-bold text-teal-600">
                  Koord. Bidang Pendidikan Lingkungan Hidup
                </label>
                <input
                  defaultValue={formInput.pendidikan_lingkungan_hidup}
                  type="text"
                  name="pendidikan_lingkungan_hidup"
                  id="pendidikan_lingkungan_hidup"
                  placeholder="Ketikkan sesuatu..."
                  className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full lg:w-2/3"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="pengembangan_usaha"
                  className="font-bold text-teal-600">
                  Koord. Bidang Pengembangan Usaha
                </label>
                <input
                  defaultValue={formInput.pengembangan_usaha}
                  type="text"
                  name="pengembangan_usaha"
                  id="pengembangan_usaha"
                  placeholder="Ketikkan sesuatu..."
                  className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full lg:w-2/3"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="desa_pasir" className="font-bold text-teal-600">
                  Koord. Lapangan Desa Pasir
                </label>
                <input
                  defaultValue={formInput.desa_pasir}
                  type="text"
                  name="desa_pasir"
                  id="desa_pasir"
                  placeholder="Ketikkan sesuatu..."
                  className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full lg:w-2/3"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="desa_penibung"
                  className="font-bold text-teal-600">
                  Koord. Lapangan Desa Penibung
                </label>
                <input
                  defaultValue={formInput.desa_penibung}
                  type="text"
                  name="desa_penibung"
                  id="desa_penibung"
                  placeholder="Ketikkan sesuatu..."
                  className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full lg:w-2/3"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="desa_sungai_bakau_besar"
                  className="font-bold text-teal-600">
                  Koord. Lapangan Sungai Bakau Besar
                </label>
                <input
                  defaultValue={formInput.desa_sungai_bakau_besar}
                  type="text"
                  name="desa_sungai_bakau_besar"
                  id="desa_pendesa_sungai_bakau_besaribung"
                  placeholder="Ketikkan sesuatu..."
                  className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full lg:w-2/3"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="desa_sungai_bakau_kecil"
                  className="font-bold text-teal-600">
                  Koord. Lapangan Desa Sungai Bakau Kecil
                </label>
                <input
                  defaultValue={formInput.desa_sungai_bakau_kecil}
                  type="text"
                  name="desa_sungai_bakau_kecil"
                  id="desa_sungai_bakau_kecil"
                  placeholder="Ketikkan sesuatu..."
                  className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full lg:w-2/3"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="desa_sungai_purun_kecil"
                  className="font-bold text-teal-600">
                  Koord. Lapangan Desa Sungai Purun Kecil
                </label>
                <input
                  defaultValue={formInput.desa_sungai_purun_kecil}
                  type="text"
                  name="desa_sungai_purun_kecil"
                  id="desa_sungai_purun_kecil"
                  placeholder="Ketikkan sesuatu..."
                  className="outline-none border px-2 py-1 focus:border-green-500 active:scale-105 duration-300 form-control w-full lg:w-2/3"
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loadSubmit}
                  className="bg-cyan-600 hover-bg-cyan-700 duration-200 text-sm text-white rounded px-4 py-1 mt-4 flex items-center gap-1">
                  <span>Submit</span>
                  {loadSubmit && (
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
