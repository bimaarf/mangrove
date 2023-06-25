import React from "react";

export const Footer = () => {
  return (
    <>
      <div className="bg-slate-800 md:px-20 md:py-10">
        <div className="md:flex justify-between items-center md:gap-10 mx-3">
          <div className="text-white">
            <h1 className="font-medium">Alamat</h1>
            <p className="mt-4">
              Mempawah Mangrove Park Pasir, Kec. Mempawah Hilir, Kab. Mempawah,
              Kalimantan Barat 78919
            </p>
            <h1 className="mt-4 font-medium">Kontak</h1>
            <div className="mt-4 flex items-center gap-2">
              <i className="fa fa-phone"></i>
              <p>085281615432</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <i className="fa fa-globe"></i>
              <a href="http://mempawahtourism.com/" target="__blank">
                http://mempawahtourism.com/
              </a>
            </div>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.722628037643!2d108.94362651151332!3d0.39682629959761495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31e2ef8555555555%3A0xc70796a8b2919c6d!2sMempawah%20Mangrove%20Park!5e0!3m2!1sid!2sid!4v1686697309679!5m2!1sid!2sid"
            className="w-full md:w-1/2 h-48 md:h-80 px-4 mt-4 md:mt-0"
            loading="lazy"></iframe>
        </div>
        <div className="border-t mt-4 p-4 text-gray-100">
          <p className="md:w-1/2">
            © Copyright 2023 Taman Mangrove Mempawah - All Rights Reserved
            Images
          </p>
        </div>
      </div>
    </>
  );
};
