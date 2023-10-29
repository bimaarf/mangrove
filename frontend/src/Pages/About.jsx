import React from "react";

import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import { useEffect, useState } from "react";
import ImagesBg from "../Images/bg-home.jpg";
import { Footer } from "./Components/_Footer";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export const About = () => {
  const [strukturOrganisasi, setStrukturOrganisasi] = useState([]);

  useEffect(() => {
    // Ambil data Struktur Organisasi dari API
    axios.get("api/struktur-organisasi/view").then((response) => {
      setStrukturOrganisasi(response.data[0]);
    });
  }, []);

  return (
    <>
      <div
        className="h-96"
        style={{
          backgroundImage: `url(${ImagesBg})`,
        }}>
        <div className="flex justify-center pt-40 px-4 md:pt-28">
          <div className="bg-white bg-opacity-50 md:w-1/2 p-10 md:px-20">
            <h1 className="text-center text-xl md:text-5xl text-black font-semibold">
              Tentang Kami
            </h1>
            <p className="text-center text-black">
              Mempawah Mangrove Conservation (MMC)
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white flex justify-center overflow-hidden">
        <div className="md:w-1/2">
          <h1 className="text-center my-4 font-bold text-lg">
            Struktur Organisasi
          </h1>
          <div className="divider"></div>
          <div className="flex flex-col w-full scale-75">
            <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
              <p className="font-bold">Ketua</p>
              <p className="font-medium">{strukturOrganisasi.ketua}</p>
            </div>
            <div className="divider"></div>
          </div>
          <div className="flex w-full scale-75">
            <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
              <p className="font-bold">Sekretaris</p>
              <p className="font-medium">{strukturOrganisasi.sekretaris}</p>
            </div>
            <div className="divider divider-horizontal">-</div>
            <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
              <p className="font-bold">Bendahara</p>
              <p className="font-medium">{strukturOrganisasi.bendahara}</p>
            </div>
          </div>
          <h1 className="text-center my-4 font-bold text-lg">
            Koordinator Bidang
          </h1>
          <div className="divider"></div>
          <div className="flex w-full scale-75">
            <div className="grid h-60 p-4 text-center flex-grow card bg-base-300 rounded-box place-items-center">
              <p className="font-bold">Koord. Bidang Perencanaan Dan Program</p>
              <p className="font-medium">
                {strukturOrganisasi.perencanaan_dan_program}
              </p>
            </div>
            <div className="divider divider-horizontal">-</div>
            <div className="grid h-60 p-4 text-center flex-grow card bg-base-300 rounded-box place-items-center">
              <p className="font-bold">Koord. Bidang Lingkungan Hidup</p>
              <p className="font-medium">
                {strukturOrganisasi.pendidikan_lingkungan_hidup}
              </p>
            </div>
            <div className="divider divider-horizontal">-</div>
            <div className="grid h-60 p-4 text-center flex-grow card bg-base-300 rounded-box place-items-center">
              <p className="font-bold">Koord. Bidang Pengembangan Usaha</p>
              <p className="font-medium">
                {strukturOrganisasi.pengembangan_usaha}
              </p>
            </div>
          </div>
          <h1 className="text-center my-4 font-bold text-lg">
            Koordinator Lapangan
          </h1>
          <div className="flex w-full scale-75">
            <div className="grid h-60 p-4 text-center flex-grow card bg-base-300 rounded-box place-items-center">
              <p className="font-bold">Daerah Desa Pasir</p>
              <p className="font-medium">{strukturOrganisasi.desa_pasir}</p>
            </div>
            <div className="divider divider-horizontal">-</div>
            <div className="grid h-60 p-4 text-center flex-grow card bg-base-300 rounded-box place-items-center">
              <p className="font-bold">Daerah Desa Penibung</p>
              <p className="font-medium">{strukturOrganisasi.desa_penibung}</p>
            </div>
          </div>
          <div className="flex w-full scale-75">
            <div className="grid h-60 p-4 text-center flex-grow card bg-base-300 rounded-box place-items-center">
              <p className="font-bold">Daerah Desa Sungai Bakau Besar</p>
              <p className="font-medium">
                {strukturOrganisasi.desa_sungai_bakau_besar}
              </p>
            </div>
            <div className="divider divider-horizontal">-</div>
            <div className="grid h-60 p-4 text-center flex-grow card bg-base-300 rounded-box place-items-center">
              <p className="font-bold">Daerah Desa Sungai Bakau Kecil</p>
              <p className="font-medium">
                {strukturOrganisasi.desa_sungai_bakau_kecil}
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full scale-75">
            <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
              <p className="font-bold">Daerah Desa Purun Kecil</p>
              <p className="font-medium">
                {strukturOrganisasi.desa_sungai_purun_kecil}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100  flex justify-center p-10">
        <p className="md:w-1/2">
          Ide, untuk Membangun Mempawah Mangrove Park yang memiliki konsep
          EduEcotourism (Wisata Alam yang memiliki nilai Edukasi), guna
          memanfaatkan kawasan pesisir dan laut. Selain itu, Keberadaan Mempawah
          Mangrove Park diharapkan dapat melindungi vegetasi mangrove yang sudah
          tumbuh dengan baik, agar dapat hidup berkelanjutan dan dapat
          memberikan manfaat pendidikan serta ekonomi bagi masyarakat di kawasan
          pesisir selain manfaat lingkungan yang diberikan oleh keberadaan hutan
          mangrove tersebut. Hal inilah yang mendasari sehinga Bank Indoensia
          Kantor Wilayah Kalimantan Barat memberikan PSBI (Program Sosial Bank
          Indonesia) tahun 2016 dan bersama-sama membangun Mempawah Mangrove
          Park.
        </p>
      </div>
      <div className="bg-gray-100 flex justify-center p-10">
        <div className="md:w-1/2">
          <h1 className="text-black font-medium">Jenis Mangrove Yang Ada</h1>
          <p>
            Saat ini pengelolaan kawasan Mempawah Mangrove Park adalah sebesar 2
            Ha. Sementara luas hutan mangrove yang ada di Desa Pasir kecamatan
            Mempawah Hilir adalah 60 Ha. Dari luasan 2 Ha tersebut, saat ini ada
            beberapa jenis mangrove yang telah dirawat dan ditanam oleh Mempawah
            Mangrove Conservation. Baik itu di tanam sendiri, maupun di berikan
            oleh mitra kerja WWF Program Kalimantan Barat.
          </p>
          <p>Beberapa vegetasi mangrove yang ada diantaranya :</p>
          <div className="flex justify-start gap-10">
            <p>- Rizhopora Stylosa </p>
            <p>- Rizhoporha Mucronata</p>
          </div>
          <div className="flex justify-start gap-10">
            <p>- Avicennia Marinna </p>
            <p>- Nyirih</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
