import React from "react";

import CanvasJSReact from "@canvasjs/react-charts";
import ImagesBg from "../Images/bg-home.jpg";
import { Footer } from "./Components/_Footer";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export const About = () => {
  const options = {
    title: {
      text: "Jumlah Mangrove Ditanam",
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Benteng, Kelurahan Terusan", y: 7500 },
          { label: "Desa Penibung", y: 20000 },
          { label: "Desa Sungai Bakau Kecil", y: 44000 },
          { label: "Desa Sungai Bakau Besar Laut", y: 57800 },
          { label: "Desa Pasir", y: 253000 },
          { label: "Desa Sengkubang", y: 3000 },
          { label: "Dusun Senggiring", y: 10200 },
          { label: "Desa Sui. Purun Kecil", y: 5000 },
          { label: "Muara Kuala Mpw", y: 2220 },
        ],
      },
    ],
  };
  return (
    <>
      <div
        className="h-96"
        style={{
          backgroundImage: `url(${ImagesBg})`,
        }}>
        <div className="flex justify-center pt-40 px-4 md:pt-28">
          <div className="bg-white bg-opacity-50 md:w-1/2 p-10 md:p-20">
            <h1 className="text-center text-xl md:text-5xl text-black font-semibold">
              Tentang Kami
            </h1>
            <p className="text-center text-black">
              Mempawah Mangrove Conservation (MMC)
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white flex justify-center p-10">
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
      <div className="bg-gray-100 flex justify-center p-10">
        <div className="md:w-1/2">
          <h1 className="text-black font-medium">
            Jumlah Mangrove Yang Ditanam
          </h1>
          <CanvasJSChart
            options={options}
            /* onRef = {ref => this.chart = ref} */
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
